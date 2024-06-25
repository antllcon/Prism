// A cross-browser requestAnimationFrame
// See https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
let requestAnimFrame = (function(){
    return window.requestAnimationFrame    ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

let canvas = document.getElementById("canvas");

const canvasWidth = 400;
const canvasHeight = 400;

let PLAYER = {
    pos: [0, 0],
    size: 10,
    color: '#00A86B',
    speed: 200
};

let GAME = {
    width: canvasWidth,
    height: canvasHeight,
    background: '#333'
}

let POINT = {
    pos: [200, 200],
    width: 10,
    height: 10,
    line: 10,
    color: '#666',
    active: true,
    type: 0, // 0 - point, 1 - line, 2 - cross
    time: 5000,
    team: 1
}

canvas.width = GAME.width;
canvas.height = GAME.height;
let ctx = canvas.getContext("2d");
let gameTime = 0;


function drawBackground() {
    ctx.fillStyle = GAME.background;
    ctx.fillRect(GAME.width, GAME.height, 0, 0);
}

function drawPlayer() {
    ctx.fillStyle = PLAYER.color;
    ctx.fillRect(PLAYER.pos[0], PLAYER.pos[1], PLAYER.size, PLAYER.size);
}

function drawPoint() {
    if (POINT.type === 0) {
        ctx.fillStyle = POINT.color;
        ctx.fillRect(POINT.pos[0], POINT.pos[1], POINT.width, POINT.height);
    } else if (POINT.type === 1) {
        ctx.beginPath();
        ctx.moveTo(POINT.pos[0] - 150, POINT.pos[1]);
        ctx.lineTo(POINT.pos[0] + 150, POINT.pos[1]);
        ctx.strokeStyle = POINT.color;
        ctx.lineWidth = POINT.line;
        ctx.stroke();
        ctx.closePath();
    } else {
        ctx.fillStyle = POINT.color;
        ctx.fillRect(POINT.pos[0], POINT.pos[1], POINT.width, POINT.height);
    }
}

function drawFrame() {
    ctx.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    drawPlayer();
}

let lastTime;
function main() {
    let now = Date.now();
    let dt = (now - lastTime) / 1000.0;

    update(dt);
    render();
    drawPlayer();
    lastTime = now;
    requestAnimFrame(main);
}

function init() {
    drawBackground();
    drawPlayer();
    lastTime = Date.now();
    main();
}

init();

function update(dt) {
    gameTime += dt;
    handleInput(dt);
    // updateEntities(dt);
    checkCollisions();
};

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
function updateEntities(dt) {
    
}
function checkCollisions() {
    checkPlayerBounds();
}
function checkPlayerBounds() {
    // Check bounds
    if(PLAYER.pos[0] < 0) {
        PLAYER.pos[0] = GAME.width;
    }
    else if(PLAYER.pos[0] > GAME.width) {
        PLAYER.pos[0] = 0;
    }

    if(PLAYER.pos[1] < 0) {
        PLAYER.pos[1] = GAME.height;
    }
    else if(PLAYER.pos[1] > GAME.height) {
        PLAYER.pos[1] = 0;
    }
}
function render() {
    ctx.fillStyle = GAME.background;
    ctx.fillRect(0, 0, GAME.width, GAME.height);
};
