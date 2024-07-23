// в константе socket должен лежать айди игрока
// и по каждому айди мы должны его рисовать
import {game, gameState, lastState} from "./script/game/model.mjs";
import {drawPoints, createPoints} from "./script/point/point.mjs";
import {botMovement, drawBot, createBots, initBotAnimation} from "./script/bot/bot.mjs";
import {
    handleInput,
    createPlayers,
    getMyPlayer,
    initPlayerAnimation,
    findPlayerBySocketId,
    updatePlayer
} from "./script/player/player.mjs";
import {SCORE, score} from "./script/score/model.mjs";
import {drawFinalScore, drawScore, fadeOutScore} from "./script/score/score.mjs";
import {countdown, drawBackground, updateEntities} from "./script/game/game.mjs";
import {checkCollisions} from "./controller/bounds.mjs";
import {drawCharacters} from "./view.mjs";
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
    activeBots = createBots(requiredBots);
    createPoints();
    initBotAnimation();
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
    dataExchange(dt);
    checkCollisions();
    updateEntities(dt);
}

export function main() {
    let now = Date.now();
    let dt = (now - lastState.lastTime) / 1000.0;
    if (score.getTeam1() < 3 && score.getTeam2() < 3) {
        update(dt);
        render(dt);
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
        socket.emit('redirected');
        sendCookie();
        initPlayers();
        // activePlayers = createPlayers(players, socket_id);
    });
}

function initPlayers() {
    socket.emit('requestForClients');
    socket.on('sendClients', (players) => {
        console.log('sendClients вызван')
        activePlayers = players;
        setPlayerWithIdAsMain(socket.id);
        initPlayerAnimation()
    })
}
function initBots() {
    socket.emit('requestForBots');
    socket.on('sendBots', (bots) => {
        console.log(bots, 'bots from sendBots');
        activeBots = bots;
        initBotAnimation();
    })
}

// Обмен с сервером

function dataExchange(dt) {
    sendDataToServer(dt);
    getDataFromServer();
}
function sendDataToServer(dt) {
    let data = {
        player: getMyPlayer(activePlayers),
        points: points,
        dt: dt
    };
    // Подготовить лазеры к отправке
    // Добавить лазеры и игрока в массив и отправить
    socket.emit('sendDataToServer', data);
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
    socket.on('dataFromServer', (data) => {
        // Получение массива данных
        // извлечение лазеров, ботов, игроков
        updatePlayers(data.players, socket.id);
        updateBots(data.bots);
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
countdown();
init();