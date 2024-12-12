'use client'

import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export default function PaymentForm({ campaignId, amount, onSuccess }) {
  const stripe = useStripe()
  const elements = useElements()
  const [isSubscription, setIsSubscription] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      })

      if (error) throw error

      // Call your API to process the payment
      const response = await fetch('/api/process-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          campaignId,
          amount,
          isSubscription,
        }),
      })

      const result = await response.json()

      if (result.success) {
        onSuccess(result)
      }
    } catch (error) {
      console.error(error)
      alert('Payment failed: ' + error.message)
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6">
      <div className="mb-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={isSubscription}
            onChange={(e) => setIsSubscription(e.target.checked)}
            className="mr-2"
          />
          Make this a monthly subscription
        </label>
      </div>

      <div className="mb-4">
        <CardElement className="p-3 border rounded" />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? 'Processing...' : `Pay ${amount} ${isSubscription ? '/month' : ''}`}
      </button>
    </form>
  )
}
