import {TEAM_STATES} from "./const";
import {ctx, GAME, lastTime, gameTime} from "./model";
import {BOT} from "../bot/model";
import {drawBot, botMovement} from "../bot/bot";
import {BOT_STATES, botStartX, botStartY} from "../bot/const";
import {PLAYER} from "../player/model";
import {drawPlayer, handleInput} from "../player/player";
import {PLAYER_STATES, playerStartX, playerStartY} from "../player/const";
import {POINTS} from "../point/model";
import {POINT_STATES} from "../point/const";
import {drawPoints, movePoint, resetPoint, respawnPoint, updateVisibilityPoints} from "../point/point"
import {SCORE, scoreAlpha} from "../score/model";
import {drawFinalScore, drawScore, fadeOutScore} from "../score/score";
import {checkCollisions} from "../../controller/bounds";
import {playCountdown} from "../../sound/countdownAudio";
import {playGameTheme} from "../../sound/gameThemeAudio";

function drawBackground() {
    ctx.fillStyle = GAME.background;
    ctx.fillRect(0, 0, GAME.width, GAME.height);
}

function countdown() {
    let inputTime = Date.now(); // возможно вообще не нужен
    let background = document.createElement("div");
    let countdownGif = document.createElement("img");
    document.body.appendChild(background);
    background.classList.add('background-countdown');
    background.appendChild(countdownGif);
    countdownGif.src = "dist/assets/src/img/cat.gif";
    playCountdown();
    setTimeout(() => {
        playGameTheme();
        background.remove();
        countdownGif.remove();
        lastTime = Date.now();
        main();
    }, 4200)
}

function cordInit() {
    PLAYER.x = playerStartX;
    PLAYER.y = playerStartY;
    BOT.x = botStartX;
    BOT.y = botStartY;
}

function resetLevel() {
    gameTime = -4.2;
    cordInit();  // Сбрасываем координаты игрока и бота

    // Сбрасываем параметры игрока
    PLAYER.state = PLAYER_STATES.ACTIVE;
    PLAYER.x = playerStartX;
    PLAYER.y = playerStartY;
    PLAYER.speed = 300; // сброс скорости, если она менялась
    PLAYER.team = TEAM_STATES.PURPLE; // сброс команды, если это актуально

    // Сбрасываем параметры бота
    BOT.state = BOT_STATES.ACTIVE;
    BOT.x = botStartX;
    BOT.y = botStartY;
    BOT.speed = 300; // сброс скорости, если она менялась
    BOT.team = TEAM_STATES.YELLOW; // сброс команды, если это актуально

    scoreAlpha = 0.2; // Сброс прозрачности счёта

    // Сбрасываем параметры всех точек
    POINTS.forEach((point, index) => {
        respawnPoint(point, index);
    });

    setTimeout(fadeOutScore, 6800); // Устанавливаем таймер для исчезновения счёта
    // countdown(); // Запускаем анимацию и звук отсчёта
}

function render() {
    ctx.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    drawScore();
    drawPoints();
    drawPlayer();
    drawBot();
}

function update(dt) {
    gameTime += dt;
    botMovement(dt);
    handleInput(dt);
    checkCollisions();
    updateEntities(dt);
}

function main() {
    let now = Date.now();
    let dt = (now - lastTime) / 1000.0;
    if (SCORE.team1 < 3 && SCORE.team2 < 3) {
        update(dt);
        render();
    }
    else {
        drawBackground();
        drawFinalScore();
        setTimeout(() => {window.location.href = 'menu_all.html';}, 1500);
    }
    lastTime = now;
    requestAnimFrame(main);
}

function init() {
    cordInit();
    drawBackground();
    drawScore();
    drawPoints();
    drawPlayer();
    drawBot();
    countdown();
}

function updateEntities(dt) {
    POINTS.forEach(point => {
        if (point.state === POINT_STATES.ACTIVE) {
            if (Date.now() - point.activationTime < point.existTime) {
                if (point.team === PLAYER.team) {
                    point.color = PLAYER.color;
                    point.height = 5;
                }
                if (point.team === BOT.team) {
                    point.color = BOT.color;
                    point.height = 5;
                }
            } else {
                point.state = POINT_STATES.INACTIVE;
                resetPoint(point, POINTS.indexOf(point));
            }
        }
        if (point.state === POINT_STATES.INACTIVE) {

        }
        if (point.state === POINT_STATES.INVISIBLE) {
            updateVisibilityPoints(point);
        }
        if (point.state === POINT_STATES.ACTIVE || point.state === POINT_STATES.INACTIVE) {
            movePoint(point, dt);
        }
    })
    if (PLAYER.state === PLAYER_STATES.STUNNED) {
        PLAYER.x = 30;
        PLAYER.y = 30;
    }
    if (PLAYER.state === PLAYER_STATES.DEAD) {
        SCORE.team2 += 1;
        resetLevel();
    }
    if (BOT.state === BOT_STATES.DEAD) {
        SCORE.team1 += 1;
        resetLevel();
    }
}

window.requestAnimFrame = window.requestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60);
};

setTimeout(fadeOutScore, 6800);
init();