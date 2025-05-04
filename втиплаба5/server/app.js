const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Подключение к MongoDB с DNS опциями
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
  socketTimeoutMS: 45000, // Socket timeout
  connectTimeoutMS: 30000, // Connection timeout
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4, // Force IPv4
  retryWrites: true,
  w: 'majority',
  ssl: true,
  tls: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error:', err));

// Роуты
const temperatureRoutes = require('./routes/temperature');
app.use('/api/temperature', temperatureRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));