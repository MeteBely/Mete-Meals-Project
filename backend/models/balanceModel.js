import mongoose from 'mongoose';

const balanceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Balance = mongoose.model('Balance', balanceSchema);

export default Balance;
