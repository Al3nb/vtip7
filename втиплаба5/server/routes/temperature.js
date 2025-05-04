const express = require('express');
const router = express.Router();
const Temperature = require('../models/Temperature');

// Получение всех записей с пагинацией
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;
    
    const temperatures = await Temperature.find()
      .limit(limit)
      .skip(skip)
      .lean();
    
    const total = await Temperature.countDocuments();
    
    res.json({
      temperatures,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Добавление новой записи
router.post('/', async (req, res) => {
  try {
    const temperature = new Temperature({
      region: req.body.region,
      temperature: req.body.temperature,
      precipitation: req.body.precipitation,
      date: new Date(req.body.date)
    });
    
    const newTemperature = await temperature.save();
    res.status(201).json(newTemperature);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Получение минимальной температуры по дате
router.post('/min-temp', async (req, res) => {
  try {
    const { date } = req.body;
    console.log('Requested date:', date);
    
    // Преобразование в формат даты в ISO формате
    const dateString = date.split('T')[0]; // Получаем только дату YYYY-MM-DD
    console.log('Date string for query:', dateString);
    
    // Поиск всех записей для отладки
    const allRecords = await Temperature.find().lean();
    console.log('All records in database:', JSON.stringify(allRecords, null, 2));
    
    // Ищем записи за искомую дату без ограничения времени
    const records = await Temperature.find({
      date: {
        $gte: new Date(`${dateString}T00:00:00.000Z`),
        $lt: new Date(`${dateString}T23:59:59.999Z`)
      }
    })
    .sort({ temperature: 1 })
    .limit(1)
    .lean(); 
    
    console.log('Query result:', records);
      
    if (records.length === 0) {
      return res.status(404).json({ message: 'Данные не найдены' });
    }
    
    res.json({
      region: records[0].region,
      temperature: records[0].temperature
    });
  } catch (err) {
    console.error('Error in min-temp:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;