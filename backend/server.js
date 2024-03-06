import express from 'express';
import connectMongoDB from './config/db.js';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import mealRoutes from './routes/mealRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const port = process.env.PORT || 5000;

connectMongoDB();

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/meals', mealRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
