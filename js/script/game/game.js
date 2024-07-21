// import {TEAM_STATES} from "./const";
import {game, lastState, gameState} from "./model";
import {Point} from "../point/model";
import {POINT_STATES} from "../point/const";
import {COLORS, TEAM_STATES} from "./const";
import {movePoint, resetPoint, resetPoints, respawnPoint, updateVisibilityPoints} from "../point/point"
import {getMyPlayer, resetAllPlayers} from "../player/player"
import {resetAllBots} from "../bot/bot"
import {score, SCORE, scoreAlphaState} from "../score/model";
import {fadeOutScore} from "../score/score";
import {playCountdown} from "../../sound/countdownAudio";
import {playGameTheme} from "../../sound/gameThemeAudio";
import {main, ctx, activePlayers, activeBots, points} from "../../script";

export function drawBackground() {
    ctx.fillStyle = game.getBackground();
    ctx.fillRect(0, 0, game.getWidth(), game.getHeight());
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

function resetLevel() {
    gameState.gameTime = -4.2;
    resetAllPlayers();
    resetAllBots();

    scoreAlphaState.scoreAlpha = 0.2; // Сброс прозрачности счёта

    // Сбрасываем параметры всех точек
    resetPoints();
    // POINTS.forEach((point, index) => {
    //     respawnPoint(point, index);
    // });

    setTimeout(fadeOutScore, 6800); // Устанавливаем таймер для исчезновения счёта
    countdown(); // Запускаем анимацию и звук отсчёта
}

export function updateEntities(dt) {
    // let player = getMyPlayer(activePlayers);
    activeBots.forEach(bot => {
        if (bot.isDead()) {
            if (bot.getTeam() === TEAM_STATES.PURPLE) {
                score.increaseTeamYellow()
            }
            if (bot.getTeam() === TEAM_STATES.YELLOW) {
                score.increaseTeamPurple()
            }
            resetLevel();
        }
    });
    activePlayers.forEach(player => {
        if (player.isDead()) {
            if (player.getTeam() === TEAM_STATES.PURPLE) {
                score.increaseTeamYellow()
            }
            if (player.getTeam() === TEAM_STATES.YELLOW) {
                score.increaseTeamPurple()
            }
            resetLevel();
        }
    });
    points.forEach(point => {
        if (point.isActive()) {
            if (Date.now() - point.getActivationTime() < point.getExistTime()) {
                if (point.getTeam() === TEAM_STATES.PURPLE) {
                    point.setColor(COLORS.PURPLE);
                }
                if (point.getTeam() === TEAM_STATES.YELLOW) {
                    point.setColor(COLORS.YELLOW);
                }
                point.setHeight(5);
            } else {
                point.setInactive();
                point.setColor(COLORS.GRAY)
                resetPoint(point);
            }
        }
        if (point.isInactive()) {

        }
        if (point.isInvisible()) {
            updateVisibilityPoints(point);
        }
        if (point.isActive() || point.isInactive()) {
            movePoint(point, dt);
        }
    })
}