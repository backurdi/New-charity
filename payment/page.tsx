'use client'

import { Elements } from '@stripe/react-stripe-js'
import PaymentForm from '@/components/PaymentPage'
import { campaigns } from '../page'
import { stripePromise } from '@/lib/stripe'

export default function Page({ params }: { params: { id: string } }) {
  const campaign = campaigns.find((c) => c.id === params.id)

  const handlePaymentSuccess = (result) => {
    // Handle successful payment (e.g., show success message, redirect)
    console.log('Payment successful:', result)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Support Campaign: {campaign.title}</h1>

      <Elements stripe={stripePromise}>
        <PaymentForm
          campaignId={campaign.id}
          amount={campaign.amount}
          onSuccess={handlePaymentSuccess}
        />
      </Elements>
    </div>
  )
}
