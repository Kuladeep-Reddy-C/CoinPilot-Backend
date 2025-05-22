import express from 'express';
import {
  generateAllTransactionsPDF,
  generateEarningsPDF,
  generateExpensesPDF
} from '../services/pdfGen.js';

const router = express.Router();

router.get('/:name', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No valid token provided' });
    }

    const token = authHeader.replace('Bearer ', ''); // Extract token

    res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=transaction.pdf',
    });

    const name = req.params.name;

    if (name === 'all') {
      await generateAllTransactionsPDF(
        (chunk) => res.write(chunk),
        () => res.end(),
        token
      );
    } else if (name === 'expenses') {
      await generateExpensesPDF(
        (chunk) => res.write(chunk),
        () => res.end(),
        token
      );
    } else if (name === 'earnings') {
      await generateEarningsPDF(
        (chunk) => res.write(chunk),
        () => res.end(),
        token
      );
    } else {
      res.status(400).json({ error: 'Invalid PDF type requested' });
    }
  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).send('Error generating PDF');
  }
});

export default router;
