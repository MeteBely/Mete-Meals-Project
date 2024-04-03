import asyncHandler from '../middleware/asyncHandler.js';
import Membership from '../models/membershipModel.js';
import dotenv from 'dotenv';
dotenv.config();
import stripe from 'stripe';
const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

const payToMembership = asyncHandler(async (req, res) => {
  const { subTotal } = req.body;

  if (subTotal) {
    try {
      const lineItems = [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `One Month Membership`,
            },
            unit_amount: Math.round(subTotal * 100),
          },
          quantity: 1,
        },
      ];

      const session = await stripeInstance.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `http://localhost:5173/success/membership/selectmeals`,
        cancel_url: `http://localhost:5173/cancel/membership`,
      });

      res.json({ id: session.id });
    } catch (error) {
      console.error('Error creating Stripe Checkout session:', error);
      res.status(500).json({ error: 'Failed to create Stripe Checkout session' });
    }
  } else {
    res.status(404);
    throw new Error('Membership details not found!');
  }
});

export { payToMembership };
