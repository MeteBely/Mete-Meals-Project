import mongoose from 'mongoose';

const membershipSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    plan: {
      numberOfServing: {
        type: String,
        required: true,
      },
      mealsPerWeek: {
        type: String,
        required: true,
      },
      pricePerServing: {
        type: Number,
        required: true,
      },
      subTotal: {
        type: Number,
        required: true,
      },
      selectedMeals: {
        firstWeek: [
          {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Meal',
          },
        ],
        secondWeek: [
          {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Meal',
          },
        ],
        thirdWeek: [
          {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Meal',
          },
        ],
        fourthWeek: [
          {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Meal',
          },
        ],
      },
    },
    preference: {
      type: String,
      required: true,
    },
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const Membership = mongoose.model('Membership', membershipSchema);

export default Membership;
