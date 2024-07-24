import {game} from "./model";
import {COLORS, GAME_STATES, TEAM_STATES} from "./const";
import {resetPoints, updateVisibilityPoints} from "../point/point"
import {resetPlayers} from "../player/player"
import {resetBots} from "../bot/bot"
import {score} from "../score/model";
import {fadeOutScore, drawFinalScore} from "../score/score";
import {ctx, activePlayers, activeBots, points} from "../../script";
import {DEFAULT_POINTS, pointHeightActivationSize} from "../point/const";

export function drawBackground() {
    ctx.fillStyle = game.getBackground();
    ctx.fillRect(0, 0, game.getWidth(), game.getHeight());
}

function resetLevel() {
    const background = document.createElement("div");
    const scoreGif = document.createElement("img");

    backgroundTemplate(background, scoreGif);

    // const teamOneScore = score.getTeamOne();
    // const teamTwoScore = score.getTeamTwo();

    //scoreGif.src = getScoreGifUrl(teamOneScore, teamTwoScore);

    if (score.getTeamOne() === 0 && score.getTeamTwo() === 1) {
        scoreGif.src = "./src/assets/img/0-1.gif";
    }
    if (score.getTeamOne() === 0 && score.getTeamTwo() === 2) {
        scoreGif.src = "./src/assets/img/0-2.gif";
    }
    if (score.getTeamOne() === 1 && score.getTeamTwo() === 0) {
        scoreGif.src = "./src/assets/img/1-0.gif";
    }
    if (score.getTeamOne() === 1 && score.getTeamTwo() === 1) {
        scoreGif.src = "./src/assets/img/1-1.gif";
    }
    if (score.getTeamOne() === 1 && score.getTeamTwo() === 2) {
        scoreGif.src = "./src/assets/img/1-2.gif";
    }
    if (score.getTeamOne() === 2 && score.getTeamTwo() === 0) {
        scoreGif.src = "./src/assets/img/2-0.gif";
    }
    if (score.getTeamOne() === 2 && score.getTeamTwo() === 1) {
        scoreGif.src = "./src/assets/img/2-1.gif";
    }
    if (score.getTeamOne() === 2 && score.getTeamTwo() === 2) {
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
        // доделать по командам
        activePlayers.forEach(player => {
            if (activePlayers.every(player => player.isDead())) {
                if (player.getTeam() === TEAM_STATES.PURPLE) {
                    score.increaseTeamTwo();
                } else if (player.getTeam() === TEAM_STATES.YELLOW) {
                    score.increaseTeamOne();
                }
                console.log("Все игроки мертвы!");
                game.setState(GAME_STATES.round);
            }
        });
        activeBots.forEach(bot => {
            if (activeBots.every(bot => bot.isDead())) {
                console.log(activeBots);
                if (bot.getTeam() === TEAM_STATES.PURPLE) {
                    score.increaseTeamTwo();
                } else if (bot.getTeam() === TEAM_STATES.YELLOW) {
                    score.increaseTeamOne();
                }
                console.log("Боты умерли");
                game.setState(GAME_STATES.round);
            }
        });
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
    // playCountdown(); - музыка
    // playGameTheme(); - музыка
    // if (dt < 1) { // костыль
    //     // if (countdownTimeExist >= 0) {
    //     //     countdownTimeExist -= 1;
    // } else
    setTimeout(() => {
        background.remove();
        countdownGif.remove();
        game.setState(GAME_STATES.play);
    }, 4200)
}

