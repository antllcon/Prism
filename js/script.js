import {game, gameState, lastState} from "./script/game/model";
import {drawPoints, createPoints} from "./script/point/point";
import {botMovement, drawBot, createBots} from "./script/bot/bot";
import {drawPlayer, handleInput, createPlayers, getMyPlayer} from "./script/player/player";
import {SCORE, score} from "./script/score/model";
import {drawFinalScore, drawScore, fadeOutScore} from "./script/score/score";
import {countdown, drawBackground, updateEntities} from "./script/game/game";
import {checkCollisions} from "./controller/bounds";
import {io} from "socket.io-client";

let canvas = document.getElementById("canvas");
export let ctx = canvas.getContext("2d");
canvas.width = game.getWidth();
canvas.height = game.getHeight();
const socket = io();

export let activePlayers = [];
export let points = [];
export let requiredBots = [2, 3];
export let activeBots = [];

const players = ['1'];

const socket_id = '1';

function init() {
    connect();
    activeBots = createBots();
    createPoints();
    drawBackground();
    drawScore();
    drawPoints();
    drawPlayer(activePlayers);
    drawBot();
    countdown();
}

function render() {
    ctx.clearRect(0, 0, game.getWidth(), game.getHeight());
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
    if (score.getTeam1() < 3 && score.getTeam2() < 3) {
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

function connect() {
    socket.on('connect', () => {
        console.log('Connected to server with id:', socket.id);
        initPlayers();
        // activePlayers = createPlayers(players, socket_id);
    });
}

function initPlayers() {
    socket.emit('requestForClients');
    socket.on('sendClients', (clients) => {

        console.log('sendClients вызван')
        console.log(clients);
        activePlayers = createPlayers(clients, socket.id);
        console.log(activePlayers, 'active players')
    })
}

function sendDataToServer() {
    let playerAsEntity = getMyPlayer(activePlayers);
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