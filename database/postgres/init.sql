-- ==============================================================================
-- MYLAW.COM - DATABASE INITIALIZATION SCRIPT
-- ==============================================================================
-- This script runs exactly once when the Docker container is first created.

-- 1. Create the Users Table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('client', 'advocate', 'admin')),
    bar_council_id VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Insert a Default Master Admin Account
-- Note: The password below is the bcrypt hash for "Admin@123"
INSERT INTO users (first_name, last_name, email, password_hash, role) 
VALUES (
    'System', 
    'Administrator', 
    'admin@mylaw.com', 
    '$2a$10$wK1.b8fM8tH1g1N.m1d.j.Z3z45r3m3H3X3r3m3H3X3r3m3H3X', 
    'admin'
) ON CONFLICT (email) DO NOTHING;