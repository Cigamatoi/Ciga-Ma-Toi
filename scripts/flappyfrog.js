// flappyfrog.js 
const flappyCanvas = document.getElementById("flappy-frog-canvas");
const flappyCtx = flappyCanvas.getContext("2d");
let frogY = flappyCanvas.height / 2;
let gravity = 0.5;
let velocity = 0;
let gameOver = false;
let flappyScore = 0;
let pipes = [];
let frameCount = 0;
let gameStarted = false;

function initFlappyFrog() {
    frogY = flappyCanvas.height / 2;
    velocity = 0;
    gameOver = false;
    flappyScore = 0;
    pipes = [];
    document.getElementById("flappy-frog-score").textContent = `Score: ${flappyScore}`;
    document.removeEventListener("keydown", jump);
    document.removeEventListener("click", jump);
    drawFlappyGame();
}

function startFlappyGame() {
    gameStarted = true;
    document.getElementById("play-button").style.display = "none";
    document.addEventListener("keydown", jump);
    document.addEventListener("click", jump);
    const gameLoop = setInterval(() => {
        if (gameOver) {
            clearInterval(gameLoop);
            document.getElementById("flappy-frog-container").style.display = "none";
            document.getElementById("score").style.display = "block";
            document.getElementById("score").textContent = `Flappy Frog Score: ${flappyScore}`;
            saveScore("flappy-frog", flappyScore);
            updateTop10();
            return;
        }

        frameCount++;
        if (frameCount % 100 === 0) {
            const pipeGap = 150;
            const pipeHeight = Math.random() * (flappyCanvas.height - pipeGap - 100) + 50;
            pipes.push({
                x: flappyCanvas.width,
                topHeight: pipeHeight,
                bottomHeight: flappyCanvas.height - pipeHeight - pipeGap
            });
        }

        velocity += gravity;
        frogY += velocity;

        pipes = pipes.filter(pipe => pipe.x > -50);
        pipes.forEach(pipe => pipe.x -= 2);

        if (frogY > flappyCanvas.height || frogY < 0) {
            gameOver = true;
        }

        pipes.forEach(pipe => {
            if (
                (flappyCanvas.width / 2 > pipe.x && flappyCanvas.width / 2 < pipe.x + 50) &&
                (frogY < pipe.topHeight || frogY > flappyCanvas.height - pipe.bottomHeight)
            ) {
                gameOver = true;
            }
            if (flappyCanvas.width / 2 > pipe.x + 50 && flappyCanvas.width / 2 < pipe.x + 60) {
                flappyScore++;
                document.getElementById("flappy-frog-score").textContent = `Score: ${flappyScore}`;
            }
        });

        drawFlappyGame();
    }, 16);
}

function jump() {
    if (gameStarted && !gameOver) {
        velocity = -8;
    }
}

function drawFlappyGame() {
    flappyCtx.clearRect(0, 0, flappyCanvas.width, flappyCanvas.height);

    if (!gameStarted) {
        flappyCtx.fillStyle = "#FFFFFF";
        flappyCtx.font = "30px Orbitron";
        flappyCtx.fillText("Click Play to Start", flappyCanvas.width / 2 - 120, flappyCanvas.height / 2);
        return;
    }

    flappyCtx.fillStyle = "#90EE90";
    flappyCtx.beginPath();
    flappyCtx.arc(flappyCanvas.width / 2, frogY, 20, 0, Math.PI * 2);
    flappyCtx.fill();
    flappyCtx.fillStyle = "#000000";
    flappyCtx.fillText("🐸", flappyCanvas.width / 2 - 10, frogY + 5);

    flappyCtx.fillStyle = "#00D4FF";
    pipes.forEach(pipe => {
        flappyCtx.fillRect(pipe.x, 0, 50, pipe.topHeight);
        flappyCtx.fillRect(pipe.x, flappyCanvas.height - pipe.bottomHeight, 50, pipe.bottomHeight);
    });
}
