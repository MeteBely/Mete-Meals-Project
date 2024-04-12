import asyncHandler from '../middleware/asyncHandler.js';
import Membership from '../models/membershipModel.js';
import dotenv from 'dotenv';
dotenv.config();
import stripe from 'stripe';
const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

//Seçilen plan'ın tutarı tutulur ve ödeme sayfasına yönlendirilir. Ödeme başarılı olursa success_url'e, başarısız olursa cancel_url'e yönlendirilir.
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

//Giriş yapmış kullanıcı plan'da seçtiği bilgilere göre üyelik oluşturabilir. (Üyelik ödendikten sonra mealsler seçilip(plan içerisinde) submit edilince bu endpoint çalıştırılır.)
const createMembership = asyncHandler(async (req, res) => {
  try {
    const { plan, preference, shippingAddress } = req.body;
    const membership = new Membership({
      user: req.user._id,
      plan,
      preference,
      shippingAddress,
    });
    const newMembership = await membership.save();
    res.status(201).json(newMembership);
  } catch (error) {
    console.log(error);
  }
});

//Giriş yapmış kişinin membership page'si için. Ek olarak user'in name ve emaili, planda seçilen meallerin name ve img'si de populate edilir.
const getUserMembership = asyncHandler(async (req, res) => {
  try {
    const userMembership = await Membership.findOne({ _id: req.params.id }).populate([
      { path: 'plan.selectedMeals.firstWeek', select: 'name img' },
      { path: 'plan.selectedMeals.secondWeek', select: 'name img' },
      { path: 'plan.selectedMeals.thirdWeek', select: 'name img' },
      { path: 'plan.selectedMeals.fourthWeek', select: 'name img' },
      { path: 'user', select: 'name email' },
    ]);

    if (userMembership) {
      return res.status(200).json(userMembership);
    } else {
      res.status(404);
      throw new Error('Membership not found in this user!');
    }
  } catch (error) {
    console.log(error);
  }
});

//Giriş yapmış kullanıcının Header'de membership'ini listelemek içindir.
const MyMembershipId = asyncHandler(async (req, res) => {
  const myMembershipId = await Membership.findOne({ user: req.user._id }).select('_id');
  if (myMembershipId) {
    res.status(200).json(myMembershipId);
  } else {
    res.status(404).json('NaN');
  }
});

//Admin, tüm membership'leri listeler.
const getMemberships = asyncHandler(async (req, res) => {
  const memberships = await Membership.find({}).populate('user', 'email name');
  res.status(200).json(memberships);
});

//Admin, Id'ye göre membership'i siler.
const deleteMembershipById = asyncHandler(async (req, res) => {
  const membership = await Membership.findById(req.params.id);
  if (membership) {
    await Membership.deleteOne({ _id: membership._id });
    res.status(200).json({ message: 'Membership deleted successfully' });
  } else {
    res.status(404);
    throw new Error('Membership not found');
  }
});

//Admin, membership'in mealslerini sırasıyla haftaya göre delivered olarak günceller.
const updateMembershipMealsToDelivered = asyncHandler(async (req, res) => {
  //membership.isDelivered.FirstWeek true değil ise true yapar, true ise TwoWeek'e bakar. Öyle devam eder. Bu fonksiyon sıra sıra FirstWeekden FourthWeek'e kadar true yapma amacı ile oluşturulmuştur. Admin Butona bastıkça bu fonksiyon çalışır tâki FourthWeek true olana kadar.
  try {
    const membership = await Membership.findById(req.params.id);
    if (membership) {
      if (membership.isDelivered.FirstWeek) {
        if (membership.isDelivered.SecondWeek) {
          if (membership.isDelivered.ThirdWeek) {
            membership.isDelivered.FourthWeek = true;
          } else {
            membership.isDelivered.ThirdWeek = true;
          }
        } else {
          membership.isDelivered.SecondWeek = true;
        }
      } else {
        membership.isDelivered.FirstWeek = true;
      }
      const updatedMembership = await membership.save();
      res.status(200).json(updatedMembership);
    } else {
      res.status(404);
      throw new Error('Membership not found');
    }
  } catch (err) {
    console.log(err);
  }
});

export { payToMembership, createMembership, getUserMembership, getMemberships, MyMembershipId, deleteMembershipById, updateMembershipMealsToDelivered };
