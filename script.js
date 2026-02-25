let bike = document.getElementById("bike");
let obstacle = document.getElementById("obstacle");
let game = document.getElementById("game");

let bikeLeft = 130;
let gameRunning = false;

function startGame() {
    if (gameRunning) return;
    gameRunning = true;
    moveObstacle();
}

document.addEventListener("keydown", function(e) {
    if (!gameRunning) return;

    if (e.key === "ArrowLeft" && bikeLeft > 0) {
        bikeLeft -= 20;
    }

    if (e.key === "ArrowRight" && bikeLeft < 260) {
        bikeLeft += 20;
    }

    bike.style.left = bikeLeft + "px";
});

function moveObstacle() {
    let obstacleTop = -60;
    obstacle.style.left = Math.floor(Math.random() * 260) + "px";

    let interval = setInterval(() => {
        if (!gameRunning) {
            clearInterval(interval);
            return;
        }

        obstacleTop += 5;
        obstacle.style.top = obstacleTop + "px";

        // Collision detection
        if (
            obstacleTop > 400 &&
            parseInt(obstacle.style.left) === bikeLeft
        ) {
            alert("Game Over!");
            gameRunning = false;
            obstacle.style.top = "-60px";
            return;
        }

        if (obstacleTop > 500) {
            obstacleTop = -60;
            obstacle.style.left = Math.floor(Math.random() * 260) + "px";
        }

    }, 20);
}