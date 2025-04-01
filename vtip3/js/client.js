document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('sort-btn').addEventListener('click', () => {
        const originalArray = JSON.parse(sessionStorage.getItem('originalArray'));
        
        fetch('/api/sort', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Важно!
            },
            body: JSON.stringify({ array: originalArray }) // Данные в формате JSON
        })
        .then(response => response.json())
        .then(data => {
            sessionStorage.setItem('sortedArray', JSON.stringify(data.sorted));
            sessionStorage.setItem('maxValue', data.max);
            window.location.href = '/result';
        })
        .catch(error => console.error('Ошибка:', error));
    });
    const originalTable = document.getElementById('original-table');


    fetch('/api/generate')
        .then(response => response.json())
        .then(data => {
            renderTable(data.original, originalTable);
            sessionStorage.setItem('originalArray', JSON.stringify(data.original));
        });

    sortBtn.addEventListener('click', () => {
        const originalArray = JSON.parse(sessionStorage.getItem('originalArray'));
        
        fetch('/api/sort', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ array: originalArray })
        })
        .then(response => response.json())
        .then(data => {
            sessionStorage.setItem('sortedArray', JSON.stringify(data.sorted));
            sessionStorage.setItem('maxValue', data.max);
            window.location.href = '/result';
        });
    });

    function renderTable(array, tableElement) {
        tableElement.innerHTML = '';
        
        for (let i = 0; i < 8; i++) {
            const row = tableElement.insertRow();
            for (let j = 0; j < 10; j++) {
                const cell = row.insertCell();
                cell.textContent = array[i * 10 + j];
            }
        }
    }
});