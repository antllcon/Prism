// в константе socket должен лежать айди игрока
// и по каждому айди мы должны его рисовать
import {GAME, gameState, lastState} from "./script/game/model";
import {drawPoints} from "./script/point/point";
import {botMovement, drawBot} from "./script/bot/bot";
import {drawPlayer, handleInput} from "./script/player/player";
import {SCORE} from "./script/score/model";
import {drawFinalScore, drawScore, fadeOutScore} from "./script/score/score";
import {cordInit, countdown, drawBackground, updateEntities} from "./script/game/game";
import {checkCollisions} from "./controller/bounds";
import {createPlayers} from "./script/player/player";

let canvas = document.getElementById("canvas");
export let ctx = canvas.getContext("2d");
canvas.width = GAME.width;
canvas.height = GAME.height;
const socket = io();
export let activePlayers = [];

const players = ['1', '2', '3', '4'];

const socket_id = '1';

function render() {
    ctx.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    drawScore();
    drawPoints();
    drawPlayer(activePlayers);
    drawBot();
}

function update(dt) {
    gameState.gameTime += dt;
    botMovement(dt);
    handleInput(dt);
    checkCollisions();
    updateEntities(dt);
}

export function main() {
    let now = Date.now();
    let dt = (now - lastState.lastTime) / 1000.0;
    if (SCORE.team1 < 3 && SCORE.team2 < 3) {
        update(dt);
        render();
    }
    else {
        drawBackground();
        drawFinalScore();
        setTimeout(() => {window.location.href = 'index.html';}, 1500);
    }
    lastState.lastTime = now;
    requestAnimFrame(main);
}

function init() {
    connect();
    // initPlayers();
    cordInit();
    drawBackground();
    drawScore();
    drawPoints();
    drawPlayer(activePlayers);
    drawBot();
    countdown();
}

function connect() {
    socket.on('connect', () => {
        console.log('Connected to server with id:', socket.id);
        activePlayers = createPlayers(players, socket_id);
    });
}

function initPlayers() {
    socket.on('roomIsReady', (players) => {
        activePlayers = createPlayers(players, socket.id);
    })
}

function sendDataToServer() {
    playerAsEntity = getMyPlayer(activePlayers);
    let transmittedPlayer = prepTransmittedPlayer(playerAsEntity);
    socket.emit('sendDataToServer', transmittedPlayer);
}

function prepTransmittedPlayer(playerAsEntity) {
    return {
        id: playerAsEntity.getId(),
        x: playerAsEntity.getX(),
        y: playerAsEntity.getY(),
        team: playerAsEntity.getTeam(),
        color: playerAsEntity.getColor(),
        state: playerAsEntity.getState()
    }
}

function getDataFromServer() {
    socket.on('dataChanged', () => {
    })
}

window.requestAnimFrame = window.requestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60);
};

setTimeout(fadeOutScore, 6800);
init();