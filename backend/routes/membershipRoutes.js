import express from 'express';
import { payToMembership, createMembership, getUserMembership, getMemberships, MyMembershipId, deleteMembershipById, updateMembershipMealsToDelivered } from '../controllers/membershipController.js';
import { admin, protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').get(protect, admin, getMemberships).post(protect, createMembership);
router.route('/myMembershipId').get(protect, MyMembershipId);
router.route('/pay').post(protect, payToMembership);
router.route('/:id').get(protect, getUserMembership).delete(protect, admin, deleteMembershipById).put(protect, admin, updateMembershipMealsToDelivered);

export default router;
