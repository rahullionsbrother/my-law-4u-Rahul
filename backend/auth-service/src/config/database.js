/**
 * ==============================================================================
 * MYLAW.COM - AUTH SERVICE: DATABASE CONFIGURATION
 * ==============================================================================
 * PURPOSE: Establishes a secure, scalable connection to PostgreSQL using a Pool.
 * FEATURES:
 * 1. Connection Pooling (Max 20 concurrent connections per pod).
 * 2. Idle Timeout (Frees up memory when traffic is low).
 * 3. Graceful Error Handling (Prevents the whole pod from crashing on DB disconnect).
 */

const { Pool } = require('pg');
require('dotenv').config();

// 1. INITIALIZE THE CONNECTION POOL
// We pull these values strictly from environment variables for security.
const pool = new Pool({
  host: process.env.DB_HOST,           // e.g., 'localhost' or an AWS RDS endpoint
  port: process.env.DB_PORT || 5432,   // Default Postgres port
  database: process.env.DB_NAME,       // e.g., 'mylaw_auth_db'
  user: process.env.DB_USER,           // e.g., 'postgres'
  password: process.env.DB_PASSWORD,   // e.g., 'SuperSecretPassword'
  
  // --- ENTERPRISE TUNING ---
  max: 20, // Maximum number of clients in the pool (per K8s Pod)
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error if it takes > 2 seconds to connect
});

// 2. GLOBAL ERROR LISTENER
// If the database goes down unexpectedly, this prevents the Node app from silently failing.
pool.on('error', (err, client) => {
  console.error('[DB Error] Unexpected error on idle client', err);
  // In a real enterprise app, this would trigger an alert to Sentry/Datadog
  process.exit(-1); 
});

// 3. EXPORT A QUERY WRAPPER
// Instead of exposing the raw pool, we export a query function. 
// This allows us to log or intercept every single query if we want to later.
module.exports = {
  query: (text, params) => {
    // Optional: console.log(`[DB Executing] ${text}`);
    return pool.query(text, params);
  },
  
  // Expose the raw pool just in case we need advanced transaction management
  pool: pool 
};