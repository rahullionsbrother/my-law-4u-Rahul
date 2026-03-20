/**
 * ==============================================================================
 * MYLAW.COM - AUTH SERVICE: JWT MIDDLEWARE
 * ==============================================================================
 * PURPOSE: Protects secure routes by verifying JSON Web Tokens (JWT).
 * FEATURES: 
 * 1. Validates the 'Bearer' token in the HTTP Authorization header.
 * 2. Implements Role-Based Access Control (RBAC) for Admins/Advocates.
 */

const jwt = require('jsonwebtoken');

/**
 * 1. THE PROTECT MIDDLEWARE (Authentication)
 * Verifies who the user is.
 */
const protect = (req, res, next) => {
  let token;

  // Check if the Authorization header exists and starts with 'Bearer '
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    // Extract the actual token string (removing the "Bearer " prefix)
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token cryptographically using the secret in your .env file
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded payload (id, email, role) to the request object
    // This makes the user's ID available to whatever Controller function runs next
    req.user = decoded;

    // Pass control to the next function in the route
    next();
  } catch (error) {
    console.error('[AuthMiddleware] Token verification failed:', error.message);
    
    // Distinguish between an expired token and a tampered token
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Session expired. Please log in again.' });
    }
    return res.status(401).json({ error: 'Invalid token.' });
  }
};

/**
 * 2. THE AUTHORIZE MIDDLEWARE (Authorization/RBAC)
 * Verifies what the user is allowed to do based on their role.
 * MUST be used AFTER the 'protect' middleware.
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    // req.user was attached by the 'protect' middleware above
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: `Access forbidden. Role '${req.user ? req.user.role : 'unknown'}' is not authorized.` 
      });
    }
    next();
  };
};

module.exports = { protect, authorize };