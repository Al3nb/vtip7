let numbersArray = [];

const generateBtn = document.getElementById('generateBtn');
const sortAscBtn = document.getElementById('sortAscBtn');
const sortDescBtn = document.getElementById('sortDescBtn');
const numbersTable = document.getElementById('numbersTable');
const statusMessage = document.getElementById('statusMessage');
const decimalCheckboxes = document.querySelectorAll('input[type="checkbox"][id^="decimal"]');

let decimalPlaces = 3;

document.addEventListener('DOMContentLoaded', function() {
    generateBtn.addEventListener('click', generateArray);
    sortAscBtn.addEventListener('click', () => sortArray('asc'));
    sortDescBtn.addEventListener('click', () => sortArray('desc'));
    
    decimalCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            decimalCheckboxes.forEach(cb => cb.checked = false);
            this.checked = true;
            decimalPlaces = parseInt(this.value);
            
            updateDecimalPlaces(decimalPlaces);
            
            if (numbersArray.length > 0) {
                displayArray(numbersArray);
            }
        });
    });
    
    generateArray();
});

function generateArray() {
    statusMessage.textContent = 'Генерация массива...';
    
    fetch('/api/generate')
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка при запросе к серверу');
            }
            return response.json();
        })
        .then(data => {
            numbersArray = data;
            displayArray(numbersArray);
            statusMessage.textContent = 'Массив успешно сгенерирован и сохранен на сервере';
        })
        .catch(error => {
            statusMessage.textContent = 'Ошибка: ' + error.message;
            console.error('Ошибка:', error);
        });
}

function displayArray(array) {
    const tbody = numbersTable.querySelector('tbody');
    tbody.innerHTML = '';
    
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

function sortArray(direction) {
    statusMessage.textContent = `Сортировка массива по ${direction === 'asc' ? 'возрастанию' : 'убыванию'}...`;
    
    fetch(`/api/sort?direction=${direction}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка при запросе к серверу');
            }
            return response.json();
        })
        .then(data => {
            displayArray(data);
            statusMessage.textContent = `Массив отсортирован по ${direction === 'asc' ? 'возрастанию' : 'убыванию'} и сохранен на сервере`;
        })
        .catch(error => {
            statusMessage.textContent = 'Ошибка: ' + error.message;
            console.error('Ошибка:', error);
        });
}

function updateDecimalPlaces(places) {
    fetch(`/api/decimals/${places}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка при обновлении знаков после запятой');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Ошибка при обновлении знаков после запятой:', error);
        });
} 