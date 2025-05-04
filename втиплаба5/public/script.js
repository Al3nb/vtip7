// Загрузка данных при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  loadAllTemperatures(1);
  
  // Обработчик формы добавления
  document.getElementById('addForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    await addTemperature();
  });
});

// Добавление новой записи
async function addTemperature() {
  const region = document.getElementById('region').value;
  const temperature = parseFloat(document.getElementById('temperature').value);
  const precipitation = parseFloat(document.getElementById('precipitation').value);
  const date = document.getElementById('addDate').value;
  
  if (!region || !temperature || !precipitation || !date) {
    alert('Заполните все поля!');
    return;
  }
  
  try {
    const response = await fetch('/api/temperature', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        region, 
        temperature, 
        precipitation, 
        date 
      })
    });
    
    if (response.ok) {
      document.getElementById('addForm').reset();
      loadAllTemperatures();
      alert('Запись добавлена успешно!');
    } else {
      const error = await response.json();
      alert(`Ошибка: ${error.message}`);
    }
  } catch (err) {
    console.error('Ошибка при добавлении:', err);
    alert('Произошла ошибка при добавлении записи');
  }
}

// Загрузка всех записей с пагинацией
async function loadAllTemperatures(page = 1) {
  try {
    const response = await fetch(`/api/temperature?page=${page}&limit=50`);
    const data = await response.json();
    
    const tableBody = document.getElementById('temperatureData');
    tableBody.innerHTML = '';
    
    data.temperatures.forEach(item => {
      const date = new Date(item.date).toLocaleDateString();
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.region}</td>
        <td>${item.temperature}°C</td>
        <td>${item.precipitation}</td>
        <td>${date}</td>
      `;
      tableBody.appendChild(row);
    });

    // Добавление пагинации
    renderPagination(data.currentPage, data.totalPages);
  } catch (err) {
    console.error('Ошибка при загрузке данных:', err);
    alert('Ошибка при загрузке данных. Пожалуйста, попробуйте еще раз.');
  }
}

// Создание элементов пагинации
function renderPagination(currentPage, totalPages) {
  const paginationContainer = document.getElementById('pagination');
  if (!paginationContainer) {
    const container = document.createElement('div');
    container.id = 'pagination';
    container.className = 'pagination';
    document.querySelector('.table-container').appendChild(container);
  }
  
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';
  
  if (totalPages <= 1) return;
  
  // Кнопка "Предыдущая"
  if (currentPage > 1) {
    const prevBtn = document.createElement('button');
    prevBtn.innerText = 'Предыдущая';
    prevBtn.addEventListener('click', () => loadAllTemperatures(currentPage - 1));
    pagination.appendChild(prevBtn);
  }
  
  // Номера страниц
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);
  
  for (let i = startPage; i <= endPage; i++) {
    const pageBtn = document.createElement('button');
    pageBtn.innerText = i;
    if (i === currentPage) {
      pageBtn.className = 'active';
    }
    pageBtn.addEventListener('click', () => loadAllTemperatures(i));
    pagination.appendChild(pageBtn);
  }
  
  // Кнопка "Следующая"
  if (currentPage < totalPages) {
    const nextBtn = document.createElement('button');
    nextBtn.innerText = 'Следующая';
    nextBtn.addEventListener('click', () => loadAllTemperatures(currentPage + 1));
    pagination.appendChild(nextBtn);
  }
}

// Поиск минимальной температуры по дате
async function getMinTemperature() {
  const date = document.getElementById('dateInput').value;
  if (!date) {
    alert('Введите дату!');
    return;
  }

  try {
    const response = await fetch('/api/temperature/min-temp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date })
    });

    const data = await response.json();
    if (response.status === 404) {
      document.getElementById('result').innerHTML = `<p>Данные не найдены</p>`;
    } else if (data.message) {
      document.getElementById('result').innerHTML = `<p>Ошибка: ${data.message}</p>`;
    } else {
      document.getElementById('result').innerHTML = `
        <p>Регион: ${data.region}</p>
        <p>Минимальная температура: ${data.temperature}°C</p>
      `;
    }
  } catch (err) {
    console.error('Ошибка:', err);
    document.getElementById('result').innerHTML = `<p>Произошла ошибка при поиске</p>`;
  }
}