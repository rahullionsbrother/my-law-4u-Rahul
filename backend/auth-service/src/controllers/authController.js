/**
 * ==============================================================================
 * MYLAW.COM - AUTH SERVICE: CONTROLLER
 * ==============================================================================
 * PURPOSE: Handles the business logic for user registration and authentication.
 * SECURITY: Implements bcrypt for password hashing and JWT for stateless sessions.
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

// Helper function to generate JWTs
const generateToken = (user) => {
  // Payload: The data baked into the token (Do not put passwords here!)
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role
  };

  // Sign the token using your secret key from the .env file
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  });
};

const AuthController = {
  /**
   * ============================================================================
   * 1. REGISTER A NEW USER
   * ============================================================================
   */
  register: async (req, res) => {
    try {
      const { firstName, lastName, email, password, role, barCouncilId } = req.body;

      // 1. Basic Validation
      if (!firstName || !lastName || !email || !password || !role) {
        return res.status(400).json({ error: 'All mandatory fields must be provided.' });
      }

      if (role === 'advocate' && !barCouncilId) {
        return res.status(400).json({ error: 'Bar Council ID is required for advocates.' });
      }

      // 2. Check if user already exists
      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({ error: 'An account with this email already exists.' });
      }

      // 3. Hash the Password securely
      // '10' is the salt rounds. It determines how computationally expensive the hash is.
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      // 4. Save to Database
      const newUser = await UserModel.createUser({
        firstName,
        lastName,
        email,
        passwordHash,
        role,
        barCouncilId
      });

      // 5. Generate Auth Token
      const token = generateToken(newUser);

      // 6. Return Success Response
      res.status(201).json({
        message: 'User registered successfully',
        token,
        user: newUser
      });

    } catch (error) {
      console.error('[AuthController] Registration Error:', error);
      res.status(500).json({ error: 'Internal server error during registration.' });
    }
  },

  /**
   * ============================================================================
   * 2. LOGIN EXISTING USER
   * ============================================================================
   */
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // 1. Basic Validation
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
      }

      // 2. Find the user in the database
      const user = await UserModel.findByEmail(email);
      if (!user) {
        // Security Tip: Use generic error messages so hackers don't know if the email exists
        return res.status(401).json({ error: 'Invalid email or password.' });
      }

      // 3. Verify the Password
      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }

      // 4. Generate Auth Token
      const token = generateToken(user);

      // 5. Remove the password hash before sending the user object back to React
      delete user.password_hash;

      // 6. Return Success Response
      res.status(200).json({
        message: 'Login successful',
        token,
        user
      });

    } catch (error) {
      console.error('[AuthController] Login Error:', error);
      res.status(500).json({ error: 'Internal server error during login.' });
    }
  }
};

module.exports = AuthController;