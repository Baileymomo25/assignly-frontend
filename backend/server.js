const express = require('express');
const cors = require('cors');
require('dotenv').config();

const requestRoutes = require('./routes/requests');
const paymentRoutes = require('./routes/payments');

const app = express();
const PORT = process.env.PORT || 5000;

// Enhanced CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow requests from localhost during development
    if (origin.startsWith('http://localhost')) {
      return callback(null, true);
    }
    
    // Allow requests from your production frontend domain
    if (origin.startsWith('https://yourdomain.vercel.app')) {
      return callback(null, true);
    }
    
    // Block other origins
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' })); // Increase payload limit for file uploads

// Routes
app.use('/api/requests', requestRoutes);
app.use('/api/payments', paymentRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Test endpoint for debugging
app.post('/api/debug', (req, res) => {
  console.log('Debug request received:', req.body);
  res.json({ 
    message: 'Debug endpoint working', 
    receivedData: req.body,
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ error: 'CORS policy violation' });
  }
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});