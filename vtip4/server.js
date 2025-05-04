const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

app.use(express.static('public'));

app.get('/api/generate', (req, res) => {
    const numbersArray = [];
    
    for (let i = 0; i < 80; i++) {
        let randomNum = Math.random() * 9 + 1;
        numbersArray.push(randomNum);
    }
    
    fs.writeFileSync(
        path.join(dataDir, 'original_array.json'),
        JSON.stringify(numbersArray)
    );
    
    res.json(numbersArray);
});

app.get('/api/sort', (req, res) => {
    const direction = req.query.direction;
    
    try {
        const data = fs.readFileSync(path.join(dataDir, 'original_array.json'));
        let numbersArray = JSON.parse(data);
        
        if (direction === 'asc') {
            numbersArray.sort((a, b) => a - b);
        } else {
            numbersArray.sort((a, b) => b - a);
        }
        
        const filename = direction === 'asc' ? 'sorted_asc_array.json' : 'sorted_desc_array.json';
        fs.writeFileSync(
            path.join(dataDir, filename),
            JSON.stringify(numbersArray)
        );
        
        res.json(numbersArray);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при сортировке массива. Сначала сгенерируйте массив.' });
    }
});

let decimalPlaces = 3;

app.get('/api/decimals/:places', (req, res) => {
    const places = parseInt(req.params.places);
    if (places >= 1 && places <= 4) {
        decimalPlaces = places;
        res.json({ decimalPlaces });
    } else {
        res.status(400).json({ error: 'Количество знаков должно быть от 1 до 4' });
    }
});

app.get('/api/decimals', (req, res) => {
    res.json({ decimalPlaces });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
}); 