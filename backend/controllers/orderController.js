import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';
import dotenv from 'dotenv';
dotenv.config();
import stripe from 'stripe';
const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

//Giriş yapmış kişi içindir, gelen bilgilere göre order oluşturur.
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

//Giriş yapmış kullanıcının siparişlerini görebilmesi içindir.
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({
    user: req.user._id,
  });
  res.status(200).json(orders);
});

//Giriş yapmış kullanıcının order'ini görüntülemesi içindir, user name ve email'i de populate eder.
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error('Not found order');
  }
});

//Giriş yapmış kullanıcı order'ın parasını ödediğinde çalıştırdığımız endpointtir. Order'in isPaid'ini true yaparç
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Not found order');
  }
});

//Kullanıcı stripe ödeme yöntemini seçerse ve ödeme yaparsa çalıştırılan endpointtir. Order bilgileri ile ödeme sayfasına yönlendirilir.Ödeme başarılı olursa success_url'e, başarısız olursa cancel_url'e yönlendirilir.
const PayToOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
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
        success_url: `https://etemmeals-6ubc.onrender.com/success/order/${order._id}`,
        cancel_url: `https://etemmeals-6ubc.onrender.com/cancel/order/${order._id}`,
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

//Admin, ilgili order'ı delivered olarak güncelleyebilir.
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const deliveredOrder = await order.save();
    res.status(200).json(deliveredOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

//Admin bütün orderleri listeler. Order'ı veren user'in id ve name'si de populate edilir.
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.status(200).json(orders);
});

//Admin, ilgili orderi silebilir.
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

export { getAllOrders, PayToOrder, updateOrderToDelivered, getOrderById, getMyOrders, createOrder, deleteOrder, getPaymentResults, updateOrderToPaid };
