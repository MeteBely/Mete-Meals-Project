import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

//gişi yetkilendirilip token dönülür. /api/users/login
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// /api/users
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error('User already exists!');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(user._id, res);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data!');
  }
});

// /api/users/logout, private, kişiyi çıkarıp cookieyi temizler.
const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie('jwt');

  res.status(200).json({
    message: 'Successfully logged out',
  });
});

// /api/users/profile, public
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.user.email }); //id'ye görede yapılabilir.
  if (user) {
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});

// /api/users/profile, private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.user.email }); //id'ye görede yapılabilir.
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});

// /api/users, private/admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

// /api/users/:id, private/admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (!user.isAdmin) {
      await User.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(400);
      throw new Error('You are admin buddy!');
    }
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});

// /api/users/:id, private/admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});

// /api/users/:id, private/admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const { name, email, isAdmin } = req.body;
  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    user.isAdmin = Boolean(isAdmin);
    const updatedUser = await user.save();
    res.status(200).json({
      _id: user._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
});

export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, getUsers, getUserById, deleteUser, updateUser };
