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

//admin
const createMealKit = asyncHandler(async (req, res) => {
  const mealKit = new MealKit({
    name: 'Sample Name',
    subTxt: 'Sample SubTxt',
    price: 0,
    description: 'sample description',
    meals: [],
  });

  const sampleMealKit = await mealKit.save();
  res.status(201).json(sampleMealKit);
});

//admin
const updateMealKit = asyncHandler(async (req, res) => {
  const mealKit = await MealKit.findById(req.params.id);
  const { name, subTxt, price, description, meals } = req.body;

  if (mealKit) {
    mealKit.name = name;
    mealKit.subTxt = subTxt;
    mealKit.price = price;
    mealKit.description = description;
    mealKit.meals = meals;
    const updatedMealKit = await mealKit.save();
    res.status(201).json(updatedMealKit);
  } else {
    res.status(404);
    throw new Error('Meal kit not found with this id');
  }
});

export { getMealKits, getMealKitById, createMealKit, updateMealKit };
