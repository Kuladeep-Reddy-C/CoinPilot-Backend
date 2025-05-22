import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import testRoute from './routes/get.route.js';
import earningsRouter from './routes/earning.route.js'
import expenseRouter from './routes/expense.route.js';
import sendMailRouter from './routes/sendMail.route.js'
import downlaodTransactionRouter from './routes/downlaodTransactions.route.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI; 

// Middleware
app.use(cors());
app.use(express.json()); 

// Routes
app.use('/', testRoute);
app.use('/api', earningsRouter);
app.use('/api', expenseRouter);
app.use('/sendMail', sendMailRouter);
app.use('/pdf', downlaodTransactionRouter);

// MongoDB Connection
mongoose.connect(MONGO_URI)
.then(() => {
  console.log('MongoDB connected successfully');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
