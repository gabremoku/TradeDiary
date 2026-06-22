import express from 'express';
import cors from 'cors';
import { tradesRouter } from './routes/trades';
import { errorHandler } from './middleware/errorHandler';

// Initialize DB on startup
import './db/database';

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(cors({ origin: process.env.CLIENT_URL ?? 'http://localhost:5173' }));
app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/trades', tradesRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`TradeDiary API running on http://localhost:${PORT}`);
});
