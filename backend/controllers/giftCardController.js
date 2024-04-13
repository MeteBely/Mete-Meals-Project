import asyncHandler from '../middleware/asyncHandler.js';
import GiftCard from '../models/giftCardModel.js';
import dotenv from 'dotenv';
dotenv.config();
import stripe from 'stripe';
const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

//Admin'e özeldir, tüm gift cardları çeker.
const getGiftCards = asyncHandler(async (req, res) => {
  const giftCards = await GiftCard.find({});
  res.json(giftCards);
});

//Giriş yapmış kişi gift cardı (kod'a)id'ye göre çekecek. Eğer başarılı çekerse bakiyeyi yükleyip db'den o giftCardı silececeğiz.
const getGiftCardByIdAndDelete = asyncHandler(async (req, res) => {
  const giftCard = await GiftCard.findByIdAndDelete(req.params.id);
  if (giftCard) {
    return res.json(giftCard);
  } else {
    res.status(404);
    throw new Error('Gift card not found with this id');
  }
});

//public, satın alınma başarılı olursa gift card üretir.
const createGiftCard = asyncHandler(async (req, res) => {
  const { amount } = req.body;
  const giftCard = new GiftCard({
    amount,
  });
  await giftCard.save();
  res.status(201).json(giftCard);
});

//public, seçilen gift cardları ödeme sayfasına yönlendirir. Kullanıcıyı ödeme başarılı olursa success_url'e, başarısız olursa cancel_url'e yönlendirir.
const PayToGiftCardOrder = asyncHandler(async (req, res) => {
  const giftCards = req.body;
  if (giftCards) {
    try {
      const lineItems = giftCards.map((giftCard) => {
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `$${giftCard.amount} Gift Card`,
            },
            unit_amount: Math.round(giftCard.amount * 100),
          },
          quantity: giftCard.quantity,
        };
      });
      const session = await stripeInstance.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `https://etemmeals-6ubc.onrender.com//success/giftCardOrder`,
        cancel_url: `https://etemmeals-6ubc.onrender.com//cancel/giftCardOrder`,
      });
      res.json({ id: session.id });
    } catch (error) {
      console.error('Error creating Stripe Checkout session:', error);
      res.status(500).json({ error: 'Failed to create Stripe Checkout session' });
    }
  } else {
    res.status(404);
    throw new Error('Gift card not found');
  }
});

export { getGiftCards, getGiftCardByIdAndDelete, createGiftCard, PayToGiftCardOrder };
