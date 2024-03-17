import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';
import dotenv from 'dotenv';
dotenv.config();
import stripe from 'stripe';
const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('Not found order items');
  } else {
    const newOrder = new Order({
      orderItems: orderItems.map((x) => ({ ...x, mealKit: x._id, _id: undefined })),
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      user: req.user._id,
    });

    await newOrder.save();

    res.status(201).json(newOrder);
  }
});

//kullanıcı siparişlerini görebilecke
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({
    user: req.user._id,
  });
  res.status(200).json(orders);
});

//admin
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error('Not found order');
  }
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    // order.paymentResult = {
    //   id: req.body.id,
    //   status: req.body.status,
    //   update_time: req.body.update_time,
    //   email_address: req.body.email_address,
    // };
    const updatedOrder = await order.save();

    const mealKits = req.body;
    try {
      const lineItems = mealKits.map((mealKit) => {
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: mealKit.name,
            },
            unit_amount: Math.round(mealKit.price * 100),
          },
          quantity: mealKit.qty,
        };
      });
      const session = await stripeInstance.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://localhost:5173/success',
        cancel_url: 'http://localhost:5173/cancel',
      });

      res.json({ id: session.id });
    } catch (error) {
      console.error('Error creating Stripe Checkout session:', error);
      res.status(500).json({ error: 'Failed to create Stripe Checkout session' });
    }
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send('updateOrderToDelivered');
});

//admin
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({});
  res.json(orders);
});

//admin
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    await Order.deleteOne({ _id: order._id });
    res.status(200).json({ message: 'Order deleted successfully' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const getPaymentResults = asyncHandler(async (req, res) => {
  const events = await stripeInstance.events.list({
    limit: 3,
  });
  res.json(events);
});

export { getAllOrders, updateOrderToPaid, updateOrderToDelivered, getOrderById, getMyOrders, createOrder, deleteOrder, getPaymentResults };
