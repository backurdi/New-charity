'use client'

import { useState } from 'react'
import PaymentModal from '@/components/PaymentModal'
import { Campaign } from 'payload-types'
import { Button } from '@/components/ui/button'
import { Elements } from '@stripe/react-stripe-js'
import { stripePromise } from '@/lib/stripe-client'
import { createPaymentIntent } from '@/lib/stripe-client'

interface DonationButtonProps {
  campaign: Campaign
}

export default function DonationButton({ campaign }: DonationButtonProps) {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [clientSecret, setClientSecret] = useState<string>()

  const handleOpenModal = async () => {
    // Create payment intent when opening modal
    const { clientSecret } = await createPaymentIntent(100, false) // Default amount
    setClientSecret(clientSecret)
    setIsPaymentModalOpen(true)
  }

  return (
    <>
      <Button onClick={handleOpenModal} className="w-full bg-primary text-white" variant="outline">
        Support This Campaign
      </Button>

      {clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: {
              theme: 'stripe',
            },
          }}
        >
          <PaymentModal
            campaign={campaign}
            isOpen={isPaymentModalOpen}
            onClose={() => setIsPaymentModalOpen(false)}
          />
        </Elements>
      )}
    </>
  )
}
