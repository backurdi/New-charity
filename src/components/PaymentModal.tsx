'use client'

import {
  Elements,
  useStripe,
  useElements,
  CardElement,
  PaymentElement,
} from '@stripe/react-stripe-js'
import { Campaign } from 'payload-types'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { Slider } from '@/components/ui/slider'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Input } from './ui/input'
import { createPaymentIntent } from '@/lib/stripe-client'
import { cn } from '@/lib/utils'
import type Stripe from 'stripe'
import { PaymentRequest } from '@stripe/stripe-js'

const PREDEFINED_AMOUNTS = [50, 100, 200, 500]

interface PaymentModalProps {
  campaign: Campaign
  isOpen: boolean
  onClose: () => void
}

export default function PaymentModal({ campaign, isOpen, onClose }: PaymentModalProps) {
  const [step, setStep] = useState(1)
  const [amount, setAmount] = useState(100)
  const [customAmount, setCustomAmount] = useState(false)
  const [isSubscription, setIsSubscription] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  const [paymentElementOptions, setPaymentElementOptions] = useState({
    layout: 'tabs',
    wallets: {
      googlePay: 'auto',
      applePay: 'auto',
    },
  })
  const [googlePayAvailable, setGooglePayAvailable] = useState(false)
  const [applePayAvailable, setApplePayAvailable] = useState(false)
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null)
  const [emailError, setEmailError] = useState('')

  const stripe = useStripe()
  const elements = useElements()

  const handleContinue = () => {
    if (isSubscription && !email) {
      setEmailError('Email is required for subscriptions')
      return
    }
    if (isSubscription && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setEmailError('Please enter a valid email address')
      return
    }
    setEmailError('')
    setStep(2)
  }

  const handleBack = () => {
    setStep(1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    try {
      // Get payment method details
      const { error: submitError } = await elements.submit()
      if (submitError) {
        console.error('Error submitting payment:', submitError)
        return
      }

      // Create payment intent
      const { clientSecret } = await createPaymentIntent(amount, isSubscription)

      // Confirm payment
      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/payment/success`,
          payment_method_data: {
            billing_details: {
              name,
              email,
            },
          },
        },
      })

      if (error) {
        window.location.href = `${window.location.origin}/payment/error?error=${encodeURIComponent(
          error.message || 'Unknown error',
        )}`
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleWalletPayment = async (e: React.MouseEvent, wallet: 'apple_pay' | 'google_pay') => {
    e.preventDefault()
    if (!stripe || !elements) return

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin,
          payment_method: wallet,
        },
      })

      if (error) {
        console.error(`${wallet} payment failed:`, error)
      } else {
        console.log(`${wallet} payment initiated`)
        onClose()
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  useEffect(() => {
    if (!stripe || !isOpen) return

    const pr = stripe.paymentRequest({
      country: 'DK',
      currency: 'dkk',
      total: {
        label: `${campaign.title} - Donation`,
        amount: amount * 100,
      },
      requestPayerName: true,
      requestPayerEmail: true,
      requestShipping: false,
      disableWallets: ['link'],
    })

    // Check if Apple Pay or Google Pay is available
    pr.canMakePayment().then((result) => {
      if (result?.applePay) setApplePayAvailable(true)
      if (result?.googlePay) setGooglePayAvailable(true)
      if (result?.applePay || result?.googlePay) setPaymentRequest(pr)
    })

    // Handle the payment
    pr.on('paymentmethod', async (e) => {
      try {
        const { clientSecret } = await createPaymentIntent(amount, isSubscription)

        const { error, paymentIntent } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: e.paymentMethod.id,
          },
          {
            handleActions: false,
          },
        )

        if (error) {
          e.complete('fail')
          console.error('Payment failed:', error)
          return
        }

        e.complete('success')

        if (paymentIntent.status === 'requires_action') {
          // Handle 3D Secure authentication if needed
          const { error, paymentIntent: confirmedIntent } =
            await stripe.confirmCardPayment(clientSecret)
          if (error) {
            console.error('3D Secure authentication failed:', error)
            return
          }
          console.log('Payment successful:', confirmedIntent)
          onClose()
        } else {
          console.log('Payment successful:', paymentIntent)
          onClose()
        }
      } catch (error) {
        console.error('Error:', error)
        e.complete('fail')
      }
    })

    return () => {
      pr.off('paymentmethod')
    }
  }, [stripe, isOpen, amount, campaign.title, isSubscription])

  const handleGooglePay = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!paymentRequest) return

    try {
      await paymentRequest.show()
    } catch (error) {
      console.error('Google Pay error:', error)
    }
  }

  const handleApplePay = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!paymentRequest) return

    try {
      await paymentRequest.show()
    } catch (error) {
      console.error('Apple Pay error:', error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Support Campaign: {campaign.title}</DialogTitle>
        </DialogHeader>

        {step === 1 ? (
          <div className="space-y-6">
            {/* Payment Type Selection */}
            <div className="space-y-3">
              <Label>Payment Type</Label>
              <RadioGroup
                defaultValue="onetime"
                onValueChange={(value) => {
                  setIsSubscription(value === 'subscription')
                  setEmailError('')
                }}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="onetime" id="onetime" />
                  <Label htmlFor="onetime">One-time</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="subscription" id="subscription" />
                  <Label htmlFor="subscription">Monthly</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Email field for subscriptions */}
            {isSubscription && (
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-1">
                  Email
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setEmailError('')
                  }}
                  placeholder="Enter your email"
                  className={cn(!!emailError && 'border-red-500')}
                />
                {emailError && <p className="text-sm text-red-500">{emailError}</p>}
              </div>
            )}

            {/* Amount Selection */}
            <div className="space-y-4">
              <Label>Select Amount (kr)</Label>
              <div className="grid grid-cols-2 gap-3">
                {PREDEFINED_AMOUNTS.map((preset) => (
                  <Button
                    key={preset}
                    type="button"
                    variant={!customAmount && amount === preset ? 'default' : 'outline'}
                    onClick={() => {
                      setCustomAmount(false)
                      setAmount(preset)
                    }}
                  >
                    {preset} kr
                  </Button>
                ))}
                <Button
                  type="button"
                  variant={customAmount ? 'default' : 'outline'}
                  onClick={() => setCustomAmount(true)}
                  className="col-span-2"
                >
                  Custom Amount
                </Button>
              </div>

              {customAmount && (
                <div className="space-y-4">
                  <Slider
                    value={[amount]}
                    onValueChange={(value) => setAmount(value[0])}
                    min={10}
                    max={10000}
                    step={10}
                  />
                  <div className="text-center font-bold">
                    {amount} kr {isSubscription && '/month'}
                  </div>
                </div>
              )}
            </div>

            <Button onClick={handleContinue} className="w-full">
              Continue to Payment
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Digital Wallet Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleApplePay}
                disabled={!applePayAvailable}
                className={cn(
                  'py-3 rounded-md flex items-center justify-center space-x-2',
                  applePayAvailable
                    ? 'bg-black text-white hover:bg-gray-900'
                    : 'bg-gray-100 cursor-not-allowed text-gray-400',
                )}
              >
                <img src="/apple.svg" alt="" className="w-5 brightness-0 invert" />
                <span>Pay</span>
              </button>

              <button
                onClick={handleGooglePay}
                disabled={!googlePayAvailable}
                className={cn(
                  'py-3 rounded-md flex items-center justify-center space-x-2',
                  googlePayAvailable
                    ? 'bg-white border hover:bg-gray-50'
                    : 'bg-gray-100 cursor-not-allowed',
                )}
              >
                <img src="/google.svg" alt="" className="w-5" />
                <span>Pay</span>
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or pay with card</span>
              </div>
            </div>

            <PaymentElement
              options={{
                layout: 'tabs',
                wallets: {
                  applePay: 'auto',
                  googlePay: 'auto',
                },
              }}
            />

            <div className="flex gap-3">
              <Button variant="outline" onClick={handleBack} className="flex-1">
                Back
              </Button>
              <Button type="submit" className="flex-1">
                Pay {amount} kr {isSubscription && '/month'}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
