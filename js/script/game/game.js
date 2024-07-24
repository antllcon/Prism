import {game, lastState} from "./model";
import {COLORS, TEAM_STATES} from "./const";
import {movePoint, resetPoint, resetPoints, updateVisibilityPoints} from "../point/point"
import {getMyPlayer, resetAllPlayers} from "../player/player"
import {resetAllBots} from "../bot/bot"
import {score, scoreAlphaState} from "../score/model";
import {fadeOutScore} from "../score/score";
import {playCountdown} from "../../sound/countdownAudio";
import {playGameTheme} from "../../sound/gameThemeAudio";
import {main, ctx, activePlayers, activeBots, points, socket} from "../../script";
import { updateAbilityScale } from "../player/progressBar/progressBar";
import { BOT_STATES } from "../bot/const";
import { PLAYER_STATES } from "../player/const";

export function drawBackground() {
    ctx.fillStyle = game.getBackground();
    ctx.fillRect(0, 0, game.getWidth(), game.getHeight());
}

export function countdown() {
    //let inputTime = Date.now(); // возможно вообще не нужен
    const background = document.createElement('div');
    const countdownGif = document.createElement('img');
    document.body.appendChild(background);
    background.classList.add('background-countdown');
    background.appendChild(countdownGif);
    countdownGif.src = './src/assets/img/cat.gif';
    playCountdown();
    setTimeout(() => {
        playGameTheme();
        background.remove();
        countdownGif.remove();
        lastState.lastTime = Date.now();
        main();
    }, 4200);
}

function resetLevel() {
    socket.emit('resetPlayers')
    socket.on('playersReset', (players) => {
        let playersFromServer = [];
        playersFromServer = players;
        activePlayers = playersFromServer;
        console.log(JSON.stringify(activePlayers, null, 2));
    })
    socket.emit('resetBots')
    socket.on('botsReset', (bots) => {
        activeBots = [];
        activeBots = bots;
    })
    scoreAlphaState.scoreAlpha = 0.2; // Сброс прозрачности счёта

    // Сбрасываем параметры всех точек
    resetPoints();

    let background = document.createElement("div");
    let scoreGif = document.createElement("img");
    document.body.appendChild(background);
    background.classList.add('background-countdown');
    background.appendChild(scoreGif);
    if (score.getTeam1() === 0 && score.getTeam2() === 1) {
        scoreGif.src = "./src/assets/img/0-1.gif";
    }
    if (score.getTeam1() === 0 && score.getTeam2() === 2) {
        scoreGif.src = "./src/assets/img/0-2.gif";
    }
    if (score.getTeam1() === 1 && score.getTeam2() === 0) {
        scoreGif.src = "./src/assets/img/1-0.gif";
    }
    if (score.getTeam1() === 1 && score.getTeam2() === 1) {
        scoreGif.src = "./src/assets/img/1-1.gif";
    }
    if (score.getTeam1() === 1 && score.getTeam2() === 2) {
        scoreGif.src = "./src/assets/img/1-2.gif";
    }
    if (score.getTeam1() === 2 && score.getTeam2() === 0) {
        scoreGif.src = "./src/assets/img/2-0.gif";
    }
    if (score.getTeam1() === 2 && score.getTeam2() === 1) {
        scoreGif.src = "./src/assets/img/2-1.gif";
    }
    if (score.getTeam1() === 2 && score.getTeam2() === 2) {
        scoreGif.src = "./src/assets/img/2-2.gif";
    }
    console.log(score.getTeam1(), 'score team 1');
    console.log(score.getTeam2(), 'score team 2');

    setTimeout(() => {
        background.remove();
        scoreGif.remove();
        lastState.lastTime = Date.now();
        main();
    }, 2000)

    setTimeout(fadeOutScore, 6800); // Устанавливаем таймер для исчезновения счёта
}

export function updateEntities(dt) {
    const player = getMyPlayer(activePlayers);
    let isSomeoneDead = false;
    updateAbilityScale(dt, player);
    activeBots.forEach(bot => {
        if (bot.state === BOT_STATES.DEAD) {
            if (bot.team === TEAM_STATES.PURPLE) {
                score.increaseTeamYellow()
            }
            if (bot.team === TEAM_STATES.YELLOW) {
                score.increaseTeamPurple()
            }
            isSomeoneDead = true;
        }
    });
    activePlayers.forEach(player => {
        if (player.state === PLAYER_STATES.DEAD) {
            if (player.team === TEAM_STATES.PURPLE) {
                score.increaseTeamYellow()
            }
            if (player.team === TEAM_STATES.YELLOW) {
                score.increaseTeamPurple()
            }
            isSomeoneDead = true;
        }
    });
    if (isSomeoneDead) {
        resetLevel();
    }
    points.forEach(point => {
        if (point.isActive()) {
            if (Date.now() - point.getActivationTime() < point.getExistTime()) {
                if (point.getTeam() === TEAM_STATES.PURPLE) {
                    point.setColor(COLORS.PURPLE);
                }
                if (point.getTeam() === TEAM_STATES.YELLOW) {
                    point.setColor(COLORS.YELLOW);
                }
                point.setHeight(10);
                point.setWidth(10);
            } else {
                point.setInactive();
                point.setColor(COLORS.GRAY)
                resetPoint(point);
            }
        }
        if (point.isInvisible()) {
            updateVisibilityPoints(point);
        }
        if (point.isActive() || point.isInactive()) {
            movePoint(point, dt);
        }
    })
}