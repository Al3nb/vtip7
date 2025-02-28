const timeInput = document.getElementById('timeInput');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const timerDisplay = document.getElementById('timer');
const messageDisplay = document.getElementById('message');

let timeLeft;
let timerInterval;
let isPaused = false;

// Массив с путями к изображениям
const images = [
    '../resources/1.png',
    '../resources/2.png',
    '../resources/3.png',
    '../resources/4.png',
    '../resources/5.png'
];

function startTimer() {
    if (isPaused) {
        isPaused = false;
        runTimer();
        return;
    }

    timeLeft = parseInt(timeInput.value);
    if (isNaN(timeLeft)) {
        alert('Пожалуйста, введите корректное время.');
        return;
    }

    startButton.disabled = true;
    pauseButton.disabled = false;
    runTimer();
}

function runTimer() {
    timerInterval = setInterval(() => {
        if (!isPaused) {
            timeLeft--;
            updateTimerDisplay();

            // Показываем изображение в зависимости от оставшегося времени
            if (timeLeft <= images.length && timeLeft > 0) {
                showImage(timeLeft - 1); // Индекс массива начинается с 0
            }

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                messageDisplay.textContent = 'Запуск ракеты!';
                startButton.disabled = false;
                pauseButton.disabled = true;
            }
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function showImage(index) {
    if (index >= 0 && index < images.length) {
        const img = document.createElement('img');
        img.src = images[index];
        img.style.width = '100px';
        messageDisplay.innerHTML = '';
        messageDisplay.appendChild(img);
    }
}

function pauseTimer() {
    isPaused = true;
    clearInterval(timerInterval);
    startButton.disabled = false;
    pauseButton.disabled = true;
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);