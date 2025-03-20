
const snakeCanvas = document.getElementById("snake-canvas");
const snakeCtx = snakeCanvas.getContext("2d");
const snakeGridSize = 20;
const snakeTileCount = snakeCanvas.width / snakeGridSize;
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let dx = 0;
let dy = 0;
let snakeScore = 0;
let snakeGameActive = false;
let snakeGameStarted = false;
let snakeInterval = null;

function initSnakeGame() {
    snake = [{ x: 10, y: 10 }];
    food = { x: 15, y: 15 };
    dx = 0;
    dy = 0;
    snakeScore = 0;
    snakeGameActive = true;
    snakeGameStarted = false;
    document.getElementById("snake-score").textContent = `Score: ${snakeScore}`;
    document.getElementById("snake-container").style.display = "block";
    snakeCanvas.style.display = "block";
    document.addEventListener("keydown", changeDirection);
    drawSnakeGame();
}

function startSnakeGame() {
    if (snakeInterval) clearInterval(snakeInterval);
    snakeInterval = setInterval(() => {
        if (!snakeGameActive) return;
        moveSnake();
        drawSnakeGame();
    }, 100);
}

function changeDirection(event) {
    const key = event.key;

    if (!snakeGameStarted && (key === "w" || key === "W" || key === "a" || key === "A" || key === "s" || key === "S" || key === "d" || key === "D")) {
        snakeGameStarted = true;
        startSnakeGame();
    }

    if (snakeGameActive) {
        if (key === "ArrowUp" || key === "w" || key === "W") {
            if (dy !== 1) { dx = 0; dy = -1; }
        } else if (key === "ArrowDown" || key === "s" || key === "S") {
            if (dy !== -1) { dx = 0; dy = 1; }
        } else if (key === "ArrowLeft" || key === "a" || key === "A") {
            if (dx !== 1) { dx = -1; dy = 0; }
        } else if (key === "ArrowRight" || key === "d" || key === "D") {
            if (dx !== -1) { dx = 1; dy = 0; }
        }
    }
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    if (head.x < 0 || head.x >= snakeTileCount || head.y < 0 || head.y >= snakeTileCount) {
        endSnakeGame();
        return;
    }

    for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            endSnakeGame();
            return;
        }
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        snakeScore++;
        document.getElementById("snake-score").textContent = `Score: ${snakeScore}`;
        spawnFood();
    } else {
        snake.pop();
    }
}

function spawnFood() {
    food.x = Math.floor(Math.random() * snakeTileCount);
    food.y = Math.floor(Math.random() * snakeTileCount);

    for (let i = 0; i < snake.length; i++) {
        if (food.x === snake[i].x && food.y === snake[i].y) {
            spawnFood();
            break;
        }
    }
}

function drawSnakeGame() {
    snakeCtx.clearRect(0, 0, snakeCanvas.width, snakeCanvas.height);

    snakeCtx.fillStyle = "#00D4FF";
    snake.forEach(segment => {
        snakeCtx.fillRect(segment.x * snakeGridSize, segment.y * snakeGridSize, snakeGridSize - 2, snakeGridSize - 2);
    });

    snakeCtx.fillStyle = "#FF6B6B";
    snakeCtx.beginPath();
    snakeCtx.arc(food.x * snakeGridSize + snakeGridSize / 2, food.y * snakeGridSize + snakeGridSize / 2, snakeGridSize / 2 - 2, 0, Math.PI * 2);
    snakeCtx.fill();

    if (!snakeGameStarted) {
        snakeCtx.fillStyle = "#FFFFFF";
        snakeCtx.font = "20px Orbitron";
        snakeCtx.fillText("Press W, A, S, or D to start", snakeCanvas.width / 2 - 120, snakeCanvas.height / 2);
    }
}

function endSnakeGame() {
    snakeGameActive = false;
    clearInterval(snakeInterval);
    document.getElementById("snake-container").style.display = "none";
    document.getElementById("score").style.display = "block";
    document.getElementById("score").textContent = `Snake Score: ${snakeScore}`;
}
