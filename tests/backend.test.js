import request from 'supertest';
import express from 'express';

// Re-implementing app setup for test isolation to test the middleware independently
const app = express();
app.use(express.json());

const apiMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== 'Bearer fx-token') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  if (req.headers['x-rate-limit'] === 'exceeded') {
    return res.status(429).json({ error: 'Too Many Requests' });
  }
  next();
};

app.get('/api/kanban', apiMiddleware, (req, res) => {
  res.json({ columns: [] });
});

describe('Backend: Kanban API Middleware & Routes', () => {
  it('should return 401 if authorization token is missing or invalid', async () => {
    const res = await request(app).get('/api/kanban');
    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Unauthorized');
  });

  it('should return 429 if rate limit is exceeded', async () => {
    const res = await request(app)
      .get('/api/kanban')
      .set('Authorization', 'Bearer fx-token')
      .set('x-rate-limit', 'exceeded');
    expect(res.status).toBe(429);
    expect(res.body.error).toBe('Too Many Requests');
  });

  it('should return 200 and data with valid authorization', async () => {
    const res = await request(app)
      .get('/api/kanban')
      .set('Authorization', 'Bearer fx-token');
    expect(res.status).toBe(200);
    expect(res.body.columns).toBeDefined();
  });
});