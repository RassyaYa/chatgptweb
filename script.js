const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('start-button');
const scoreDisplay = document.getElementById('score');

canvas.width = 800;
canvas.height = 600;

let score = 0;
let isPlaying = false;
let spaceship = { x: canvas.width / 2 - 25, y: canvas.height - 50, width: 50, height: 20 };
let bullets = [];
let targets = [];

function createTarget() {
    const width = 40;
    const height = 20;
    const x = Math.random() * (canvas.width - width);
    const y = Math.random() * (canvas.height / 2 - height);
    return { x, y, width, height };
}

function drawSpaceship() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(spaceship.x, spaceship.y, spaceship.width, spaceship.height);
}

function drawBullet(bullet) {
    ctx.fillStyle = 'red';
    ctx.fillRect(bullet.x, bullet.y, 5, 20);
}

function drawTarget(target) {
    ctx.fillStyle = 'green';
    ctx.fillRect(target.x, target.y, target.width, target.height);
}

function updateBullets() {
    bullets = bullets.filter(bullet => bullet.y > 0);
    bullets.forEach(bullet => {
        bullet.y -= 5;
    });
}

function updateTargets() {
    targets.forEach(target => {
        if (Math.random() < 0.01) {
            target.x += Math.random() * 2 - 1;
        }
    });
}

function checkCollisions() {
    bullets.forEach((bullet, bIndex) => {
        targets.forEach((target, tIndex) => {
            if (bullet.x < target.x + target.width &&
                bullet.x + 5 > target.x &&
                bullet.y < target.y + target.height &&
                bullet.y + 20 > target.y) {
                bullets.splice(bIndex, 1);
                targets.splice(tIndex, 1);
                score += 10;
            }
        });
    });

    if (targets.length === 0) {
        score += 50;
        for (let i = 0; i < 5; i++) {
            targets.push(createTarget());
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSpaceship();
    bullets.forEach(drawBullet);
    targets.forEach(drawTarget);
    scoreDisplay.innerText = `Score: ${score}`;
}

function gameLoop() {
    if (isPlaying) {
        updateBullets();
        updateTargets();
        checkCollisions();
        draw();
        requestAnimationFrame(gameLoop);
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && spaceship.x > 0) {
        spaceship.x -= 10;
    } else if (e.key === 'ArrowRight' && spaceship.x < canvas.width - spaceship.width) {
        spaceship.x += 10;
    } else if (e.key === ' ' && isPlaying) {
        bullets.push({ x: spaceship.x + spaceship.width / 2 - 2.5, y: spaceship.y });
    }
});

startButton.addEventListener('click', () => {
    if (!isPlaying) {
        isPlaying = true;
        score = 0;
        bullets = [];
        targets = [];
        for (let i = 0; i < 5; i++) {
            targets.push(createTarget());
        }
        gameLoop();
    }
});
