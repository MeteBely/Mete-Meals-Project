import asyncHandler from '../middleware/asyncHandler.js';
import Meal from '../models/mealModel.js';

//servis sayısı ve meal parametrelerine göre mealleri çeker, public.
const getMeals = asyncHandler(async (req, res) => {
  const date = req.query.date;
  const numberOfServ = req.query.numberOfServing;
  const preference = req.query.preference || null;
  const singleTypeMeals = await Meal.find({});
  //Eğer numberOfServ flex gönderilmiş ise, servis sayısı 1, 2 ve 4 dışındaki mealleri tarihe ve preference'ye göre çeker.
  const specialMeals = singleTypeMeals.filter((meal) => (preference ? meal.dietaryInformation === preference : true) && meal.date === date && (numberOfServ !== 'flex' ? meal.numberOfServing === numberOfServ : meal.numberOfServing !== '1' && meal.numberOfServing !== '2' && meal.numberOfServing !== '4'));
  res.json(specialMeals);
});

//id'ye göre meali çeker, public.
const getMealById = asyncHandler(async (req, res) => {
  const meal = await Meal.findById(req.params.id);
  if (meal) {
    return res.json(meal);
  } else {
    res.status(404);
    throw new Error('Meal not found with this id');
  }
});

export { getMeals, getMealById };
