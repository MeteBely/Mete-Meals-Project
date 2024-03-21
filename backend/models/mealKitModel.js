import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

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
  reviews: [reviewSchema],
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
