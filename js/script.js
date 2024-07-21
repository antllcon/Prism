import {game, gameState, lastState} from "./script/game/model";
import {drawPoints, createPoints} from "./script/point/point";
import {botMovement, drawBot, createBots} from "./script/bot/bot";
import {drawPlayer, handleInput, createPlayers, getMyPlayer, findPlayerBySocketId, updatePlayer} from "./script/player/player";
import {SCORE, score} from "./script/score/model";
import {botMovement, createBots, initBotAnimation} from "./script/bot/bot";
import {handleInput, createPlayers, initPlayerAnimation} from "./script/player/player";
import {score} from "./script/score/model";
import {drawFinalScore, drawScore, fadeOutScore} from "./script/score/score";
import {countdown, drawBackground, updateEntities} from "./script/game/game";
import {checkCollisions} from "./controller/bounds";
import {drawCharacters} from "./view";
import {io} from "socket.io-client";

let canvas = document.getElementById("canvas");
export let ctx = canvas.getContext("2d");
canvas.width = game.getWidth();
canvas.height = game.getHeight();
const socket = io();

export let activePlayers = [];
export let points = [];
export let requiredBots = [];
export let activeBots = [];

const players = ['1'];
const socket_id = '1';

async function init() {
    connect();
    activeBots = createBots();
    createPoints();
    initBotAnimation();
    countdown();
}

function render() {
    ctx.clearRect(0, 0, game.getWidth(), game.getHeight());
    drawBackground();
    drawScore();
    drawPoints();
    drawCharacters(activePlayers.concat(activeBots));
}

function update(dt) {
    gameState.gameTime += dt;
    botMovement(dt);
    handleInput(dt);
    // отправляем на сервер и получаем с сервера
    dataExchange();
    checkCollisions();
    updateEntities(dt);
}

export function main() {
    let now = Date.now();
    let dt = (now - lastState.lastTime) / 1000.0;
    if (score.getTeam1() < 3 && score.getTeam2() < 3) {
        update(dt);
        render();
    } else {
        drawBackground();
        drawFinalScore();
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }
    lastState.lastTime = now;
    requestAnimFrame(main);
}
function connect() {
    socket.on('connect', () => {
        console.log('Connected to server with id:', socket.id);
        socket.emit('redirected');
        sendCookie();
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
        initPlayerAnimation()
    })
}

// Обмен с сервером

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

function initEventListeners() {
    // window.addEventListener('beforeunload', function(e) {
    //     e.preventDefault(); // Предотвращаем стандартное поведение
    //     e.returnValue = ''; // Убираем сообщение о подтверждении
    //     // Здесь вы можете вызвать функцию для отправки уведомления на сервер
    //     socket.emit('pageRefreshed');
    // });
}
function sendCookie() {
    const cookieValue = document.cookie.split('; ')
        .find(row => row.startsWith('userId='))
        ?.split('=')[1];
    console.log(document.cookie, 'document.cookie');
    // Отправляем куки на сервер
    socket.emit('sentCookie', cookieValue);
}

setTimeout(fadeOutScore, 6800);

init();

