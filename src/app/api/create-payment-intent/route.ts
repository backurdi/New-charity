import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
})

const PRODUCT_NAME = 'Campaign Donation Subscription'

async function getOrCreatePriceId(amount: number): Promise<string> {
  try {
    // First, try to find an existing price
    const prices = await stripe.prices.list({
      active: true,
      product: process.env.STRIPE_DONATION_PRODUCT_ID,
      type: 'recurring',
      currency: 'dkk',
    })

    const existingPrice = prices.data.find(
      (price) => price.unit_amount === amount && price.recurring?.interval === 'month',
    )

    if (existingPrice) {
      return existingPrice.id
    }

    // If no existing price found, create a new one
    const price = await stripe.prices.create({
      unit_amount: amount,
      currency: 'dkk',
      recurring: { interval: 'month' },
      product: process.env.STRIPE_DONATION_PRODUCT_ID!,
    })

    return price.id
  } catch (error) {
    console.error('Error getting/creating price:', error)
    throw error
  }
}

export async function POST(req: Request) {
  const { amount, isSubscription } = await req.json()
  const amountInOre = Math.round(amount * 100)

  try {
    if (isSubscription) {
      // Get or create price ID for the subscription
      const priceId = await getOrCreatePriceId(amountInOre)

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInOre,
        currency: 'dkk',
        payment_method_types: ['card'],
        capture_method: 'automatic',
        setup_future_usage: 'off_session',
        metadata: {
          isSubscription: true,
          priceId, // Store the priceId for later use
        },
      })

      return NextResponse.json({ clientSecret: paymentIntent.client_secret })
    } else {
      // One-time payment remains the same
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInOre,
        currency: 'dkk',
        payment_method_types: ['card'],
        capture_method: 'automatic',
        metadata: {
          isSubscription: false,
        },
      })

      return NextResponse.json({ clientSecret: paymentIntent.client_secret })
    }
  } catch (error) {
    console.error('Error creating payment intent:', error)
    return NextResponse.json({ error: 'Error creating payment intent' }, { status: 500 })
  }
}
