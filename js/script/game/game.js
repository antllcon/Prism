// import {TEAM_STATES} from "./const";
import {game, lastState, gameState} from "./model";
import {POINTS} from "../point/model";
import {POINT_STATES} from "../point/const";
import {movePoint, resetPoint, respawnPoint, updateVisibilityPoints} from "../point/point"
import {getMyPlayer, resetAllPlayers} from "../player/player"
import {resetAllBots} from "../bot/bot"
import {score, SCORE, scoreAlphaState} from "../score/model";
import {fadeOutScore} from "../score/score";
import {playCountdown} from "../../sound/countdownAudio";
import {playGameTheme} from "../../sound/gameThemeAudio";
import {main, ctx, activePlayers, activeBots} from "../../script";
import {logPlugin} from "@babel/preset-env/lib/debug";

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
    POINTS.forEach((point, index) => {
        respawnPoint(point, index);
    });

    setTimeout(fadeOutScore, 6800); // Устанавливаем таймер для исчезновения счёта
    countdown(); // Запускаем анимацию и звук отсчёта
}

export function updateEntities(dt) {
    let player = getMyPlayer(activePlayers);
    activeBots.forEach(bot => {
        POINTS.forEach(point => {
            if (point.state === POINT_STATES.ACTIVE) {
                if (Date.now() - point.activationTime < point.existTime) {
                    if (point.team === player.getTeam()) {
                        point.color = player.getColor();
                        point.height = 5;
                    }
                    if (point.team === bot.getTeam()) {
                        point.color = bot.getColor();
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
        /////
        if (bot.isDead()) {
            if (bot.getTeam() === 'purple') {
                score.increaseTeamYellow()
            }
            if (bot.getTeam() === 'yellow') {
                score.increaseTeamPurple()
            }
            resetLevel();
        }
    });

    activePlayers.forEach(player => {
        if (player.isDead()) {
            console.log("hey hey player is dead game js")
            console.log(activeBots, "active bots game js in player.is dead")
            if (player.getTeam() === 'purple') {
                score.increaseTeamYellow()
            }
            if (player.getTeam() === 'yellow') {
                score.increaseTeamPurple()
            }
            resetLevel();
        }
    });
}