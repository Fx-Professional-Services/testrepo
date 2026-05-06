// File: src/backend/server.js
import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import contactsRouter from './routes/contacts.js';
import errorHandler from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/contacts', contactsRouter);

// Serve static frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '../../dist')));
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../../dist/index.html'));
  });
}

// Error handling
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    message: 'Endpoint not found' 
  });
});

app.listen(PORT, () => {
  console.log(`FX Contact Manager API running on http://localhost:${PORT}`);
});

export default app;