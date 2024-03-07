import express from 'express';
import { getMealKits } from '../controllers/mealKitController.js';
const router = express.Router();

router.route('/').get(getMealKits);

export default router;
