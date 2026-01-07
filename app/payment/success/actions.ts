'use server'

import { createClient } from '@/lib/supabase/server'

interface PortOnePayment {
  id: string
  status: string
  orderName: string
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

    let customData: { productId: string; name: string; phone: string; postcode: string; address: string; detailAddress: string }
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

    // 9. 중복 주문 확인
    console.log('[VerifyPayment] Checking for duplicate order')
    const { data: existingOrder, error: selectError } = await supabase
      .from('orders')
      .select()
      .eq('order_id', orderId)
      .maybeSingle()

    if (selectError) {
      console.error('[VerifyPayment] Error checking duplicate order:', selectError)
      // 계속 진행 (중복 체크 실패해도 insert에서 걸림)
    }

    if (existingOrder) {
      console.log('[VerifyPayment] Duplicate order found, returning existing order')
      return {
        success: true,
        order: {
          orderId: existingOrder.order_id,
          productId: existingOrder.product_id,
          productName: existingOrder.product_name,
          amount: existingOrder.amount,
          shipping: {
            name: existingOrder.shipping_name,
            phone: existingOrder.shipping_phone,
            postcode: existingOrder.shipping_postcode,
            address: existingOrder.shipping_address,
            detailAddress: existingOrder.shipping_detail_address,
          },
        },
      }
    }

    // 10. 주문 정보를 데이터베이스에 저장
    console.log('[VerifyPayment] Inserting order into database')
    const { data: order, error: insertError } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        order_id: orderId,
        payment_id: paymentId,
        product_id: product.id,
        product_name: product.name,
        amount: payment.amount.total,
        quantity: 1,
        status: 'paid',
        shipping_name: customData.name,
        shipping_phone: customData.phone,
        shipping_postcode: customData.postcode,
        shipping_address: customData.address,
        shipping_detail_address: customData.detailAddress,
      })
      .select()
      .single()

    if (insertError) {
      console.error('[VerifyPayment] Database insert error:', insertError)
      return { success: false, error: `주문 정보 저장에 실패했습니다. (${insertError.message})` }
    }
    console.log('[VerifyPayment] Order inserted:', order.order_id)

    // 11. 재고 차감
    console.log('[VerifyPayment] Decreasing stock')
    const newStock = product.stock - 1
    const { error: stockError } = await supabase
      .from('products')
      .update({ stock: newStock })
      .eq('id', product.id)

    if (stockError) {
      console.error('[VerifyPayment] Stock update error:', stockError)
      // 재고 차감 실패 시 주문 삭제 (롤백)
      await supabase.from('orders').delete().eq('order_id', orderId)
      return { success: false, error: `재고 차감 오류: ${stockError.message}` }
    }

    console.log('[VerifyPayment] Stock decreased:', {
      product: product.name,
      remaining: newStock,
    })

    // 12. 성공 응답
    console.log('[VerifyPayment] Verification completed successfully')
    return {
      success: true,
      order: {
        orderId: order.order_id,
        productId: order.product_id,
        productName: order.product_name,
        amount: order.amount,
        shipping: {
          name: order.shipping_name,
          phone: order.shipping_phone,
          postcode: order.shipping_postcode,
          address: order.shipping_address,
          detailAddress: order.shipping_detail_address,
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
