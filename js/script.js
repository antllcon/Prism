let requestAnimFrame = (function() {
    return window.requestAnimationFrame    ||
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame    ||
           window.oRequestAnimationFrame      ||
           window.msRequestAnimationFrame     ||
           function(callback) {
               window.setTimeout(callback, 1000 / 60);
           };
})();

let canvas = document.getElementById("canvas");

const canvasWidth = 400;
const canvasHeight = 400;

let PLAYER = {
    pos: [20, 20], // Точка появления игрока
    size: 10,
    color: '#00A86B',
    speed: 200,
    team: 1, // 1 - Зеленые, 2 - Красные - в будущем
    live: 1
};

let GAME = {
    width: canvasWidth,
    height: canvasHeight,
    background: '#333'
};

let POINT = {
    pos: [200, 200],
    width: 10,
    height: 10,
    line: 10,
    color: '#666',
    active: true,
    type: 0, // 0 - point, 1 - line, 2 - cross
    time: 5000,
    team: 2
};

canvas.width = GAME.width;
canvas.height = GAME.height;

// Инструменты рисования
let ctx = canvas.getContext("2d");
let gameTime = 0; // нужен для повышения сложности

function drawBackground() {
    ctx.fillStyle = GAME.background;
    ctx.fillRect(0, 0, GAME.width, GAME.height);
}

function drawPlayer() {
    ctx.fillStyle = PLAYER.color;
    ctx.fillRect(PLAYER.pos[0], PLAYER.pos[1], PLAYER.size, PLAYER.size);
}

function drawPoint() {
    ctx.fillStyle = POINT.color;
    if (POINT.type === 0) {
        ctx.fillRect(POINT.pos[0], POINT.pos[1], POINT.width, POINT.height);
    } else if (POINT.type === 1) {
        ctx.fillRect(POINT.pos[0], POINT.pos[1], POINT.width, POINT.height);
    } else if (POINT.type === 2) {
        ctx.beginPath();
        ctx.moveTo(POINT.pos[0] - 150, POINT.pos[1]);
        ctx.lineTo(POINT.pos[0] + 150, POINT.pos[1]);
        ctx.moveTo(POINT.pos[0], POINT.pos[1] - 150);
        ctx.lineTo(POINT.pos[0], POINT.pos[1] + 150);
        ctx.strokeStyle = POINT.color;
        ctx.lineWidth = POINT.line;
        ctx.stroke();
        ctx.closePath();
    }
}

function drawFrame() {
    ctx.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    drawPlayer();
    drawPoint();
}

let lastTime;
let pointActivatedTime = null;
let timeExist = 1000;
let pointActiveExist = false; 

// Инициализация
function init() {
    drawBackground();
    drawPlayer();
    lastTime = Date.now();
    main();
}

// Основной цикл
function main() {
    let now = Date.now();
    let dt = (now - lastTime) / 1000.0;

    update(dt);
    render();
    lastTime = now;
    requestAnimFrame(main);
}

function update(dt) {
    gameTime += dt;
    handleInput(dt);


    // Проверка времени существования POINT.active
    if (Date.now() - pointActivatedTime > timeExist) {
        POINT.active = false;
        POINT.type = 0;
        POINT.color = '#666';
        pointActivatedTime = null;
        pointActiveExist = false;

        POINT.width = 10;
        POINT.pos[0] = 200; // нужно вынести в константу
        POINT.team = 0

    } else {
        pointActiveExist = true;
    }

    updateEntitiesCollision();
    checkCollisions();
}

// Обработка нажатой клавиши
function handleInput(dt) {
    if(input.isDown('DOWN') || input.isDown('s')) {
        PLAYER.pos[1] += PLAYER.speed * dt;
    }

    if(input.isDown('UP') || input.isDown('w')) {
        PLAYER.pos[1] -= PLAYER.speed * dt;
    }

    if(input.isDown('LEFT') || input.isDown('a')) {
        PLAYER.pos[0] -= PLAYER.speed * dt;
    }

    if(input.isDown('RIGHT') || input.isDown('d')) {
        PLAYER.pos[0] += PLAYER.speed * dt;
    }
}

const lineSize = 300;

// Обновление сущностей
function updateEntitiesCollision() {

    if (PLAYER.pos[0] < POINT.pos[0] + POINT.width &&
        PLAYER.pos[0] + PLAYER.size > POINT.pos[0] &&
        PLAYER.pos[1] < POINT.pos[1] + POINT.height &&
        PLAYER.pos[1] + PLAYER.size > POINT.pos[1]) {
            
        POINT.active = true;
        // В зависимости от текущего type в POINT должно меняться поведение
        if (POINT.type === 0) {
            POINT.team = PLAYER.team;
            POINT.color = PLAYER.color;
            POINT.type = 1; // Сделать зависимость от номера POINT на карте
            if (!pointActiveExist) {
                POINT.width = lineSize;
                POINT.pos[0] = POINT.pos[0] - POINT.width / 2;
                pointActivatedTime = Date.now(); // Установка времени активации
            }
        } else if (POINT.team === PLAYER.team) {
            POINT.color = PLAYER.color;
        } else  if (POINT.team !== PLAYER.team) {
            PLAYER.live = 0;
            POINT.color = "red"; // Изменить цвет на красный при столкновении
        }
    } else {
        POINT.color = "#666";
    }

    if (PLAYER.live === 0) {
        PLAYER.pos = [20, 20];
        PLAYER.color = "black";
    }
}

function checkCollisions() {
    checkPlayerBounds();
}

function checkPlayerBounds() {
    // Проверка границ
    if(PLAYER.pos[0] < 0) {
        PLAYER.pos[0] = GAME.width;
    } else if(PLAYER.pos[0] > GAME.width) {
        PLAYER.pos[0] = 0;
    }

    if(PLAYER.pos[1] < 0) {
        PLAYER.pos[1] = GAME.height;
    } else if(PLAYER.pos[1] > GAME.height) {
        PLAYER.pos[1] = 0;
    }
}

function render() {
    ctx.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    drawPoint();
    drawPlayer();
}

init();
