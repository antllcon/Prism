import {TEAM_STATES} from "./const";
import {GAME, lastState, gameState} from "./model";
import {BOT} from "../bot/model";
import {BOT_STATES, botStartX, botStartY} from "../bot/const";
import {POINTS} from "../point/model";
import {POINT_STATES} from "../point/const";
import {movePoint, resetPoint, respawnPoint, updateVisibilityPoints} from "../point/point"
import {getMyPlayer, resetAllPlayers} from "../player/player"
import {SCORE, scoreAlphaState} from "../score/model";
import {fadeOutScore} from "../score/score";
import {playCountdown} from "../../sound/countdownAudio";
import {playGameTheme} from "../../sound/gameThemeAudio";
import {main, ctx, activePlayers} from "../../script";

export function drawBackground() {
    ctx.fillStyle = GAME.background;
    ctx.fillRect(0, 0, GAME.width, GAME.height);
}

export function countdown() {
    //let inputTime = Date.now(); // возможно вообще не нужен
    let background = document.createElement("div");
    let countdownGif = document.createElement("img");
    document.body.appendChild(background);
    background.classList.add('background-countdown');
    background.appendChild(countdownGif);
    countdownGif.src = "./src/assets/img/cat.gif";
    playCountdown();
    setTimeout(() => {
        playGameTheme();
        background.remove();
        countdownGif.remove();
        lastState.lastTime = Date.now();
        main();
    }, 4200)
}

export function cordInit() {
    BOT.x = botStartX;
    BOT.y = botStartY;
}

function resetLevel() {
    gameState.gameTime = -4.2;
    // cordInit();  // Сбрасываем координаты игрока и бота

    resetAllPlayers();
    // Сбрасываем параметры игрока
    // PLAYER.state = PLAYER_STATES.ACTIVE;
    // PLAYER.x = playerStartX;
    // PLAYER.y = playerStartY;
    // PLAYER.speed = 300; // сброс скорости, если она менялась
    // PLAYER.team = TEAM_STATES.PURPLE; // сброс команды, если это актуально

    // Сбрасываем параметры бота
    BOT.state = BOT_STATES.ACTIVE;
    BOT.x = botStartX;
    BOT.y = botStartY;
    BOT.speed = 300; // сброс скорости, если она менялась
    BOT.team = TEAM_STATES.YELLOW; // сброс команды, если это актуально

    scoreAlphaState.scoreAlpha = 0.2; // Сброс прозрачности счёта

    // Сбрасываем параметры всех точек
    POINTS.forEach((point, index) => {
        respawnPoint(point, index);
    });

    setTimeout(fadeOutScore, 6800); // Устанавливаем таймер для исчезновения счёта
    countdown(); // Запускаем анимацию и звук отсчёта
}

export function updateEntities(dt) {
    let player = getMyPlayer(activePlayers);
    POINTS.forEach(point => {
        if (point.state === POINT_STATES.ACTIVE) {
            if (Date.now() - point.activationTime < point.existTime) {
                if (point.team === player.getTeam()) {
                    point.color = player.getColor();
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
    // if (PLAYER.state === PLAYER_STATES.STUNNED) {
    //     PLAYER.x = 30;
    //     PLAYER.y = 30;
    // }
    activePlayers.forEach(player => {
        if (player.isDead()) {
            if (player.getTeam() === 'purple') {
                SCORE.team2 += 1;
            }
            if (player.getTeam() === 'yellow') {
                SCORE.team1 += 1;
            }
            resetLevel();
        }
    });
    
    if (BOT.state === BOT_STATES.DEAD) {
        SCORE.team1 += 1;
        resetLevel();
    }
}