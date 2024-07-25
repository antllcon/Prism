import {game} from "./model";
import {COLORS, GAME_STATES, TEAM_STATES} from "./const";
import {resetPoints, updateVisibilityPoints} from "../point/point"
import {resetPlayers} from "../player/player"
import {resetBots} from "../bot/bot"
import {score} from "../score/model";
import {fadeOutScore, drawFinalScore} from "../score/score";
import {activePlayers, activeBots, points} from "../../script";
import {DEFAULT_POINTS, pointHeightActivationSize} from "../point/const";
import {playCountdown} from "../../sound/countdownAudio";
import {playGameTheme} from "../../sound/gameThemeAudio";
import {playDeathPlayer} from "../../sound/deathPlayerSound";

// export function drawBackground() {
//     ctx.fillStyle = game.getBackground();
//     ctx.fillRect(0, 0, game.getWidth(), game.getHeight());
// }

function resetLevel() {
    const background = document.createElement("div");
    const scoreGif = document.createElement("img");

    backgroundTemplate(background, scoreGif);

    // const teamOneScore = score.getTeamOne();
    // const teamTwoScore = score.getTeamTwo();

    //scoreGif.src = getScoreGifUrl(teamOneScore, teamTwoScore);

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
        resetPlayers();
        resetBots();
        resetPoints();
        game.setState(GAME_STATES.play);
    }, 1000)

    setTimeout(fadeOutScore, 6800);
}

export function backgroundTemplate(background, gif) {
    document.body.appendChild(background);
    background.classList.add("background-countdown");
    background.appendChild(gif);
}

let existCountdown = true;

function getDeadTeam(players) {
    let purpleAlive = 0;
    let purpleDead = 0;
    let yellowAlive = 0;
    let yellowDead = 0;

    // Подсчитываем количество живых и мертвых игроков в каждой команде
    players.forEach(player => {
        if (player.getTeam() === TEAM_STATES.PURPLE) {
            if (player.isDead()) {
                purpleDead++;
            } else {
                purpleAlive++;
            }
        } else if (player.getTeam() === TEAM_STATES.YELLOW) {
            if (player.isDead()) {
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


export function updateEntities(dt, now) {
    if (game.getState() === GAME_STATES.start) {
        if (existCountdown) {
            countdown();
            existCountdown = false;
        }
    }
    if (game.getState() === GAME_STATES.play) {
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
                updateVisibilityPoints(point);
            }
        });
        
        let deadTeam = getDeadTeam(activePlayers.concat(activeBots));
        if (deadTeam === TEAM_STATES.PURPLE) {
            score.increaseTeamPurple();
            game.setState(GAME_STATES.round);
        }
        if (deadTeam === TEAM_STATES.YELLOW) {
            score.increaseTeamYellow();
            game.setState(GAME_STATES.round);
        }

    }
    // должно переходить в pause
    if (game.getState() === GAME_STATES.round) {
        // console.log("Раунд закончился", score.getTeamOne(), score.getTeamTwo());
        if (score.isVictoryScore()) {
            setTimeout(() => {
                game.setState(GAME_STATES.victory);
            }, 1500);
        } else {
            console.log("готов");
            resetLevel();
        }
    }
    if (game.getState() === GAME_STATES.victory) {
        drawFinalScore();
        // должно показывать счет и переходить на index
    }
}

// let countdownTimeExist = 4200;

export function countdown() {
    const background = document.createElement("div");
    const countdownGif = document.createElement("img");
    backgroundTemplate(background, countdownGif);
    countdownGif.src = "./src/assets/img/cat.gif";
    playCountdown();
    playGameTheme();
    // if (dt < 1) { // костыль
    //     // if (countdownTimeExist >= 0) {
    //     //     countdownTimeExist -= 1;
    // }
    setTimeout(() => {
        background.remove();
        countdownGif.remove();
        game.setState(GAME_STATES.play);
    }, 4200)
}

