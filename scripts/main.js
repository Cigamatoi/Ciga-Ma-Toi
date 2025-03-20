// main.js 
console.log("Script loaded");
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
    console.log("submitNickname called");
    const input = document.getElementById("nickname-input");
    const errorElement = document.getElementById("nickname-error");

    if (!input) {
        console.error("Nickname input not found");
        return;
    }

    const inputValue = input.value.trim();
    console.log("Nickname entered:", inputValue);

    if (inputValue === "") {
        errorElement.textContent = "Please enter a nickname.";
        errorElement.style.display = "block";
        console.log("Error: Empty nickname");
        return;
    }

    if (badWords.some(word => inputValue.toLowerCase().includes(word))) {
        errorElement.textContent = "Please choose a different nickname (inappropriate word detected).";
        errorElement.style.display = "block";
        console.log("Error: Inappropriate word detected");
        return;
    }

    nickname = inputValue;
    localStorage.setItem("nickname", nickname);
    console.log("Nickname saved:", nickname);

    errorElement.style.display = "none";
    document.getElementById("nickname-section").style.display = "none";
    document.getElementById("game-buttons").style.display = "flex";
    document.getElementById("top-10-container").style.display = "block";
    console.log("Switched to game selection");
}

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded");
    const nicknameInput = document.getElementById("nickname-input");
    if (nicknameInput) {
        nicknameInput.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                console.log("Enter pressed");
                submitNickname();
            }
        });
    } else {
        console.error("Nickname input not found on DOM load");
    }

    const savedNickname = localStorage.getItem("nickname");
    if (savedNickname) {
        nickname = savedNickname;
        document.getElementById("nickname-section").style.display = "none";
        document.getElementById("game-buttons").style.display = "flex";
        document.getElementById("top-10-container").style.display = "block";
        console.log("Loaded saved nickname:", nickname);
    }
});

function saveScore(gameType, gameScore) {
    const rankings = JSON.parse(localStorage.getItem("rankings")) || [];
    rankings.push({ nickname, gameType, score: gameScore });
    rankings.sort((a, b) => {
        if (a.gameType === "quiz" && b.gameType === "quiz") {
            return b.score - a.score;
        } else if (a.gameType === "memory" && b.gameType === "memory") {
            return a.score - b.score;
        } else if (a.gameType === "whack-a-mole" && b.gameType === "whack-a-mole") {
            return b.score - a.score;
        } else if (a.gameType === "snake" && b.gameType === "snake") {
            return b.score - a.score;
        } else if (a.gameType === "flappy-frog" && b.gameType === "flappy-frog") {
            return b.score - a.score;
        }
        return 0;
    });
    localStorage.setItem("rankings", JSON.stringify(rankings));
}

function updateTop10() {
    const top10List = document.getElementById("top-10-list");
    top10List.innerHTML = "";
    const rankings = JSON.parse(localStorage.getItem("rankings")) || [];
    const top10 = rankings.slice(0, 10);
    top10.forEach(entry => {
        const li = document.createElement("li");
        if (entry.gameType === "quiz") {
            li.textContent = `${entry.nickname}: Quiz - ${entry.score}/${questions.length}`;
        } else if (entry.gameType === "memory") {
            li.textContent = `${entry.nickname}: Memory - ${entry.score} moves`;
        } else if (entry.gameType === "whack-a-mole") {
            li.textContent = `${entry.nickname}: Whack-a-Mole - ${entry.score} points`;
        } else if (entry.gameType === "snake") {
            li.textContent = `${entry.nickname}: Snake - ${entry.score} points`;
        } else if (entry.gameType === "flappy-frog") {
            li.textContent = `${entry.nickname}: Flappy Frog - ${entry.score} points`;
        }
        top10List.appendChild(li);
    });
}

function showFullRanking() {
    const fullRankingList = document.getElementById("full-ranking-list");
    fullRankingList.innerHTML = "";
    const rankings = JSON.parse(localStorage.getItem("rankings")) || [];
    rankings.forEach(entry => {
        const li = document.createElement("li");
        if (entry.gameType === "quiz") {
            li.textContent = `${entry.nickname}: Quiz - ${entry.score}/${questions.length}`;
        } else if (entry.gameType === "memory") {
            li.textContent = `${entry.nickname}: Memory - ${entry.score} moves`;
        } else if (entry.gameType === "whack-a-mole") {
            li.textContent = `${entry.nickname}: Whack-a-Mole - ${entry.score} points`;
        } else if (entry.gameType === "snake") {
            li.textContent = `${entry.nickname}: Snake - ${entry.score} points`;
        } else if (entry.gameType === "flappy-frog") {
            li.textContent = `${entry.nickname}: Flappy Frog - ${entry.score} points`;
        }
        fullRankingList.appendChild(li);
    });
}

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
        if (snakeGameActive) {
            snakeGameActive = false;
            clearInterval(snakeInterval);
        }
        if (whackGameActive) {
            whackGameActive = false;
            clearInterval(whackInterval);
            document.getElementById("custom-cursor").style.display = "none";
        }
        document.getElementById("game-buttons").style.display = "flex";
        document.getElementById("top-10-container").style.display = "block";
    } else if (section === "quiz") {
        document.getElementById("quiz-container").style.display = "block";
        initQuiz();
    } else if (section === "memory") {
        document.getElementById("memory-container").style.display = "block";
        initMemoryGame();
    } else if (section === "whack-a-mole") {
        document.getElementById("whack-a-mole-container").style.display = "block";
        document.getElementById("whack-a-mole-game").style.display = "grid";
        document.getElementById("whack-a-mole-score").style.display = "block";
        document.getElementById("whack-a-mole-timer").style.display = "block";
        initWhackAMole();
    } else if (section === "snake") {
        document.getElementById("snake-container").style.display = "block";
        initSnakeGame();
    } else if (section === "flappy-frog") {
        document.getElementById("flappy-frog-container").style.display = "block";
        initFlappyFrog();
    } else if (section === "full-ranking") {
        document.getElementById("full-ranking-container").style.display = "block";
        showFullRanking();
    }
}

updateTop10();
