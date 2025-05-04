const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'server')));

const imageCollection = new Map();
for (let i = 1; i <= 10; i++) {
  imageCollection.set(i, `/public/images/${i}.png`);
}

app.get('/api/images', (req, res) => {
  const imagesArray = Array.from(imageCollection).map(([id, path]) => ({
    id,
    path
  }));
  res.json(imagesArray);
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 