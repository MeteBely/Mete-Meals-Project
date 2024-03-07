import asyncHandler from '../middleware/asyncHandler.js';
import MealKit from '../models/mealKitModel.js';

//meal kitleri çeker, public. /api/mealKits
const getMealKits = asyncHandler(async (req, res) => {
  const mealKits = await MealKit.find({});
  res.json(mealKits);
});

export { getMealKits };
