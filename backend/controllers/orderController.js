import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';

const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('Not found order items');
  } else {
    const newOrder = new Order({
      orderItems: orderItems.map((x) => ({ ...x, meal: x._id, _id: undefined })),
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
  res.send('updateOrderToPaid');
});

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send('updateOrderToDelivered');
});

//admin
const getAllOrders = asyncHandler(async (req, res) => {
  res.send('getAllOrders');
});

export { getAllOrders, updateOrderToPaid, updateOrderToDelivered, getOrderById, getMyOrders, createOrder };
