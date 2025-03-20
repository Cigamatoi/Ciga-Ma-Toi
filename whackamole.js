
let whackScore = 0;
let whackTimer = 30;
let whackGameActive = false;
let whackInterval = null;
const targetImage = "https://github.com/Cigamatoi/Rebased/blob/main/CFB.png?raw=true";

function initWhackAMole() {
    const whackGame = document.getElementById("whack-a-mole-game");
    whackGame.innerHTML = "";
    whackScore = 0;
    whackTimer = 30;
    document.getElementById("whack-a-mole-score").textContent = `Score: ${whackScore}`;
    document.getElementById("whack-a-mole-timer").textContent = `Time: ${whackTimer}s`;

    for (let i = 0; i < 16; i++) {
        const hole = document.createElement("div");
        hole.classList.add("mole-hole");
        hole.dataset.index = i;
        hole.innerHTML = `<img src="${targetImage}" class="target" alt="Head">`;
        hole.addEventListener("click", (e) => whackMole(e, hole));
        whackGame.appendChild(hole);
    }
    whackGameActive = true;
    startWhackGame();
}

function startWhackGame() {
    whackInterval = setInterval(() => {
        if (whackTimer <= 0) {
            clearInterval(whackInterval);
            whackGameActive = false;
            document.getElementById("whack-a-mole-container").style.display = "none";
            document.getElementById("score").style.display = "block";
            document.getElementById("score").textContent = `Whack-a-Mole Score: ${whackScore}`;
            return;
        }
        whackTimer--;
        document.getElementById("whack-a-mole-timer").textContent = `Time: ${whackTimer}s`;

        const holes = document.getElementsByClassName("mole-hole");
        for (let hole of holes) {
            hole.classList.remove("active");
        }

        const randomHole = holes[Math.floor(Math.random() * holes.length)];
        randomHole.classList.add("active");
        setTimeout(() => {
            if (randomHole.classList.contains("active") && whackGameActive) {
                randomHole.classList.remove("active");
            }
        }, 1000);
    }, 1000);
}

function whackMole(event, hole) {
    if (hole.classList.contains("active") && whackGameActive) {
        whackScore++;
        document.getElementById("whack-a-mole-score").textContent = `Score: ${whackScore}`;
        hole.classList.remove("active");

        const hammer = document.getElementById("hammer");
        hammer.style.left = `${event.clientX}px`;
        hammer.style.top = `${event.clientY}px`;
        hammer.style.display = "block";
        hammer.classList.add("hammer-hit");
        setTimeout(() => {
            hammer.style.display = "none";
            hammer.classList.remove("hammer-hit");
        }, 300);
    }
    event.stopPropagation();
}
