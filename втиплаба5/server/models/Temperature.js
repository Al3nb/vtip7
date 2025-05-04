const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  region: { type: String, required: true },
  temperature: { type: Number, required: true },
  precipitation: { type: Number, required: true },
  date: { type: Date, required: true }
});

module.exports = mongoose.model('Weather', weatherSchema, 'weathers');