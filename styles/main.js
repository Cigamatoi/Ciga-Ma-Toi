
// Countdown, Nickname & Progress
const targetDate = new Date("2025-03-31T23:59:59").getTime();
const startDate = new Date().getTime();
const totalTime = targetDate - startDate;

const countdownElement = document.getElementById("countdown");
const messageElement = document.getElementById("message");
const imageElement = document.getElementById("image");
const progressBar = document.getElementById("progress-bar");
const frog = document.getElementById("frog");
const progressContainer = document.getElementById("progress-container");
let nickname = '';

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

const badWords = ["badword", "idiot", "dumm", "stupid", "ass", "fuck", "shit", "NWIota"];

function submitNickname() {
    const input = document.getElementById("nickname-input");
    const errorElement = document.getElementById("nickname-error");

    const inputValue = input.value.trim();

    if (inputValue === "") {
        errorElement.textContent = "Please enter a nickname.";
        errorElement.style.display = "block";
        return;
    }

    if (badWords.some(word => inputValue.toLowerCase().includes(word))) {
        errorElement.textContent = "Please choose a different nickname (inappropriate word detected).";
        errorElement.style.display = "block";
        return;
    }

    nickname = inputValue;
    localStorage.setItem("nickname", nickname);

    errorElement.style.display = "none";
    document.getElementById("nickname-section").style.display = "none";
    document.getElementById("game-buttons").style.display = "flex";
    document.getElementById("top-10-container").style.display = "block";
}

document.getElementById("submit-nickname").addEventListener("click", submitNickname);

document.addEventListener("DOMContentLoaded", function() {
    const nicknameInput = document.getElementById("nickname-input");
    if (nicknameInput) {
        nicknameInput.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                submitNickname();
            }
        });
    }

    const savedNickname = localStorage.getItem("nickname");
    if (savedNickname) {
        nickname = savedNickname;
        document.getElementById("nickname-section").style.display = "none";
        document.getElementById("game-buttons").style.display = "flex";
        document.getElementById("top-10-container").style.display = "block";
    }
});

function showSection(section) {
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("memory-container").style.display = "none";
    document.getElementById("whack-a-mole-container").style.display = "none";
    document.getElementById("snake-container").style.display = "none";
    document.getElementById("flappy-frog-container").style.display = "none";
    document.getElementById("full-ranking-container").style.display = "none";
    document.getElementById("score").style.display = "none";
    document.getElementById("game-buttons").style.display = "none";
    document.getElementById("top-10-container").style.display = "none";

    if (section === "main") {
        document.getElementById("game-buttons").style.display = "flex";
        document.getElementById("top-10-container").style.display = "block";
    }
}
