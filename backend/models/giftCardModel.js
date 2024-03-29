import mongoose from 'mongoose';

const giftCardSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
});

const GiftCard = mongoose.model('GiftCard', giftCardSchema);

export default GiftCard;
