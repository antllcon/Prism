import {GAME_TIME, LAST_TIME} from "./script/game/const";
import {game} from "./script/game/model";
import {drawPoints, createPoints, initPointAnimation} from "./script/point/point";
import {botMovement, createBots, initBotAnimation} from "./script/bot/bot";
import {handleInput, createPlayers, getMyPlayer, initPlayerAnimation, findPlayerBySocketId, updatePlayer} from "./script/player/player";
import {drawScore, fadeOutScore} from "./script/score/score";
import {updateEntities} from "./script/game/game";
import {checkCollisions} from "./controller/bounds";
import {drawCharacters} from "./view";
import {io} from "socket.io-client";
import {GAME_STATES} from "./script/game/const";

let canvas = document.getElementById("canvas");
export let ctx = canvas.getContext("2d");
canvas.width = game.getWidth();
canvas.height = game.getHeight();
const socket = io();

export let activePlayers = [];
export let points = [];
export let requiredBots = [2, 3];
export let activeBots = [];

// const players = ['1'];
// const socket_id = '1';

function init() {
    connect(); // createPlayers
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
        dataExchange(); // отправляем на сервер и получаем с сервера
        // movePoint(dt);
        checkCollisions();
    }
    updateEntities(dt, now);
}

function render() {
    ctx.clearRect(0, 0, game.getWidth(), game.getHeight());
    // drawBackground();
    drawScore();
    drawPoints();
    drawCharacters(activePlayers.concat(activeBots));
}

// Обмен с сервером
function connect() {
    socket.on('connect', () => {
        socket.emit('redirected');
        sendCookie();
        initPlayers();
    });

}

function initPlayers() {
    socket.emit('requestForClients');
    socket.on('sendClients', (clients) => {
        activePlayers = createPlayers(clients, socket.id);
        initPlayerAnimation();
        activeBots = createBots();
        initBotAnimation();
        createPoints();
        initPointAnimation();
        main();
    })
}

function dataExchange() {
    sendDataToServer();
    getDataFromServer();
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
    // Получили массив данных по игрокам
    // нужно обновить всех игроков, которые не наш
    socket.on('dataFromServer', (playersFromServer) => {
        // console.log('dataFromServer on', playersFromServer);
        // console.log(socket.id, 'socket.id');
        playersFromServer.forEach(playerFromServer => {
            if (playerFromServer.id !== socket.id) {
                const player = findPlayerBySocketId(playerFromServer.id);
                if (player) {
                    updatePlayer(player, playerFromServer);
                }
            }
        });
    })
}

window.requestAnimFrame = window.requestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60);
};

function sendCookie() {
    const cookieValue = document.cookie.split('; ')
        .find(row => row.startsWith('userId='))
        ?.split('=')[1];
    // Отправляем куки на сервер

    socket.emit('sentCookie', cookieValue);
}

setTimeout(fadeOutScore, 6800);
init();