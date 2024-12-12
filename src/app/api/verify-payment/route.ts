import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
})

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const payment_intent = searchParams.get('payment_intent')

  if (!payment_intent) {
    return NextResponse.json({ error: 'Payment intent ID required' }, { status: 400 })
  }

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent, {
      expand: ['payment_method'],
    })

    return NextResponse.json({
      status: paymentIntent.status,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      payment_method: {
        type: paymentIntent.payment_method?.type,
        card: paymentIntent.payment_method?.card
          ? {
              brand: paymentIntent.payment_method.card.brand,
              last4: paymentIntent.payment_method.card.last4,
            }
          : null,
        billing_details: paymentIntent.payment_method?.billing_details,
      },
    })
  } catch (error) {
    console.error('Error retrieving payment intent:', error)
    return NextResponse.json({ error: 'Error verifying payment' }, { status: 500 })
  }
}
