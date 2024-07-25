import {COLORS, GAME_STATES, TEAM_STATES} from "./const";
import {resetPoints} from "../point/point"
import {getMyPlayer, resetAllPlayers} from "../player/player"
import {score, scoreAlphaState} from "../score/model";
import {fadeOutScore} from "../score/score";
import {playCountdown} from "../../sound/countdownAudio";
import {playGameTheme} from "../../sound/gameThemeAudio";
import {activePlayers, activeBots, points} from "../../script";
import {updateAbilityScale} from "../player/progressBar/progressBar";
import {PLAYER_STATES} from "../player/const";
import {DEFAULT_POINTS, pointHeightActivationSize} from "../point/const";
import {game} from "./model";
import {drawFinalScore} from "../score/score";
import {resetAllBots} from "../bot/bot";

function resetLevel() {
    /* socket.emit('resetPlayers')
     socket.on('playersReset', (players) => {
         activePlayers.forEach((activePlayer) => {
             activePlayer
         })
     })*/
//непонятно когда работаета когда нет
    resetAllPlayers();
    resetAllBots();
    scoreAlphaState.scoreAlpha = 0.2; // Сброс прозрачности счёта

    let background = document.createElement("div");
    let scoreGif = document.createElement("img");

    backgroundTemplate(background, scoreGif);

    if (score.getTeamPurple() === 0 && score.getTeamYellow() === 1) {
        scoreGif.src = "./src/assets/img/0-1.gif";
    }
    if (score.getTeamPurple() === 0 && score.getTeamYellow() === 2) {
        scoreGif.src = "./src/assets/img/0-2.gif";
    }
    if (score.getTeamPurple() === 1 && score.getTeamYellow() === 0) {
        scoreGif.src = "./src/assets/img/1-0.gif";
    }
    if (score.getTeamPurple() === 1 && score.getTeamYellow() === 1) {
        scoreGif.src = "./src/assets/img/1-1.gif";
    }
    if (score.getTeamPurple() === 1 && score.getTeamYellow() === 2) {
        scoreGif.src = "./src/assets/img/1-2.gif";
    }
    if (score.getTeamPurple() === 2 && score.getTeamYellow() === 0) {
        scoreGif.src = "./src/assets/img/2-0.gif";
    }
    if (score.getTeamPurple() === 2 && score.getTeamYellow() === 1) {
        scoreGif.src = "./src/assets/img/2-1.gif";
    }
    if (score.getTeamPurple() === 2 && score.getTeamYellow() === 2) {
        scoreGif.src = "./src/assets/img/2-2.gif";
    }

    setTimeout(() => {
        background.remove();
        scoreGif.remove();
        resetPoints();
        resetPlayers();
        resetBots();
        game.setState(GAME_STATES.PLAY);
    }, 1000)

    setTimeout(fadeOutScore, 6800); // Устанавливаем таймер для исчезновения счёта
}

let countdownExist = true;

export function updateEntities(dt, now) {

    if (game.getState() === GAME_STATES.START) {
        if (countdownExist) {
            countdown();
            countdownExist = false;
        }
    }
    if (game.getState() === GAME_STATES.PLAY) {
        const player = getMyPlayer(activePlayers);
        updateAbilityScale(dt, player);

        let deadTeam = getDeadTeam(activePlayers.concat(activeBots));
        if (deadTeam === TEAM_STATES.PURPLE) {
            score.increaseTeamYellow();
            game.setState(GAME_STATES.ROUND);
        }
        if (deadTeam === TEAM_STATES.YELLOW) {
            score.increaseTeamPurple();
            game.setState(GAME_STATES.ROUND);
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
    if (game.getState() === GAME_STATES.ROUND) {
        if (score.isVictoryScore()) {
            setTimeout(() => {
                game.setState(GAME_STATES.VICTORY);
            }, 500);
        }
        if (!score.isVictoryScore()) {
            resetLevel();
        }
    }
    if (game.getState() === GAME_STATES.VICTORY) {
        drawFinalScore();
    }
}


function getDeadTeam(players) {
    let purpleAlive = 0;
    let purpleDead = 0;
    let yellowAlive = 0;
    let yellowDead = 0;

    // Подсчитываем количество живых и мертвых игроков в каждой команде
    players.forEach(player => {
        if (player.team === TEAM_STATES.PURPLE) {
            if (player.state === PLAYER_STATES.DEAD) {
                purpleDead++;
            } else {
                purpleAlive++;
            }
        } else if (player.team === TEAM_STATES.YELLOW) {
            if (player.state === PLAYER_STATES.DEAD) {
                yellowDead++;
            } else {
                yellowAlive++;
            }
        }
    });

    // Проверяем, есть ли команда, у которой все игроки мертвы
    if (purpleAlive === 0 && purpleDead > 0) {
        return TEAM_STATES.PURPLE;
    }

    if (yellowAlive === 0 && yellowDead > 0) {
        return TEAM_STATES.YELLOW;
    }

    return false;
}


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

