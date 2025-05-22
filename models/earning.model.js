import { Schema, model } from 'mongoose';

const earningSchema = new Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  date: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
    trim: true,
  },
  userId: {
    type: String,
    required: true,
  }
}, {
  timestamps: true  // Optional: adds createdAt and updatedAt fields
});

export default model('Earning', earningSchema);
