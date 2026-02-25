let bike = document.getElementById("bike");
let obstacle = document.getElementById("obstacle");
let scoreDisplay = document.getElementById("score");
let gameOverText = document.getElementById("gameOver");

let lanes = [30, 130, 230];
let currentLane = 1;

let gameRunning = false;
let obstacleTop = -60;
let score = 0;
let speed = 4;
let interval;

function startGame() {
    if (gameRunning) return;

    resetGame();
    gameRunning = true;
    interval = setInterval(gameLoop, 20);
}

function resetGame() {
    score = 0;
    speed = 4;
    obstacleTop = -60;
    currentLane = 1;

    scoreDisplay.innerText = score;
    bike.style.left = lanes[currentLane] + "px";
    obstacle.style.top = "-60px";
    obstacle.style.left = lanes[Math.floor(Math.random() * 3)] + "px";

    gameOverText.style.display = "none";
}

function restartGame() {
    gameRunning = false;
    clearInterval(interval);
    startGame();
}

document.addEventListener("keydown", function(e) {
    if (!gameRunning) return;

    if (e.key === "ArrowLeft" && currentLane > 0) {
        currentLane--;
    }

    if (e.key === "ArrowRight" && currentLane < 2) {
        currentLane++;
    }

    bike.style.left = lanes[currentLane] + "px";
});

function gameLoop() {
    obstacleTop += speed;
    obstacle.style.top = obstacleTop + "px";

    // Collision Detection
    let bikeRect = bike.getBoundingClientRect();
    let obstacleRect = obstacle.getBoundingClientRect();

    if (
        bikeRect.left < obstacleRect.right &&
        bikeRect.right > obstacleRect.left &&
        bikeRect.top < obstacleRect.bottom &&
        bikeRect.bottom > obstacleRect.top
    ) {
        endGame();
    }

    if (obstacleTop > 500) {
        obstacleTop = -60;
        obstacle.style.left = lanes[Math.floor(Math.random() * 3)] + "px";

        score++;
        scoreDisplay.innerText = score;

        if (score % 5 === 0) {
            speed += 1; // Increase difficulty
        }
    }
}

function endGame() {
    gameRunning = false;
    clearInterval(interval);
    gameOverText.style.display = "block";
}