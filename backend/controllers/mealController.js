import asyncHandler from '../middleware/asyncHandler.js';
import Meal from '../models/mealModel.js';

//servis sayısı ve meal parametrelerine göre mealleri çeker, public. /api/meals
const getMeals = asyncHandler(async (req, res) => {
  const date = req.query.date;
  const numberOfServ = req.query.numberOfServing;

  const singleTypeMeals = await Meal.find({});

  const specialMeals = singleTypeMeals.filter((meal) => meal.date === date && (meal.numberOfServing === numberOfServ || (meal.numberOfServing !== '1' && meal.numberOfServing !== '2' && meal.numberOfServing !== '4')));

  res.json(specialMeals);
});

//id'ye göre meali çeker, public. GET /api/meals/:id
const getMealById = asyncHandler(async (req, res) => {
  const meal = await Meal.findById(req.params.id);

  if (meal) {
    return res.json(meal);
  } else {
    // res.status(404).json({ message: 'Meal not found with this id' });
    res.status(404);
    throw new Error('Meal not found with this id');
  }
});

export { getMeals, getMealById };
