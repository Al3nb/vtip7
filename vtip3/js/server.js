const express = require('express');
const path = require('path');
const app = express();

app.use('/css', express.static(path.join(__dirname, '../css')));
app.use('/js', express.static(path.join(__dirname, '../js')));
app.use('/html', express.static(path.join(__dirname, '../html')));

app.use(express.json()); // Добавьте эту строку!

app.get('/api/generate', (req, res) => {
    const array = Array.from({length: 80}, () => Math.floor(Math.random() * 10) + 1);
    res.json({ original: array });
});


app.post('/api/sort', (req, res) => {
    const sorted = [...req.body.array].sort((a, b) => a - b);
    const max = Math.max(...req.body.array);
    res.json({ sorted, max });
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../html/index.html'));
});

app.get('/result', (req, res) => {
    res.sendFile(path.join(__dirname, '../html/result.html'));
});


app.listen(3000, () => {
    console.log('Сервер запущен на http://localhost:3000');
});