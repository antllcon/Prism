import {GAME} from "./model";
import {lastTime, gameTime} from "./model";
import {drawBot, botMovement} from "../bot/bot";
import {drawPlayer} from "../player/player";
import {drawPoints} from "../point/point"
import {gameThemeAudio} from "../../sound/gameThemeAudio";

export function drawBackground() {
    ctx.fillStyle = GAME.background;
    ctx.fillRect(0, 0, GAME.width, GAME.height);
}

export function countdown() {
    let inputTime = Date.now();
    let background = document.createElement("div");
    let countdownGif = document.createElement("img");
    document.body.appendChild(background);
    background.classList.add('background-countdown');
    background.appendChild(countdownGif);
    countdownGif.src = "dist/assets/src/img/cat.gif";
    countdownAudio.play();
    setTimeout(() => {
        gameThemeAudio.play();
        background.remove();
        countdownGif.remove();
        lastTime = Date.now();
        main();
    }, 4200)
}

export function cordInit() {
    PLAYER.x = playerStartX;
    PLAYER.y = playerStartY;
    BOT.x = botStartX;
    BOT.y = botStartY;
}

export function render() {
    ctx.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    drawPoints();
    drawPlayer();
    drawBot();
}

export function update(dt) {
    gameTime += dt;
    botMovement(dt);
    handleInput(dt);
    checkCollisions();
    updateEntities(dt);
}

export function main() {
    let now = Date.now();
    let dt = (now - lastTime) / 1000.0;
    update(dt);
    render();
    lastTime = now;
    requestAnimFrame(main);
}

export function init() {
    cordInit();
    drawBackground();
    drawPoints();
    drawPlayer();
    drawBot();
    countdown();
}

window.requestAnimFrame = window.requestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60);
};

init();