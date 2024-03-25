import express from 'express';
import { admin, protect } from '../middleware/authMiddleware.js';
import { createOrder, deleteOrder, getAllOrders, getMyOrders, getOrderById, updateOrderToDelivered, PayToOrder, getPaymentResults, updateOrderToPaid } from '../controllers/orderController.js';
const router = express.Router();

router.route('/').post(protect, createOrder).get(protect, admin, getAllOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/events').get(protect, getPaymentResults);
router.route('/:id').get(protect, getOrderById).delete(protect, admin, deleteOrder);
router.route('/:id/pay').put(protect, PayToOrder);
router.route('/:id/paid').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

export default router;
