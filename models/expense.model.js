import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  date: {
    type: Date,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
});

export default mongoose.model('Expense', ExpenseSchema);
