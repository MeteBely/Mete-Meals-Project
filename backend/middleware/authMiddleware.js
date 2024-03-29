import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select('-password'); //diğer middlewarelerde kullanacağız bu user'i.
      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error('Not authorized! token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized! No token found!');
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as admin');
  }
};

export { admin, protect };
