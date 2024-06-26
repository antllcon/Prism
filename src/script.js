import { isDown } from './js/input.js';
// A cross-browser requestAnimationFrame
// See https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
let requestAnimFrame = (function(){
    return window.requestAnimationFrame       ||
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

let player = {
    pos: [0, 0],
    size: 10,
    color: 'brown',
    speed: 200
};
let Game = {
    width: canvasWidth,
    height: canvasHeight,
    background: 'grey'
}

canvas.width = Game.width;
canvas.height = Game.height;
let canvasContext = canvas.getContext("2d");
let gameTime = 0;


function drawBackground() {
    canvasContext.fillStyle = Game.background;
    canvasContext.fillRect(Game.width, Game.height, 0, 0);
}
function drawPlayer() {
    canvasContext.fillStyle = player.color;
    canvasContext.fillRect(player.pos[0], player.pos[1], player.size, player.size);
}
function drawFrame() {
    canvasContext.clearRect(0, 0, Game.width, Game.height);
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
    if(isDown('DOWN') || isDown('s')) {
        player.pos[1] += player.speed * dt;
    }

    if(isDown('UP') || isDown('w')) {
        player.pos[1] -= player.speed * dt;
    }

    if(isDown('LEFT') || isDown('a')) {
        player.pos[0] -= player.speed * dt;
    }

    if(isDown('RIGHT') || isDown('d')) {
        player.pos[0] += player.speed * dt;
    }
}
function updateEntities(dt) {

}
function checkCollisions() {
    checkPlayerBounds();
}
function checkPlayerBounds() {
    // Check bounds
    if(player.pos[0] < 0) {
        player.pos[0] = Game.width;
    }
    else if(player.pos[0] > Game.width) {
        player.pos[0] = 0;
    }

    if(player.pos[1] < 0) {
        player.pos[1] = Game.height;
    }
    else if(player.pos[1] > Game.height) {
        player.pos[1] = 0;
    }
}
function render() {
    canvasContext.fillStyle = Game.background;
    canvasContext.fillRect(0, 0, Game.width, Game.height);
};