import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// 포트원 웹훅 페이로드 타입
interface PortOneWebhookPayload {
  type: 'Transaction.Paid' | 'Transaction.Cancelled' | 'Transaction.Failed';
  timestamp: string;
  data: {
    paymentId: string;
    transactionId: string;
    storeId: string;
  };
}

// 포트원 API 결제 정보 응답 타입
interface PortOnePaymentData {
  id: string;
  transactionId: string;
  merchantId: string;
  storeId: string;
  orderName: string;
  amount: {
    total: number;
    taxFree: number;
    currency: string;
  };
  status: 'PAID' | 'CANCELLED' | 'FAILED' | 'PENDING';
  customer?: {
    name?: string;
    phoneNumber?: string;
    email?: string;
  };
  customData?: string;
}

// 서비스 역할 Supabase 클라이언트 (RLS 우회)
function getServiceClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Supabase 환경 변수가 설정되지 않았습니다.');
  }

  return createClient(supabaseUrl, supabaseServiceKey);
}

// 포트원 API로 결제 정보 조회
async function getPaymentFromPortOne(paymentId: string): Promise<PortOnePaymentData | null> {
  const apiSecret = process.env.PORTONE_API_SECRET;

  if (!apiSecret) {
    console.error('PORTONE_API_SECRET이 설정되지 않았습니다.');
    return null;
  }

  try {
    const response = await fetch(
      `https://api.portone.io/payments/${encodeURIComponent(paymentId)}`,
      {
        method: 'GET',
        headers: {
          Authorization: `PortOne ${apiSecret}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('포트원 API 에러:', response.status, errorText);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('포트원 API 호출 실패:', error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload: PortOneWebhookPayload = await request.json();

    console.log('포트원 웹훅 수신:', JSON.stringify(payload, null, 2));

    // 결제 완료 이벤트만 처리
    if (payload.type !== 'Transaction.Paid') {
      console.log(`처리하지 않는 이벤트 타입: ${payload.type}`);
      return NextResponse.json({ success: true, message: '이벤트 무시됨' });
    }

    const { paymentId } = payload.data;

    if (!paymentId) {
      console.error('[웹훅 오류] paymentId가 없습니다.');
      // 잘못된 요청은 200 반환 (재시도 방지)
      return NextResponse.json({ success: false, message: 'paymentId가 필요합니다.' });
    }

    const supabase = getServiceClient();

    // 1. 중복 주문 확인 (이미 처리된 결제인지)
    const { data: existingOrder } = await supabase
      .from('orders')
      .select('id, status')
      .eq('payment_id', paymentId)
      .single();

    if (existingOrder) {
      console.log(`이미 처리된 결제: ${paymentId}, 주문 ID: ${existingOrder.id}`);
      return NextResponse.json({
        success: true,
        message: '이미 처리된 결제입니다.',
        orderId: existingOrder.id,
      });
    }

    // 2. 포트원 API로 결제 정보 검증
    const payment = await getPaymentFromPortOne(paymentId);

    if (!payment) {
      console.error(`[웹훅 오류] 포트원에서 결제 정보를 가져올 수 없습니다: ${paymentId}`);
      // 포트원 API 일시적 장애일 수 있으므로 500 반환 (재시도 허용)
      return NextResponse.json(
        { success: false, message: '결제 정보 조회 실패' },
        { status: 500 }
      );
    }

    // 결제 상태 확인
    if (payment.status !== 'PAID') {
      console.error(`[웹훅 오류] 결제가 완료되지 않았습니다. paymentId: ${paymentId}, 상태: ${payment.status}`);
      // 결제 미완료는 정상 케이스 (200 반환, 재시도 불필요)
      return NextResponse.json({ success: false, message: `결제 상태: ${payment.status}` });
    }

    // 3. customData에서 주문 정보 파싱
    let orderInfo: {
      productId?: string;
      name?: string;
      phone?: string;
      postcode?: string;
      address?: string;
      detailAddress?: string;
      userId?: string;
    } = {};

    if (payment.customData) {
      try {
        orderInfo = JSON.parse(payment.customData);
      } catch {
        console.error('customData 파싱 실패:', payment.customData);
      }
    }

    // userId가 customData에 없으면 처리 불가
    if (!orderInfo.userId) {
      console.error(`[웹훅 오류] 주문 정보에 userId가 없습니다. paymentId: ${paymentId}`);
      // 데이터 문제이므로 200 반환 (재시도해도 안됨)
      return NextResponse.json({ success: false, message: 'userId가 필요합니다.' });
    }

    // 4. 주문 데이터 생성
    const orderData = {
      user_id: orderInfo.userId,
      payment_id: paymentId,
      payment_method: 'card',
      payment_amount: payment.amount.total,
      total_amount: payment.amount.total,
      status: 'paid',
      recipient_name: orderInfo.name || payment.customer?.name || '알 수 없음',
      recipient_phone: orderInfo.phone || payment.customer?.phoneNumber || '알 수 없음',
      shipping_address: `${orderInfo.address || ''} ${orderInfo.detailAddress || ''}`.trim() || '주소 없음',
      shipping_zipcode: orderInfo.postcode || '00000',
      shipping_memo: null,
      paid_at: new Date().toISOString(),
    };

    // 5. 트랜잭션으로 주문 저장 및 재고 차감
    // 주문 저장
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert(orderData)
      .select()
      .single();

    if (orderError) {
      // 중복 키 에러 (이미 다른 요청에서 처리됨)
      if (orderError.code === '23505') {
        console.log(`동시 요청으로 이미 처리된 결제: ${paymentId}`);
        return NextResponse.json({
          success: true,
          message: '이미 처리된 결제입니다.',
        });
      }

      console.error(`[웹훅 오류] 주문 저장 에러. paymentId: ${paymentId}`, orderError);
      // DB 일시적 장애일 수 있으므로 500 반환 (재시도 허용)
      return NextResponse.json(
        { success: false, message: '주문 저장 실패' },
        { status: 500 }
      );
    }

    // 6. 주문 아이템 저장
    if (orderInfo.productId) {
      const orderItemData = {
        order_id: order.id,
        product_id: orderInfo.productId,
        product_name: payment.orderName,
        product_image: null,
        price: payment.amount.total,
        quantity: 1,
        subtotal: payment.amount.total,
      };

      const { error: itemError } = await supabase
        .from('order_items')
        .insert(orderItemData);

      if (itemError) {
        console.error('주문 아이템 저장 에러:', itemError);
      }

      // 7. 재고 차감
      const { data: stockResult, error: stockError } = await supabase
        .rpc('decrease_product_stock', {
          product_id: orderInfo.productId,
          quantity: 1,
        });

      if (stockError) {
        console.error('재고 차감 에러:', stockError);
      } else if (stockResult && stockResult.length > 0) {
        const result = stockResult[0];
        if (result.success) {
          console.log(`재고 차감 완료: ${orderInfo.productId}, 남은 재고: ${result.new_stock}`);
        } else {
          console.warn(`재고 차감 실패: ${result.message}`);
        }
      }
    }

    console.log(`웹훅 처리 완료: 주문 ID ${order.id}, 결제 ID ${paymentId}`);

    return NextResponse.json({
      success: true,
      message: '주문이 성공적으로 처리되었습니다.',
      orderId: order.id,
    });
  } catch (error) {
    console.error('[웹훅 오류] 예상치 못한 에러:', error);
    // 예상치 못한 에러는 500 반환 (재시도 허용)
    return NextResponse.json(
      { success: false, message: '웹훅 처리 중 오류 발생' },
      { status: 500 }
    );
  }
}

// GET 요청 처리 (웹훅 엔드포인트 확인용)
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: '포트원 웹훅 엔드포인트',
    endpoint: '/api/webhooks/portone',
  });
}
