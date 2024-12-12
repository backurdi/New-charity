'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

export default function PaymentSuccessPage() {
  const [status, setStatus] = useState<'processing' | 'succeeded' | 'failed'>('processing')
  const searchParams = useSearchParams()
  const payment_intent = searchParams.get('payment_intent')
  const [paymentDetails, setPaymentDetails] = useState<{
    status: string
    amount: number
    currency: string
    payment_method?: {
      type: string
      card?: {
        brand: string
        last4: string
      }
      billing_details?: {
        name: string
        email: string
      }
    }
  }>()

  useEffect(() => {
    if (payment_intent) {
      fetch(`/api/verify-payment?payment_intent=${payment_intent}`)
        .then((res) => res.json())
        .then((data) => {
          setPaymentDetails(data)
          setStatus(data.status)
        })
        .catch((err) => {
          console.error('Error verifying payment:', err)
          setStatus('failed')
        })
    }
  }, [payment_intent])

  return (
    <div className="min-h-screen bg-background-two flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
        {paymentDetails && (
          <div className="text-gray-600 mb-6 space-y-2">
            <p>
              Amount paid: {(paymentDetails.amount / 100).toFixed(2)}{' '}
              {paymentDetails.currency.toUpperCase()}
            </p>
            {paymentDetails.payment_method?.card && (
              <p>
                Paid with: {paymentDetails.payment_method.card.brand.toUpperCase()} ending in{' '}
                {paymentDetails.payment_method.card.last4}
              </p>
            )}
            <p>You will receive a confirmation email shortly.</p>
          </div>
        )}
        <Link href="/">
          <Button className="w-full">Return to Home</Button>
        </Link>
      </div>
    </div>
  )
}
