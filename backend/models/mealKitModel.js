import mongoose from 'mongoose';

const mealKitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subTxt: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  meals: [
    {
      meal: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Meal',
      },
    },
  ],
});

const MealKit = mongoose.model('MealKit', mealKitSchema);

export default MealKit;
