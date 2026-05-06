import express from 'express';

const app = express();
app.use(express.json());

// Middleware: Audit Trail & Validation
const apiMiddleware = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] | ${req.method} ${req.url} | PENDING`);
  
  // Validation for 401 Auth
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== 'Bearer fx-token') {
    console.log(`[${timestamp}] | ${req.method} ${req.url} | 401 Unauthorized`);
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  // Validation for 429 Rate Limit mock
  if (req.headers['x-rate-limit'] === 'exceeded') {
    console.log(`[${timestamp}] | ${req.method} ${req.url} | 429 Too Many Requests`);
    return res.status(429).json({ error: 'Too Many Requests' });
  }

  next();
};

// API Route Wrapper
app.get('/api/kanban', apiMiddleware, async (req, res) => {
  try {
    // Mock Data Integration
    const boardData = {
       columns: [
         { id: 'todo', title: 'To Do', cards: [{ id: 'c1', title: 'Setup Lit Component' }, { id: 'c2', title: 'Configure Express Middleware' }] },
         { id: 'in-progress', title: 'In Progress', cards: [{ id: 'c3', title: 'Build UI' }] },
         { id: 'done', title: 'Done', cards: [] }
       ]
    };
    
    console.log(`[${new Date().toISOString()}] | GET /api/kanban | 200 OK`);
    res.json(boardData);
  } catch (error) {
    console.log(`[${new Date().toISOString()}] | GET /api/kanban | 500 ERROR | ${error.message}`);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));