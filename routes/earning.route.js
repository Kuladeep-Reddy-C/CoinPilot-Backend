import express from 'express'
import mongoose from 'mongoose';
import Earning from '../models/earning.model.js';
import { requireAuth } from '@clerk/express';

const router = express.Router();

router.use(requireAuth());

router.post('/earning', async (req, res) => {
  try {
    const userId = req.auth.userId;
    const { description, amount, category, date, source } = req.body;

    console.log("Request body:", req.body);
    if (!description || !amount || !category || !date || !source) {
      return res.status(400).json({ message: 'Missing fields', missing: { description, amount, category, date, source } });
    }

    const earning = new Earning({ description, amount, category, date, source, userId });
    console.log("Earning to save:", earning);
    const saved = await earning.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error saving earning:", err);
    res.status(500).json({ message: 'Server error', details: err.message });
  }
});

router.get('/earning',  async (req, res) => {
  try {
    const userId = req.auth.userId;
    const earnings = await Earning.find({ userId });
    res.status(200).json(earnings);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.delete('/earning/:id', async (req, res) => {
  try {
    const userId = req.auth.userId;
    const earningId = req.params.id;

    const earning = await Earning.findOne({ _id: earningId, userId });

    if (!earning) {
      return res.status(404).json({ message: 'earning not found or unauthorized' });
    }

    await Earning.deleteOne({ _id: earningId });

    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/earning/:id', async (req, res) => {
  try {
    const userId = req.auth.userId;
    const earningId = req.params.id;
    const { description, amount, category, source, date } = req.body;

    if (!description || !amount || !category || !source || !date) {
      return res.status(400).json({ message: 'Missing fields', missing: { description, amount, category, source, date } });
    }

    const earning = await Earning.findOne({ _id: earningId, userId });

    if (!earning) {
      return res.status(404).json({ message: 'Earning not found or unauthorized' });
    }

    earning.description = description;
    earning.amount = amount;
    earning.category = category;
    earning.source = source;
    earning.date = date;

    const updatedEarning = await earning.save();
    res.status(200).json(updatedEarning);
  } catch (err) {
    console.error("Error updating earning:", err);
    res.status(500).json({ message: 'Server error', details: err.message });
  }
});

export default router;