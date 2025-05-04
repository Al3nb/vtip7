// Основной массив для хранения случайных чисел
let numbersArray = [];

// Элементы управления
const generateBtn = document.getElementById('generateBtn');
const sortAscBtn = document.getElementById('sortAscBtn');
const sortDescBtn = document.getElementById('sortDescBtn');
const numbersTable = document.getElementById('numbersTable');
const statusMessage = document.getElementById('statusMessage');
const decimalCheckboxes = document.querySelectorAll('input[type="checkbox"][id^="decimal"]');

// Количество знаков после запятой (по умолчанию 3)
let decimalPlaces = 3;

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем обработчики событий
    generateBtn.addEventListener('click', generateArray);
    sortAscBtn.addEventListener('click', () => sortArray('asc'));
    sortDescBtn.addEventListener('click', () => sortArray('desc'));
    
    // Обработчик изменения числа знаков после запятой
    decimalCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // Снимаем выделение со всех чекбоксов
            decimalCheckboxes.forEach(cb => cb.checked = false);
            // Устанавливаем выбранный
            this.checked = true;
            decimalPlaces = parseInt(this.value);
            
            // Обновляем отображение таблицы с новым форматом
            if (numbersArray.length > 0) {
                displayArray(numbersArray);
            }
        });
    });
    
    // Инициализируем генерацию массива при первой загрузке
    generateArray();
});

// Функция генерации массива случайных чисел
function generateArray() {
    numbersArray = [];
    
    // Генерируем 80 случайных чисел от 1 до 10
    for (let i = 0; i < 80; i++) {
        let randomNum = Math.random() * 9 + 1; // от 1 до 10
        numbersArray.push(randomNum);
    }
    
    // Отображаем массив в таблице
    displayArray(numbersArray);
    
    // Сохраняем исходный массив
    saveArrayToFile(numbersArray, 'original_array.json');
    
    statusMessage.textContent = 'Массив успешно сгенерирован и сохранен';
}

// Функция отображения массива в таблице
function displayArray(array) {
    const tbody = numbersTable.querySelector('tbody');
    tbody.innerHTML = '';
    
    // Создаем таблицу 8x10
    for (let row = 0; row < 8; row++) {
        const tr = document.createElement('tr');
        
        for (let col = 0; col < 10; col++) {
            const td = document.createElement('td');
            const index = row * 10 + col;
            
            if (index < array.length) {
                td.textContent = array[index].toFixed(decimalPlaces);
            }
            
            tr.appendChild(td);
        }
        
        tbody.appendChild(tr);
    }
}

// Функция сортировки массива
function sortArray(direction) {
    if (numbersArray.length === 0) {
        statusMessage.textContent = 'Сначала сгенерируйте массив';
        return;
    }
    
    // Копируем массив для сортировки
    let sortedArray = [...numbersArray];
    
    // Сортировка по возрастанию или убыванию
    if (direction === 'asc') {
        sortedArray.sort((a, b) => a - b);
    } else {
        sortedArray.sort((a, b) => b - a);
    }
    
    // Отображаем отсортированный массив
    displayArray(sortedArray);
    
    // Сохраняем отсортированный массив
    const filename = direction === 'asc' ? 'sorted_asc_array.json' : 'sorted_desc_array.json';
    saveArrayToFile(sortedArray, filename);
    
    statusMessage.textContent = `Массив отсортирован по ${direction === 'asc' ? 'возрастанию' : 'убыванию'} и сохранен`;
}

// Функция сохранения массива в файл
function saveArrayToFile(array, filename) {
    // В веб-приложении сохранение происходит через скачивание файла
    const dataStr = JSON.stringify(array);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    // Создаем ссылку для скачивания
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(dataBlob);
    downloadLink.download = filename;
    
    // Эмулируем клик для скачивания
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
} 