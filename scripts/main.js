// main.js 
const targetDate = new Date("2025-03-31T23:59:59").getTime();
const startDate = new Date().getTime();
const totalTime = targetDate - startDate;

const countdownElement = document.getElementById("countdown");
const messageElement = document.getElementById("message");
const imageElement = document.getElementById("image");
const progressBar = document.getElementById("progress-bar");
const frog = document.getElementById("frog");
const progressContainer = document.getElementById("progress-container");

function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    if (timeLeft <= 0) {
        clearInterval(interval);
        progressContainer.style.display = "none";
        messageElement.style.display = "block";
        imageElement.style.display = "block";
    } else {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        const progress = (1 - timeLeft / totalTime) * 100;
        progressBar.style.width = `${progress}%`;

        const frogPosition = (progress / 100) * (progressContainer.offsetWidth - frog.offsetWidth);
        frog.style.left = `${frogPosition}px`;
    }
}

updateCountdown();
const interval = setInterval(updateCountdown, 1000);
