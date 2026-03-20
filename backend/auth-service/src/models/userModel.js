/**
 * ==============================================================================
 * MYLAW.COM - AUTH SERVICE: USER MODEL
 * ==============================================================================
 * PURPOSE: Handles all direct database interactions for the User entity.
 * SECURITY: Uses Parameterized Queries ($1, $2) to prevent SQL Injection attacks.
 */

const db = require('../config/database');

const UserModel = {
  /**
   * 1. INITIALIZE TABLE
   * Creates the users table if it doesn't already exist.
   * In a strict production environment, you would use migration tools (like Flyway or Sequelize CLI),
   * but this is excellent for bootstrapping our microservice.
   */
  createTable: async () => {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL CHECK (role IN ('client', 'advocate', 'admin')),
        bar_council_id VARCHAR(100), -- Only required if role is 'advocate'
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    try {
      await db.query(query);
      console.log('[Model] 🟢 Users table ready.');
    } catch (error) {
      console.error('[Model] 🔴 Error creating users table:', error);
      throw error;
    }
  },

  /**
   * 2. FIND USER BY EMAIL
   * Used during Login to check if the user exists, and during Signup to prevent duplicates.
   */
  findByEmail: async (email) => {
    // We use $1 to prevent SQL injection. Never concatenate strings directly into SQL!
    const query = `SELECT * FROM users WHERE email = $1`;
    try {
      const result = await db.query(query, [email.toLowerCase()]);
      return result.rows[0]; // Returns the user object, or undefined if not found
    } catch (error) {
      console.error('[Model] Error finding user by email:', error);
      throw error;
    }
  },

  /**
   * 3. CREATE NEW USER
   * Inserts a new user into the database securely.
   */
  createUser: async (userData) => {
    const { firstName, lastName, email, passwordHash, role, barCouncilId } = userData;
    
    // The RETURNING * clause tells Postgres to send back the newly created row immediately
    const query = `
      INSERT INTO users (first_name, last_name, email, password_hash, role, bar_council_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, first_name, last_name, email, role, bar_council_id, created_at;
    `;
    
    const values = [
      firstName, 
      lastName, 
      email.toLowerCase(), 
      passwordHash, 
      role, 
      barCouncilId || null
    ];

    try {
      const result = await db.query(query, values);
      return result.rows[0]; // Returns the user (without the password_hash!)
    } catch (error) {
      console.error('[Model] Error creating user:', error);
      throw error;
    }
  }
};

module.exports = UserModel;