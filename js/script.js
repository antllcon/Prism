import {GAME_TIME, LAST_TIME} from "./script/game/const";
import {game} from "./script/game/model";
import {drawPoints, createPoints, initPointAnimation} from "./script/point/point";
import {botMovement, createBots, initBotAnimation} from "./script/bot/bot";
import {handleInput, createPlayers, getMyPlayer, initPlayerAnimation, findPlayerBySocketId, updatePlayer} from "./script/player/player";
import {drawScore, fadeOutScore} from "./script/score/score";
import {updateEntities} from "./script/game/game";
import {checkCollisions} from "./controller/bounds";
import {drawCharacters} from "./view";
import {GAME_STATES} from "./script/game/const";
import {drawBonuses, initBonuses} from "./script/bonuses/bonus";
export let bonuses = [];
export let readyBonuses = [];
let lastBonusAddTime = 0;
const bonusAddInterval = 3;
let bonusIndex = 0;
let canvas = document.getElementById("canvas");
export let ctx = canvas.getContext("2d");
canvas.width = game.getWidth();
canvas.height = game.getHeight();

export let activePlayers = [];
export let points = [];
export let requiredPlayers = [0];
export let requiredBots = [2];
export let activeBots = [];

function init() {
    activePlayers = createPlayers();
    activeBots = createBots();
    createPoints();
    bonuses = initBonuses(bonuses);
    initBotAnimation();
    initPlayerAnimation();
    initPointAnimation();

    main();
}

export function main() {
    let now = Date.now();
    let dt = (now - LAST_TIME.lastTime) / 1000.0;
    GAME_TIME.gameTime += dt;
    update(dt, now);
    render();
    LAST_TIME.lastTime = now;
    requestAnimFrame(main);
}

function update(dt, now) {
    if (game.getState() === GAME_STATES.play) {
        botMovement(dt);
        handleInput(dt);
        // movePoint(dt);
        checkCollisions(readyBonuses);
    }
    updateEntities(dt, now);
    lastBonusAddTime += dt;
    if (lastBonusAddTime >= bonusAddInterval) {
        if (bonusIndex < bonuses.length) {
            readyBonuses.push(bonuses[bonusIndex]); // Добавляем бонус в readyBonuses
            //console.log("+1 в readybonuses")
            bonusIndex++;
        }
        lastBonusAddTime = 0;
    }
}

function render() {
    ctx.clearRect(0, 0, game.getWidth(), game.getHeight());
    // drawBackground();
    drawScore();
    drawPoints();
    drawBonuses();
    drawCharacters(activePlayers.concat(activeBots));
}

window.requestAnimFrame = window.requestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60);
};

setTimeout(fadeOutScore, 6800);
init();