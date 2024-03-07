import mongoose from 'mongoose';
import dotenv from 'dotenv';
import singleTypeMeals from './data/singleTypeMeals.js';
import users from './data/users.js';
import User from './models/userModel.js';
import Meal from './models/mealModel.js';
import Order from './models/orderModel.js';
import connectMongoDB from './config/db.js';
import MealKit from './models/mealKitModel.js';
import mealKits from './data/mealKits.js';

dotenv.config();

connectMongoDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Meal.deleteMany();
    await Order.deleteMany();
    await MealKit.deleteMany();

    await MealKit.insertMany(mealKits);
    await User.insertMany(users);
    await Meal.insertMany(singleTypeMeals);

    console.log('Data imported successfully!');
    process.exit();
  } catch (err) {
    console.log(`${err}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Meal.deleteMany();
    await Order.deleteMany();

    console.log('Data deleted successfully!');
    process.exit();
  } catch (err) {
    console.log(`${err}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
