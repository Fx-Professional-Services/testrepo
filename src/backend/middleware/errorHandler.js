// File: src/backend/middleware/errorHandler.js

/**
 * Global error handling middleware
 * Handles 401 (Auth) and 429 (Rate Limit) errors explicitly
 */
function errorHandler(err, req, res, next) {
  console.error(`[ERROR] ${new Date().toISOString()} | ${err.message}`);

  // Handle specific error codes
  if (err.status === 401) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized access',
      code: 'AUTH_REQUIRED'
    });
  }

  if (err.status === 429) {
    return res.status(429).json({
      success: false,
      message: 'Too many requests. Please try again later.',
      code: 'RATE_LIMIT_EXCEEDED'
    });
  }

  // Handle validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: err.message,
      code: 'VALIDATION_ERROR'
    });
  }

  // Handle JSON parse errors
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      message: 'Invalid JSON in request body',
      code: 'INVALID_JSON'
    });
  }

  // Default error response
  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' 
      ? 'An unexpected error occurred' 
      : err.message,
    code: 'INTERNAL_ERROR'
  });
}

export default errorHandler;