// import {TEAM_STATES} from "./const";
import {game, lastState, gameState} from "./model";
import {Point} from "../point/model";
import {POINT_STATES} from "../point/const";
import {movePoint, resetPoint, resetPoints, respawnPoint, updateVisibilityPoints} from "../point/point"
import {getMyPlayer, resetAllPlayers} from "../player/player"
import {resetAllBots} from "../bot/bot"
import {score, SCORE, scoreAlphaState} from "../score/model";
import {fadeOutScore} from "../score/score";
import {playCountdown} from "../../sound/countdownAudio";
import {playGameTheme} from "../../sound/gameThemeAudio";
import {main, ctx, activePlayers, activeBots, points} from "../../script";
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
    resetPoints();
    // POINTS.forEach((point, index) => {
    //     respawnPoint(point, index);
    // });

    setTimeout(fadeOutScore, 6800); // Устанавливаем таймер для исчезновения счёта
    countdown(); // Запускаем анимацию и звук отсчёта
}



/*function initProgressBar(player){
    //у каждого должны быть по разным координатам, может тогда проще сразу над головой рисовать?
    //думаю да
    player.progressBar = new ProgressBar(player);
}*/

export function createProgressBar(activePlayers)
{
    console.log("we are in Progress Bar")
    activePlayers.forEach(player => {

        console.log(player, 'in create progress bar we are')
        //initProgressBar(player);
    })
}


export function updateEntities(dt) {
    let player = getMyPlayer(activePlayers);

    player.updateAbilityScale(dt)

    activeBots.forEach(bot => {
        points.forEach(point => {
            if (point.isActive()) {
                if (Date.now() - point.getActivationTime() < point.getExistTime()) {
                    if (point.getTeam() === player.getTeam()) {
                        point.setColor(player.getColor());
                    }
                    if (point.getTeam() === bot.getTeam()) {
                        point.setColor(bot.getColor());
                    }
                    point.setHeight(5);
                } else {
                    point.setInactive();
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