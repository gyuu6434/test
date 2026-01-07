'use client';

import { useCallback } from 'react';
import * as PortOne from '@portone/browser-sdk/v2';
import { Product } from '@/lib/types/product';

interface ShippingInfo {
  name: string;
  phone: string;
  postcode: string;
  address: string;
  detailAddress: string;
  message: string;
}

interface PaymentRequest {
  product: Product;
  shipping: ShippingInfo;
  userEmail?: string;
  userId?: string;
}

interface PaymentResponse {
  success: boolean;
  paymentId?: string;
  transactionId?: string;
  message?: string;
}

export function usePortOnePayment() {
  const requestPayment = useCallback(
    async ({
      product,
      shipping,
      userEmail,
      userId,
    }: PaymentRequest): Promise<PaymentResponse> => {
      try {
        // 주문 ID 생성 (타임스탬프 + 랜덤 문자열)
        const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

        // 포트원 결제 요청
        const response = await PortOne.requestPayment({
          // 상점 ID
          storeId: process.env.NEXT_PUBLIC_PORTONE_STORE_ID!,

          // 채널 키
          channelKey: process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY!,

          // 결제 정보
          paymentId: orderId,
          orderName: product.name,
          totalAmount: product.price,
          currency: 'CURRENCY_KRW' as const,
          payMethod: 'CARD' as const,

          // 고객 정보
          customer: {
            fullName: shipping.name,
            phoneNumber: shipping.phone,
            email: userEmail,
          },

          // 배송 정보 (객체로 전달)
          customData: {
            productId: product.id,
            userId: userId,
            name: shipping.name,
            phone: shipping.phone,
            postcode: shipping.postcode,
            address: shipping.address,
            detailAddress: shipping.detailAddress,
          },
        });

        // 결제 성공 여부 확인
        if (response?.code != null) {
          // 결제 실패
          return {
            success: false,
            message: response.message || '결제에 실패했습니다.',
          };
        }

        // 결제 성공 - 서버 검증 필요
        return {
          success: true,
          paymentId: response?.paymentId,
          transactionId: response?.txId,
        };
      } catch (error) {
        console.error('포트원 결제 에러:', error);
        return {
          success: false,
          message: '결제 중 오류가 발생했습니다. 다시 시도해주세요.',
        };
      }
    },
    []
  );

  return { requestPayment };
}
