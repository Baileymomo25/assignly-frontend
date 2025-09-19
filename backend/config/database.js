const { Pool } = require('pg');
require('dotenv').config();

// Validate database URL
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL environment variable is required');
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  // Add connection timeout
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30000,
  max: 20
});

// Test the connection
pool.on('connect', (client) => {
  console.log('Database connected successfully');
});

pool.on('error', (err, client) => {
  console.error('Unexpected database error:', err);
  process.exit(-1);
});

// Verify connection on startup
(async () => {
  try {
    const client = await pool.connect();
    console.log('Database connection verified');
    client.release();
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
})();

module.exports = pool;