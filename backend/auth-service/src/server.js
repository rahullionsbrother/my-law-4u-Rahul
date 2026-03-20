/**
 * ==============================================================================
 * MYLAW.COM - AUTHENTICATION MICROSERVICE ENTRY POINT
 * ==============================================================================
 * PURPOSE: Bootstraps the Express server, configures global middleware, 
 * establishes the database connection, and mounts the API routes.
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Import the Database Connection Pool and Routes
const db = require('./config/database');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 8080;

// ==============================================================================
// 1. GLOBAL MIDDLEWARE
// ==============================================================================
// Enable CORS. Explicitly allowing localhost and 127.0.0.1 to prevent browser blocks.
app.use(cors({
  origin: ['http://localhost:9090', 'http://127.0.0.1:9090', process.env.FRONTEND_URL],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Parse incoming JSON payloads automatically
app.use(express.json());

// ==============================================================================
// 2. KUBERNETES HEALTH CHECKS
// ==============================================================================
// K8s Liveness/Readiness probe endpoint. Must return 200 OK instantly.
app.get('/health', (req, res) => {
  res.status(200).json({
    service: 'mylaw-auth-service',
    status: 'UP',
    timestamp: new Date().toISOString()
  });
});

// ==============================================================================
// 3. API ROUTING
// ==============================================================================
// All /api/v1/auth requests are now officially delegated to the AuthRouter
app.use('/api/v1/auth', authRoutes);


// ==============================================================================
// 4. SERVER BOOTSTRAP & DATABASE VERIFICATION
// ==============================================================================
app.listen(PORT, async () => {
  console.log(`[Auth Service] 🚀 Server is running on internal port ${PORT}`);
  console.log(`[Auth Service] 🏥 Health check available at http://localhost:${PORT}/health`);
  
  // Database Connection Check
  const checkDatabase = async () => {
    try {
      const res = await db.query('SELECT NOW() AS current_time');
      console.log(`[Auth Service] 🟢 PostgreSQL connected successfully at ${res.rows[0].current_time.toISOString()}`);
    } catch (error) {
      console.error(`[Auth Service] 🔴 PostgreSQL connection failed:`, error.message);
      console.error(`[Auth Service] ⚠️ Retrying connection in 5 seconds...`);
      // Auto-retry prevents the container from staying broken if Postgres boots slowly
      setTimeout(checkDatabase, 5000); 
    }
  };

  checkDatabase();
});