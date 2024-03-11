import asyncHandler from '../middleware/asyncHandler.js';
import MealKit from '../models/mealKitModel.js';

//meal kitleri çeker, public. /api/mealKits
const getMealKits = asyncHandler(async (req, res) => {
  const mealKits = await MealKit.find({});
  res.json(mealKits);
});

//meal kiti çeker, public. /api/mealKits/:id
const getMealKitById = asyncHandler(async (req, res) => {
  const mealKit = await MealKit.findById(req.params.id);

  if (mealKit) {
    return res.json(mealKit);
  } else {
    res.status(404);
    throw new Error('Meal not found with this id');
  }
});

export { getMealKits, getMealKitById };
