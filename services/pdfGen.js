import PDFDocument from 'pdfkit';
import fetch from 'node-fetch';

const url = process.env.BACKEND_URL;

async function fetchTransactions(token, type) {
  const endpoints = {
    earnings: '/api/earning',
    expenses: '/api/expense'
  };

  try {
    const [earningsRes, expensesRes] = await Promise.all([
      type === 'expenses' ? Promise.resolve({ ok: true, json: async () => [] }) : fetch(url + endpoints.earnings, {
        headers: { 'Authorization': `Bearer ${token}` }
      }),
      type === 'earnings' ? Promise.resolve({ ok: true, json: async () => [] }) : fetch(url + endpoints.expenses, {
        headers: { 'Authorization': `Bearer ${token}` }
      }),
    ]);

    if (!earningsRes.ok) throw new Error(`Earnings error: ${earningsRes.status}`);
    if (!expensesRes.ok) throw new Error(`Expenses error: ${expensesRes.status}`);

    const earnings = await earningsRes.json();
    const expenses = await expensesRes.json();

    return { earnings, expenses };
  } catch (error) {
    console.error('Fetch error:', error);
    return { earnings: [], expenses: [] };
  }
}

function generateTable(doc, title, data) {
  doc.moveDown().fontSize(16).text(title);
  if (data.length === 0) {
    doc.fontSize(12).text('No data available.');
    return;
  }

  doc.moveDown().fontSize(12).text('Description'.padEnd(40) + 'Amount');
  doc.moveDown(0.5);

  data.forEach((item, idx) => {
    const desc = item.description?.padEnd(40) || 'Unknown'.padEnd(40);
    const amt = `$${item.amount || 0}`;
    doc.text(`${desc}${amt}`);
  });
}

function buildPDF(dataCallback, endCallback, { earnings, expenses }, section = 'all') {
  const doc = new PDFDocument();
  doc.on('data', dataCallback);
  doc.on('end', endCallback);

  doc.fontSize(22).text('Transaction Report', { align: 'center' });
  doc.moveDown(2);

  if (section === 'earnings') {
    generateTable(doc, 'Earnings', earnings);
  } else if (section === 'expenses') {
    generateTable(doc, 'Expenses', expenses);
  } else {
    generateTable(doc, 'Earnings', earnings);
    doc.moveDown(2);
    generateTable(doc, 'Expenses', expenses);
  }

  doc.end();
}

export async function generateAllTransactionsPDF(dataCallback, endCallback, token) {
  const transactions = await fetchTransactions(token, 'all');
  buildPDF(dataCallback, endCallback, transactions, 'all');
}

export async function generateExpensesPDF(dataCallback, endCallback, token) {
  const transactions = await fetchTransactions(token, 'expenses');
  buildPDF(dataCallback, endCallback, transactions, 'expenses');
}

export async function generateEarningsPDF(dataCallback, endCallback, token) {
  const transactions = await fetchTransactions(token, 'earnings');
  buildPDF(dataCallback, endCallback, transactions, 'earnings');
}
