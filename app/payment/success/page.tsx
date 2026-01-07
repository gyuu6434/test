'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react'
import { verifyPayment } from './actions'

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const [orderData, setOrderData] = useState<any>(null)

  useEffect(() => {
    const verify = async () => {
      const paymentId = searchParams.get('paymentId')
      const orderId = searchParams.get('orderId')

      console.log('[PaymentSuccess] URL params:', { paymentId, orderId })

      if (!paymentId || !orderId) {
        console.error('[PaymentSuccess] Missing payment params')
        setStatus('error')
        setMessage('결제 정보가 없습니다. URL에 paymentId와 orderId가 필요합니다.')
        return
      }

      try {
        console.log('[PaymentSuccess] Calling verifyPayment')
        const result = await verifyPayment(paymentId, orderId)
        console.log('[PaymentSuccess] verifyPayment result:', result)

        if (result.success) {
          console.log('[PaymentSuccess] Payment verified successfully')
          setStatus('success')
          setMessage('주문이 완료되었습니다.')
          setOrderData(result.order)
        } else {
          console.error('[PaymentSuccess] Payment verification failed:', result.error)
          setStatus('error')
          setMessage(result.error || '결제 검증에 실패했습니다.')
        }
      } catch (error: any) {
        console.error('[PaymentSuccess] Unexpected error:', error)
        setStatus('error')
        setMessage(`결제 검증 중 오류가 발생했습니다: ${error?.message || '알 수 없는 오류'}`)
      }
    }

    verify()
  }, [searchParams])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-orange-600 mx-auto mb-4" />
          <p className="text-lg text-slate-600">결제 확인 중...</p>
        </div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8">
          <div className="text-center">
            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              결제 실패
            </h1>
            <p className="text-slate-600 mb-6">{message}</p>
            <div className="flex gap-2 justify-center">
              <Button
                onClick={() => router.push('/')}
                variant="outline"
              >
                홈으로
              </Button>
              <Button
                onClick={() => router.push('/payment')}
                className="bg-orange-600 hover:bg-orange-700"
              >
                다시 결제하기
              </Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8">
        <div className="text-center mb-8">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            주문 완료
          </h1>
          <p className="text-slate-600">{message}</p>
        </div>

        {orderData && (
          <div className="space-y-6">
            <div className="border-t border-b py-4">
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-slate-600">주문번호</dt>
                  <dd className="font-medium">{orderData.orderId}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-600">상품명</dt>
                  <dd className="font-medium">{orderData.productName}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-600">결제금액</dt>
                  <dd className="text-lg font-bold text-orange-600">
                    {orderData.amount?.toLocaleString()}원
                  </dd>
                </div>
              </dl>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg">
              <h2 className="font-semibold text-slate-900 mb-2">배송 정보</h2>
              <div className="space-y-1 text-sm text-slate-600">
                <p>{orderData.shipping?.name}</p>
                <p>{orderData.shipping?.phone}</p>
                <p>
                  ({orderData.shipping?.postcode}) {orderData.shipping?.address}
                </p>
                <p>{orderData.shipping?.detailAddress}</p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-900">
              <p className="font-semibold mb-1">배송 안내</p>
              <ul className="list-disc list-inside space-y-1 text-blue-800">
                <li>제주도에서 직송됩니다</li>
                <li>2-3일 내에 배송됩니다</li>
                <li>신선한 상태로 포장하여 발송합니다</li>
              </ul>
            </div>
          </div>
        )}

        <div className="mt-8 flex gap-2 justify-center">
          <Button
            onClick={() => router.push('/')}
            variant="outline"
          >
            홈으로
          </Button>
          <Button
            onClick={() => router.push('/orders')}
            className="bg-orange-600 hover:bg-orange-700"
          >
            주문 내역 보기
          </Button>
        </div>
      </Card>
    </div>
  )
}
