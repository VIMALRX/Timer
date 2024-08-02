// script.js
let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCount = 1;

const display = document.getElementById('display');
const lapsContainer = document.getElementById('laps');

function formatTime(ms) {
    let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    let minutes = Math.floor((ms / (1000 * 60)) % 60);
    let seconds = Math.floor((ms / 1000) % 60);
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    return hours + ":" + minutes + ":" + seconds;
}

function startTimer() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
        running = true;
    }
}

function stopTimer() {
    clearInterval(tInterval);
    running = false;
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    display.textContent = "00:00:00";
    lapsContainer.innerHTML = '';
    lapCount = 1;
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    display.textContent = formatTime(difference);
}

function recordLap() {
    if (running) {
        const lapTime = document.createElement('div');
        lapTime.className = 'lap-time';
        lapTime.textContent = `Lap ${lapCount}: ${formatTime(difference)}`;
        lapsContainer.appendChild(lapTime);
        lapCount++;
    }
}

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('lap').addEventListener('click', recordLap);
document.getElementById('stop').addEventListener('click', stopTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
