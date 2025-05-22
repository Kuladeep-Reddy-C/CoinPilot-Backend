import express from 'express'
import Expense from '../models/expense.model.js';
import { requireAuth } from '@clerk/express';

const router = express.Router();

router.use(requireAuth());

router.post('/expense', async (req, res) => {
  try {
    const userId = req.auth.userId;
    const {description, amount, category, paymentMethod, date} = req.body;

    console.log("Request body:", req.body);
    if (!description || !amount || !category || !date || !paymentMethod) {
      return res.status(400).json({ message: 'Missing fields', missing: {description, amount, category, paymentMethod, date} });
    }

    const expense = new Expense({ description, amount, category, date, paymentMethod, userId });
    console.log("Expense to save:", expense);
    const saved = await expense.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error saving expense:", err);
    res.status(500).json({ message: 'Server error', details: err.message });
  }
});


router.get('/expense',  async (req, res) => {
  try {
    const userId = req.auth.userId;
    const expenses = await Expense.find({ userId });
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.delete('/expense/:id', async (req, res) => {
  try {
    const userId = req.auth.userId;
    const expenseId = req.params.id;

    const expense = await Expense.findOne({ _id: expenseId, userId });

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found or unauthorized' });
    }

    await Expense.deleteOne({ _id: expenseId });

    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/expense/:id', async (req, res) => {
  try {
    const userId = req.auth.userId;
    const expenseId = req.params.id;
    const { description, amount, category, paymentMethod, date } = req.body;

    if (!description || !amount || !category || !paymentMethod || !date) {
      return res.status(400).json({ message: 'Missing fields', missing: { description, amount, category, paymentMethod, date } });
    }

    const expense = await Expense.findOne({ _id: expenseId, userId });

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found or unauthorized' });
    }

    expense.description = description;
    expense.amount = amount;
    expense.category = category;
    expense.paymentMethod = paymentMethod;
    expense.date = date;

    const updatedExpense = await expense.save();
    res.status(200).json(updatedExpense);
  } catch (err) {
    console.error("Error updating expense:", err);
    res.status(500).json({ message: 'Server error', details: err.message });
  }
});


export default router;