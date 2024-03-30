import asyncHandler from '../middleware/asyncHandler.js';
import Balance from '../models/balanceModel.js';

const getBalance = asyncHandler(async (req, res) => {
  const userBalance = await Balance.findOne({ user: req.user._id });
  res.status(201).json(userBalance);
});

const updateToUserBalance = asyncHandler(async (req, res) => {
  const { amount } = req.body;
  const userBalance = await Balance.findOne({ user: req.user._id });

  if (userBalance) {
    userBalance.balance = userBalance.balance + amount;
    await userBalance.save();
    res.status(201).json(userBalance);
  } else {
    const balance = new Balance({
      user: req.user._id,
      balance: amount,
    });
    await balance.save();
    res.status(201).json(balance);
  }
});

export { getBalance, updateToUserBalance };
