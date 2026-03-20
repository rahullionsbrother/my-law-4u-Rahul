/**
 * ==============================================================================
 * MYLAW.COM - AUTH SERVICE: ROUTER
 * ==============================================================================
 * PURPOSE: Maps HTTP endpoints (URLs) to their corresponding Controller functions.
 */

const express = require('express');
const AuthController = require('../controllers/authController');

// Create an Express Router instance
const router = express.Router();

/**
 * ==============================================================================
 * API ENDPOINTS
 * Base Path: /api/v1/auth (Defined in server.js)
 * ==============================================================================
 */

// POST /api/v1/auth/register
// Route for creating a new client, advocate, or admin account
router.post('/register', AuthController.register);

// POST /api/v1/auth/login
// Route for authenticating an existing user and returning a JWT
router.post('/login', AuthController.login);

// (Future Expansion: You would add routes like /forgot-password or /reset-password here)

module.exports = router;