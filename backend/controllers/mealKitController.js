import asyncHandler from '../middleware/asyncHandler.js';
import MealKit from '../models/mealKitModel.js';

//meal kitleri çeker, public.
const getMealKits = asyncHandler(async (req, res) => {
  const mealKits = await MealKit.find({}).populate([{ path: 'meals.meal', select: 'img' }]);
  res.json(mealKits);
});

//meal kiti çeker id'ye göre çeker. Ekstra olarak içerisindeki meallerin img, subTxt ve name'sini populate eder. public.
const getMealKitById = asyncHandler(async (req, res) => {
  const mealKit = await MealKit.findById(req.params.id).populate([{ path: 'meals.meal', select: 'img subTxt name' }]);
  if (mealKit) {
    return res.json(mealKit);
  } else {
    res.status(404);
    throw new Error('Meal not found with this id');
  }
});

//admin meal kit oluşturabilir. Oluşturduğu meal kit sample'dir. İsterse daha sonra editleyebilir.
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

//admin meal kiti güncelleyebilir. Id'ye göre meal kiti aldıktan çektikten sonra verileri güncelleyip save edilir.
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

//Admin, Id'ye göre meal kiti çekip siler.
const deleteMealKit = asyncHandler(async (req, res) => {
  const mealKit = await MealKit.findById(req.params.id);
  if (mealKit) {
    await MealKit.deleteOne({ _id: req.params.id });
    res.status(201).json({ message: 'MealKit deleted successfully' });
  } else {
    res.status(404);
    throw new Error('Meal kit not found with this id');
  }
});

//Giriş yapmış kullanıcı meal kite review yazabilir. Bir kişi aynı meal kite birden fazla review yazamaz.
const createMealKitReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const mealKit = await MealKit.findById(req.params.id);
  if (mealKit) {
    const alreadyReviewed = mealKit.reviews.find((review) => review.user.toString() === req.user._id.toString());
    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Meal kit already reviewed!');
    }
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment: comment,
    };
    mealKit.reviews.push(review);
    await mealKit.save();
    res.status(201).json({ message: 'Meal kit reviewed successfully!' });
  } else {
    res.status(404);
    throw new Error('Meal kit not found with this id');
  }
});

export { getMealKits, getMealKitById, createMealKit, updateMealKit, deleteMealKit, createMealKitReview };
