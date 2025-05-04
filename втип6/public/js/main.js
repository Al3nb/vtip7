document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const artistSelect = document.getElementById('artistSelect');
  const loadInfoBtn = document.getElementById('loadInfo');
  const loadBioBtn = document.getElementById('loadBio');
  const loadMediaBtn = document.getElementById('loadMedia');
  const artistDetails = document.querySelector('.artist-details');
  const artistBio = document.querySelector('.artist-bio');
  const artistMedia = document.querySelector('.artist-media');

  // Отладка - проверяем, что скрипт загрузился
  console.log('Скрипт загрузился');

  // Load artists list on page load
  loadArtists();

  // Очистка полей при смене артиста
  artistSelect.addEventListener('change', () => {
    artistDetails.innerHTML = '';
    artistBio.innerHTML = '';
    artistMedia.innerHTML = '';
    console.log('Поля очищены при смене артиста');
  });

  // Event Listeners - добавляем отладку
  loadInfoBtn.addEventListener('click', () => {
    console.log('Нажата кнопка загрузки информации');
    loadArtistInfo();
  });
  
  loadBioBtn.addEventListener('click', () => {
    console.log('Нажата кнопка загрузки биографии');
    loadArtistBio();
  });
  
  loadMediaBtn.addEventListener('click', () => {
    console.log('Нажата кнопка загрузки медиа');
    loadArtistMedia();
  });

  // Functions
  async function loadArtists() {
    try {
      console.log('Загружаем список артистов');
      const response = await fetch('api/artists');
      if (!response.ok) {
        throw new Error('Не удалось загрузить список артистов');
      }
      
      const artists = await response.json();
      console.log('Получены артисты:', artists);
      
      // Populate select dropdown
      artists.forEach(artist => {
        const option = document.createElement('option');
        option.value = artist.name;
        option.textContent = artist.fullName;
        artistSelect.appendChild(option);
      });
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при загрузке списка артистов');
    }
  }

  async function loadArtistInfo() {
    const selectedArtist = artistSelect.value;
    
    if (!selectedArtist) {
      alert('Пожалуйста, выберите артиста');
      return;
    }
    
    try {
      const response = await fetch(`api/artist/${selectedArtist}`);
      if (!response.ok) {
        throw new Error('Не удалось загрузить информацию об артисте');
      }
      
      const artist = await response.json();
      
      // Display artist info
      artistDetails.innerHTML = `
        <h2>${artist.fullName}</h2>
        <p><strong>Жанр:</strong> ${artist.genre}</p>
        <p><strong>Годы активности:</strong> ${artist.yearsActive}</p>
        <p><strong>Популярные песни:</strong> ${artist.popularSongs.join(', ')}</p>
      `;
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при загрузке информации об артисте');
    }
  }

  async function loadArtistBio() {
    const selectedArtist = artistSelect.value;
    
    if (!selectedArtist) {
      alert('Пожалуйста, выберите артиста');
      return;
    }
    
    try {
      const response = await fetch(`api/artist-bio/${selectedArtist}`);
      if (!response.ok) {
        throw new Error('Не удалось загрузить биографию артиста');
      }
      
      const bioText = await response.text();
      
      // Display artist bio
      artistBio.innerHTML = `
        <h3>Биография</h3>
        <p>${bioText}</p>
      `;
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при загрузке биографии артиста');
    }
  }

  async function loadArtistMedia() {
    const selectedArtist = artistSelect.value;
    
    if (!selectedArtist) {
      alert('Пожалуйста, выберите артиста');
      return;
    }
    
    // Clear previous media
    artistMedia.innerHTML = '<h3>Фото и видео</h3>';
    
    // Add image - теперь используем GIF вместо JPG
    const img = document.createElement('img');
    img.src = `public/img/${selectedArtist}.gif`;
    img.alt = `Анимация артиста ${artistSelect.options[artistSelect.selectedIndex].text}`;
    img.addEventListener('error', () => {
      img.src = 'public/img/no-image.gif';
      img.alt = 'Изображение недоступно';
    });
    artistMedia.appendChild(img);
    
    // Add video
    const video = document.createElement('video');
    video.src = `public/videos/${selectedArtist}.mp4`;
    video.controls = true;
    // Устанавливаем громкость на 30%
    video.volume = 0.3;
    video.addEventListener('error', () => {
      const errorMsg = document.createElement('p');
      errorMsg.textContent = 'Видео недоступно';
      artistMedia.appendChild(errorMsg);
      video.remove();
    });
    artistMedia.appendChild(video);
  }
}); 