const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
  let filePath = '.' + req.url;
  
  if (filePath === './') {
    filePath = './index.html';
  }
  
  const extname = path.extname(filePath);
  let contentType = 'text/html';
  
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
    case '.gif':
      contentType = 'image/gif';
      break;
    case '.mp4':
      contentType = 'video/mp4';
      break;
    case '.txt':
      contentType = 'text/plain';
      break;
  }
  
  // Special handling for .html files that are scripts
  if (req.url === '/script.html') {
    fs.readFile('./script.html', (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end('Server Error');
        return;
      }
      
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content, 'utf-8');
    });
    return;
  }
  
  // Handle API endpoints
  if (req.url.startsWith('/api/')) {
    if (req.url.startsWith('/api/artist/')) {
      const artistName = req.url.split('/api/artist/')[1];
      fs.readFile('./public/data/artists.json', (err, data) => {
        if (err) {
          res.writeHead(500);
          res.end('Server Error');
          return;
        }
        
        const artists = JSON.parse(data);
        const artist = artists.find(a => a.name === artistName);
        
        if (artist) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(artist));
        } else {
          res.writeHead(404);
          res.end('Artist not found');
        }
      });
      return;
    } else if (req.url.startsWith('/api/artist-bio/')) {
      const artistName = req.url.split('/api/artist-bio/')[1];
      fs.readFile(`./public/data/${artistName}.txt`, (err, data) => {
        if (err) {
          res.writeHead(500);
          res.end('Server Error');
          return;
        }
        
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(data);
      });
      return;
    } else if (req.url === '/api/artists') {
      fs.readFile('./public/data/artists.json', (err, data) => {
        if (err) {
          res.writeHead(500);
          res.end('Server Error');
          return;
        }
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
      });
      return;
    }
  }
  
  // Read file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Page not found
        fs.readFile('./404.html', (err, content) => {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end(content, 'utf-8');
        });
      } else {
        // Server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
}); 