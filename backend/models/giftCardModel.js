import mongoose from 'mongoose';

const giftCardSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const GiftCard = mongoose.model('GiftCard', giftCardSchema);

export default GiftCard;
