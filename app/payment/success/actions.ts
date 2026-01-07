'use server'

import { createClient } from '@/lib/supabase/server'

interface PortOnePayment {
  id: string
  status: string
  orderName: string
  method?: {
    type: string
  }
  amount: {
    total: number
    currency: string
  }
  customer: {
    name: {
      full: string
    }
    phoneNumber: string
  }
  customData: string
}

export async function verifyPayment(paymentId: string, orderId: string) {
  const supabase = await createClient()

  try {
    console.log('[VerifyPayment] Starting verification:', { paymentId, orderId })

    // 1. 사용자 인증 확인
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError) {
      console.error('[VerifyPayment] Auth error:', authError)
      return { success: false, error: '인증 오류가 발생했습니다.' }
    }
    if (!user) {
      console.error('[VerifyPayment] No user found')
      return { success: false, error: '로그인이 필요합니다.' }
    }
    console.log('[VerifyPayment] User authenticated:', user.id)

    // 2. PortOne API Secret 확인
    if (!process.env.PORTONE_API_SECRET) {
      console.error('[VerifyPayment] PORTONE_API_SECRET not found in environment')
      return { success: false, error: '서버 설정 오류입니다.' }
    }

    // 3. PortOne API로 결제 정보 조회 (진짜 결제인지 확인)
    console.log('[VerifyPayment] Fetching payment from PortOne API')
    const portOneResponse = await fetch(
      `https://api.portone.io/payments/${encodeURIComponent(paymentId)}`,
      {
        headers: {
          'Authorization': `PortOne ${process.env.PORTONE_API_SECRET}`,
        },
      }
    )

    if (!portOneResponse.ok) {
      const errorText = await portOneResponse.text()
      console.error('[VerifyPayment] PortOne API error:', {
        status: portOneResponse.status,
        statusText: portOneResponse.statusText,
        body: errorText,
      })
      return { success: false, error: '결제 정보를 확인할 수 없습니다.' }
    }

    const payment: PortOnePayment = await portOneResponse.json()
    console.log('[VerifyPayment] Payment fetched:', {
      id: payment.id,
      status: payment.status,
      amount: payment.amount.total,
    })
    console.log('[VerifyPayment] Full payment object:', JSON.stringify(payment, null, 2))

    // 4. 결제 상태 확인
    console.log('[VerifyPayment] Checking payment status')
    if (payment.status !== 'PAID') {
      console.error('[VerifyPayment] Payment not completed:', payment.status)
      return { success: false, error: `결제가 완료되지 않았습니다. (상태: ${payment.status})` }
    }

    // 5. customData에서 상품ID와 배송 정보 파싱
    console.log('[VerifyPayment] Parsing customData')
    console.log('[VerifyPayment] Raw customData:', payment.customData)
    console.log('[VerifyPayment] customData type:', typeof payment.customData)

    let customData: { productId: string; name: string; phone: string; postcode: string; address: string; detailAddress: string; memo?: string }
    try {
      if (!payment.customData) {
        throw new Error('customData is empty')
      }

      let parsed: any = payment.customData

      // Double-encoded JSON 처리 (PortOne이 두 번 인코딩하는 경우)
      if (typeof parsed === 'string') {
        parsed = JSON.parse(parsed)
        console.log('[VerifyPayment] First parse:', typeof parsed, parsed)

        // 여전히 문자열이면 한 번 더 파싱
        if (typeof parsed === 'string') {
          parsed = JSON.parse(parsed)
          console.log('[VerifyPayment] Second parse (double-encoded):', typeof parsed, parsed)
        }
      }

      customData = parsed

      console.log('[VerifyPayment] customData parsed:', JSON.stringify(customData, null, 2))
      console.log('[VerifyPayment] productId:', customData.productId)

      if (!customData.productId) {
        throw new Error('productId not found in customData')
      }
    } catch (e) {
      console.error('[VerifyPayment] Failed to parse customData:', e, 'Raw data:', payment.customData)
      return { success: false, error: '주문 정보를 확인할 수 없습니다.' }
    }

    // 6. Supabase에서 상품 정보 조회
    console.log('[VerifyPayment] Fetching product from Supabase:', customData.productId)
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('id', customData.productId)
      .single()

    if (productError || !product) {
      console.error('[VerifyPayment] Product not found:', customData.productId, productError)
      return { success: false, error: '상품 정보를 찾을 수 없습니다.' }
    }
    console.log('[VerifyPayment] Product found:', { id: product.id, name: product.name, price: product.price })

    // 7. 결제 금액 검증 (실제 상품 가격과 일치하는지 확인)
    console.log('[VerifyPayment] Verifying amount')
    if (payment.amount.total !== product.price) {
      console.error('[VerifyPayment] Payment amount mismatch:', {
        expected: product.price,
        actual: payment.amount.total,
      })
      return { success: false, error: '결제 금액이 일치하지 않습니다.' }
    }

    // 8. 재고 확인
    console.log('[VerifyPayment] Checking stock')
    if (product.stock <= 0 || !product.is_available) {
      console.error('[VerifyPayment] Stock unavailable:', {
        stock: product.stock,
        is_available: product.is_available,
      })
      return { success: false, error: '상품의 재고가 부족합니다.' }
    }

    // 9. 중복 주문 확인 (payment_id로 확인)
    console.log('[VerifyPayment] Checking for duplicate order')
    const { data: existingOrder, error: selectError } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .eq('payment_id', paymentId)
      .maybeSingle()

    if (selectError) {
      console.error('[VerifyPayment] Error checking duplicate order:', selectError)
      // 계속 진행 (중복 체크 실패해도 insert에서 걸림)
    }

    if (existingOrder) {
      console.log('[VerifyPayment] Duplicate order found, returning existing order')
      const orderItem = existingOrder.order_items?.[0]
      return {
        success: true,
        order: {
          orderId: existingOrder.id,
          productId: orderItem?.product_id,
          productName: orderItem?.product_name,
          amount: existingOrder.total_amount,
          shipping: {
            name: existingOrder.recipient_name,
            phone: existingOrder.recipient_phone,
            postcode: existingOrder.shipping_zipcode,
            address: existingOrder.shipping_address,
            detailAddress: '',
          },
        },
      }
    }

    // 10. 주문 정보를 데이터베이스에 저장 (새 스키마)
    console.log('[VerifyPayment] Inserting order into database')
    const fullAddress = customData.detailAddress
      ? `${customData.address} ${customData.detailAddress}`
      : customData.address

    const { data: order, error: insertError } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        payment_id: paymentId,
        payment_method: payment.method?.type || 'card',
        payment_amount: payment.amount.total,
        total_amount: payment.amount.total,
        status: 'paid',
        recipient_name: customData.name,
        recipient_phone: customData.phone,
        shipping_zipcode: customData.postcode,
        shipping_address: fullAddress,
        shipping_memo: customData.memo || null,
      })
      .select()
      .single()

    if (insertError) {
      console.error('[VerifyPayment] Database insert error:', insertError)
      return { success: false, error: `주문 정보 저장에 실패했습니다. (${insertError.message})` }
    }
    console.log('[VerifyPayment] Order inserted:', order.id)

    // 11. 주문 아이템 저장
    console.log('[VerifyPayment] Inserting order item')
    const { error: itemError } = await supabase
      .from('order_items')
      .insert({
        order_id: order.id,
        product_id: product.id,
        product_name: product.name,
        product_image: product.images?.[0] || null,
        price: product.price,
        quantity: 1,
        subtotal: product.price,
      })

    if (itemError) {
      console.error('[VerifyPayment] Order item insert error:', itemError)
      // 주문은 저장되었으므로 에러를 무시하고 계속 진행
    }

    // 12. 재고 차감
    console.log('[VerifyPayment] Decreasing stock')
    const newStock = product.stock - 1
    const { error: stockError } = await supabase
      .from('products')
      .update({ stock: newStock })
      .eq('id', product.id)

    if (stockError) {
      console.error('[VerifyPayment] Stock update error:', stockError)
      // 재고 차감 실패해도 주문은 유지 (수동 처리 필요)
    }

    console.log('[VerifyPayment] Stock decreased:', {
      product: product.name,
      remaining: newStock,
    })

    // 13. 성공 응답
    console.log('[VerifyPayment] Verification completed successfully')
    return {
      success: true,
      order: {
        orderId: order.id,
        productId: product.id,
        productName: product.name,
        amount: order.total_amount,
        shipping: {
          name: order.recipient_name,
          phone: order.recipient_phone,
          postcode: order.shipping_zipcode,
          address: order.shipping_address,
          detailAddress: '',
        },
      },
    }
  } catch (error: any) {
    console.error('[VerifyPayment] Unexpected error:', {
      message: error?.message,
      stack: error?.stack,
      error,
    })
    return {
      success: false,
      error: `결제 검증 중 오류가 발생했습니다: ${error?.message || '알 수 없는 오류'}`,
    }
  }
}
