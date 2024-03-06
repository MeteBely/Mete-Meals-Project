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

const mealSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    subTxt: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    dietaryInformation: {
      type: String,
    },
    frontFeature: {
      type: String,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    calori: {
      type: Number,
      required: true,
    },
    numberOfServing: {
      type: String,
      required: true,
    },
    isVegetarian: {
      type: Boolean,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    recipe: [
      {
        step: {
          type: Number,
        },
        title: {
          type: String,
        },
        recipeDescription: {
          type: String,
        },
        image: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Meal = mongoose.model('Meal', mealSchema);

export default Meal;
