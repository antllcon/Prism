let canvas = document.getElementById("canvas");

const canvasWidth = 400;
const canvasHeight = 400;
const red = "red";
const green = "#00A86B";
const gray = "#666";
const black = "#111";
const lineSize = 300;
const startPos = [20, 20];

let GAME = {
    width: canvasWidth,
    height: canvasHeight,
    background: '#333'
};

let PLAYER = {
    pos: [20, 20],
    size: 10,
    color: black,
    speed: 200,
    team: 1, 
    live: 1
};

let POINT = {
    pos: [200, 200],
    width: 10,
    height: 10,
    type: 0,
    active: false,
    team: 0,
    color: gray
};

canvas.width = GAME.width;
canvas.height = GAME.height;

// Инструменты рисования
let ctx = canvas.getContext("2d");

function drawBackground() {
    ctx.fillStyle = GAME.background;
    ctx.fillRect(0, 0, GAME.width, GAME.height);
}

function drawPlayer() {
    if (PLAYER.live === 1) {
        if (PLAYER.team === 1) {
            PLAYER.color = green;
        }
        if (PLAYER.team === 2) {
            PLAYER.color = red;
        }    
    } else {
        PLAYER.color = black
    }
    
    ctx.fillStyle = PLAYER.color;
    ctx.fillRect(PLAYER.pos[0], PLAYER.pos[1], PLAYER.size, PLAYER.size);
}

function drawPoint() {
    if (POINT.active) {
        if (POINT.type === 1) {
            ctx.fillStyle = POINT.color;
            ctx.fillRect(POINT.pos[0], POINT.pos[1], POINT.width, POINT.height);
        }
        if (POINT.type === 2) {

        }
    } else {
        ctx.fillStyle = POINT.color;
        ctx.fillRect(POINT.pos[0], POINT.pos[1], POINT.width, POINT.height);
    }
}

function drawFrame() {
    ctx.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    drawPoint();
    drawPlayer();
}

let lastTime;
let timeExist = 3000;
let pointActiveTime = null;
let pointActiveExist = false; 

// Инициализация
function init() {
    drawBackground();
    drawPoint();
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

let gameTime = 0;

function update(dt) {
    gameTime += dt;
    handleInput(dt);
    checkCollisions();
    updateEntities();
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

function checkCollisions(dt) {
    checkPlayerBounds();
    checkEntitiyBounds();
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

function checkEntitiyBounds() {
    if (POINT.pos[0] + POINT.width > PLAYER.pos[0] &&
        POINT.pos[0] < PLAYER.pos[0] + PLAYER.size &&
        POINT.pos[1] + POINT.height > PLAYER.pos[1] &&
        POINT.pos[1] < PLAYER.pos[1] + PLAYER.size) {
        
        POINT.active = true;
    } 
}

function updateEntities() {
    if (POINT.active) {
        if (POINT.team === 0) {
            POINT.type = 1;
            POINT.team = PLAYER.team;
            POINT.width = lineSize;
            POINT.pos[0] = POINT.pos[0] - POINT.width / 2;
            pointActiveTime = Date.now();
        }
        if (POINT.team === PLAYER.team) {
            POINT.color = PLAYER.color;
        } else {
            PLAYER.live = 0;
            PLAYER.color = black;
            PLAYER.pos = startPos;
            POINT.color = red;
        }
        if (Date.now() - pointActiveTime < timeExist) {
            pointActiveExist = true;
        } else {
            POINT.active = false;
        }
    } else {  // изменяем состояния POINT в исходные 
        POINT.pos = [200, 200];
        POINT.width = 10;
        POINT.type = 0;
        POINT.team = 0;
        POINT.color = gray;
    }     
}    

function render() {
    ctx.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    drawPoint();
    drawPlayer();
}

// Определение requestAnimFrame
window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

init();
