import express from 'express';
import connectMongoDB from './config/db.js';
import cookieParser from 'cookie-parser';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import mealRoutes from './routes/mealRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import mealKitsRoutes from './routes/mealKitsRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import giftCardRoutes from './routes/giftCardRoutes.js';

const port = process.env.PORT || 5000;

connectMongoDB();

//Body Parser
app.use(express.json()); //req.body --> raw
app.use(express.urlencoded({ extended: true })); //req.body --> urlencoded
app.use(cookieParser()); //req.cookie

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/meals', mealRoutes);
app.use('/api/mealKits', mealKitsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/giftCards', giftCardRoutes);

app.get('/api/config/stripe', (req, res) => res.json(process.env.STRIPE_PUBLISHABLE_KEY));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
