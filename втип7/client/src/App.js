import React from 'react';
import ImageSlideshow from './components/ImageSlideshow';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>React Image Slideshow</h1>
      </header>
      <main className="app-main">
        <ImageSlideshow />
      </main>
      <footer className="app-footer">
        <p></p>
      </footer>
    </div>
  );
}

export default App; 