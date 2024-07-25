import {COLORS, GAME_STATES, TEAM_STATES} from "./const";
import {movePoint, resetPoint, resetPoints, updateVisibilityPoints} from "../point/point"
import {getMyPlayer, resetAllPlayers} from "../player/player"
import {resetAllBots} from "../bot/bot"
import {score, scoreAlphaState} from "../score/model";
import {fadeOutScore} from "../score/score";
import {playCountdown} from "../../sound/countdownAudio";
import {playGameTheme} from "../../sound/gameThemeAudio";
import {main, activePlayers, activeBots, points, socket} from "../../script";
import {updateAbilityScale} from "../player/progressBar/progressBar";
import {BOT_STATES} from "../bot/const";
import {PLAYER_STATES} from "../player/const";
import {DEFAULT_POINTS, pointHeightActivationSize} from "../point/const";
import {game} from "./model";

export function countdown() {
    const background = document.createElement('div');
    const countdownGif = document.createElement('img');
    backgroundTemplate(background, countdownGif);
    countdownGif.src = './src/assets/img/cat.gif';
    playCountdown();

    setTimeout(() => {
        playGameTheme();
        background.remove();
        countdownGif.remove();
        game.setState(GAME_STATES.PLAY);
    }, 4200);
}

export function backgroundTemplate(background, gif) {
    document.body.appendChild(background);
    background.classList.add("background-countdown");
    background.appendChild(gif);
}

function resetLevel() {
    /* socket.emit('resetPlayers')
     socket.on('playersReset', (players) => {
         activePlayers.forEach((activePlayer) => {
             activePlayer
         })
     })*/

    resetAllPlayers();
    resetAllBots();
    scoreAlphaState.scoreAlpha = 0.2; // Сброс прозрачности счёта

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
    //console.log(score.getTeam1(), 'score team 1');
    //console.log(score.getTeam2(), 'score team 2');

    setTimeout(() => {
        background.remove();
        scoreGif.remove();
        resetPoints();
        main();
    }, 2000)

    setTimeout(fadeOutScore, 6800); // Устанавливаем таймер для исчезновения счёта
}

let coutdownExist = true;

export function updateEntities(dt, now) {

    if (game.getState() === GAME_STATES.START) {
        if (coutdownExist) {
            countdown();
            coutdownExist = false;
        }
    }

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
            if (now - point.getActivationTime() < point.getExistTime()) {
                if (point.getTeam() === TEAM_STATES.PURPLE) {
                    point.setColor(COLORS.PURPLE);
                }
                if (point.getTeam() === TEAM_STATES.YELLOW) {
                    point.setColor(COLORS.YELLOW);
                }
                point.setHeight(pointHeightActivationSize);
            } else {
                point.setInactive();
            }
        }
        if (point.isInactive()) {
            point.setColor(DEFAULT_POINTS.color);
            point.setHeight(DEFAULT_POINTS.height);
        }
        if (point.isInvisible()) {
            // updateVisibilityPoints(point);
        }
    });
}