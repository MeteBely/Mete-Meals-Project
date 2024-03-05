import express from 'express';
import singleTypeMeals from './data/singleTypeMeals.js';
const app = express();
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('API is running');
});

app.get('/api/meals', (req, res) => {
  const date = req.query.date;
  const numberOfServ = req.query.numberOfServing;

  const specialMeals = singleTypeMeals.filter((meal) => meal.date === date && (meal.numberOfServing === numberOfServ || (meal.numberOfServing !== '1' && meal.numberOfServing !== '2' && meal.numberOfServing !== '4')));

  res.json(specialMeals);
});

app.get('/api/meals/:id', (req, res) => {
  const meal = singleTypeMeals.find((meal) => meal._id == req.params.id);
  res.json(meal);
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
