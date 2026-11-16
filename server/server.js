require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 5000;
let connectionPromise;

const clientOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

async function connectToDatabase() {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not configured.');
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      maxPoolSize: 10,
    }).catch(error => {
      connectionPromise = null;
      throw error;
    });
  }

  return connectionPromise;
}

app.locals.connectToDatabase = connectToDatabase;

app.use(cors({ origin: clientOrigins }));
app.use(express.json());

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 50 });
app.use('/api/contact', limiter);

app.use('/api/contact', require('./routes/contact'));
app.use('/api/analytics', require('./routes/analytics'));

app.get('/api/health', async (req, res) => {
  try {
    await connectToDatabase();
    res.json({ status: 'ok', database: 'connected' });
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    res.status(503).json({ status: 'degraded', database: 'disconnected' });
  }
});

if (require.main === module) {
  connectToDatabase()
    .then(() => console.log('MongoDB connected'))
    .catch(error => console.error('MongoDB connection failed:', error.message));

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
