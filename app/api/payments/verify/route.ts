import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// 포트원 API 타입 정의
interface PortOnePaymentResponse {
  id: string;
  transactionId: string;
  storeId: string;
  channelKey: string;
  orderName: string;
  amount: {
    total: number;
    currency: string;
  };
  status: string;
  customer?: {
    name?: {
      full?: string;
    };
    phoneNumber?: string;
    email?: string;
  };
  customData?: Record<string, unknown>;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { paymentId, orderData: clientOrderData } = body;

    if (!paymentId) {
      return NextResponse.json(
        { success: false, message: '결제 ID가 필요합니다.' },
        { status: 400 }
      );
    }

    console.log('결제 검증 시작:', paymentId);

    // TODO: 실제 운영 환경에서는 포트원 API로 결제 정보를 검증해야 합니다
    // 현재는 테스트 환경이므로 클라이언트에서 전달받은 정보를 신뢰합니다
    // 포트원 API 호출 시 API Secret이 필요하며, 이는 포트원 대시보드에서 발급받아야 합니다

    if (!clientOrderData) {
      return NextResponse.json(
        { success: false, message: '주문 정보가 필요합니다.' },
        { status: 400 }
      );
    }

    // Supabase에 주문 정보 저장
    const supabase = await createClient();

    // 사용자 정보 가져오기 (로그인한 경우)
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.id) {
      return NextResponse.json(
        { success: false, message: '로그인이 필요합니다.' },
        { status: 401 }
      );
    }

    // 클라이언트에서 전달받은 주문 데이터 사용
    const orderData = {
      user_id: user.id,
      payment_id: paymentId,
      payment_method: clientOrderData.paymentMethod || 'card',
      payment_amount: clientOrderData.amount,
      total_amount: clientOrderData.amount,
      status: 'paid',
      recipient_name: clientOrderData.shipping.name,
      recipient_phone: clientOrderData.shipping.phone,
      shipping_address: `${clientOrderData.shipping.address} ${clientOrderData.shipping.detailAddress}`,
      shipping_zipcode: clientOrderData.shipping.postcode,
      shipping_memo: clientOrderData.shipping.message || null,
    };

    // 주문 저장
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert(orderData)
      .select()
      .single();

    if (orderError) {
      console.error('주문 저장 에러:', orderError);
      return NextResponse.json(
        { success: false, message: '주문 정보 저장에 실패했습니다.' },
        { status: 500 }
      );
    }

    // 주문 아이템 저장
    const orderItemData = {
      order_id: order.id,
      product_id: clientOrderData.productId,
      product_name: clientOrderData.productName,
      product_image: clientOrderData.productImage || null,
      price: clientOrderData.amount,
      quantity: 1,
      subtotal: clientOrderData.amount,
    };

    const { error: itemError } = await supabase
      .from('order_items')
      .insert(orderItemData);

    if (itemError) {
      console.error('주문 아이템 저장 에러:', itemError);
      // 주문은 저장되었으므로 에러를 반환하지 않고 계속 진행
    }

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        paymentId: order.payment_id,
        amount: order.total_amount,
        status: order.status,
      },
    });
  } catch (error) {
    console.error('결제 검증 에러:', error);
    return NextResponse.json(
      { success: false, message: '결제 검증 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
