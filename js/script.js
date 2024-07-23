// в константе socket должен лежать айди игрока
// и по каждому айди мы должны его рисовать
// import {game, gameState, lastState} from "./script/game/model.js";
// import {drawPoints, createPoints} from "./script/point/point.js";
// import {botMovement, drawBot, createBots, initBotAnimation, updateBots} from "./script/bot/bot.js";
// import {
//     handleInput,
//     createPlayers,
//     getMyPlayer,
//     initPlayerAnimation,
//     findPlayerBySocketId,
//     updatePlayers
// } from "./script/player/player.js";
// import { Player } from "./script/player/model.js";
// import {SCORE, score} from "./script/score/model.js";
// import {drawFinalScore, drawScore, fadeOutScore} from "./script/score/score.js";
// import {countdown, drawBackground, updateEntities} from "./script/game/game.js";
// import {checkCollisions} from "./controller/bounds.js";
// import {drawCharacters} from "./view.js";
// import {io} from "socket.io-client";
// import {drawBonuses, initBonuses} from "./script/bonuses/bonus.ts";

const game = require('./script/game/model.js');
const gameState = require('./script/game/model.js');
const lastState = require('./script/game/model.js');

const drawPoints = require('./script/point/point.js');
const createPoints = require('./script/point/point.js');

const botMovement = require('./script/point/point.js');
const drawBot = require('./script/point/point.js');
const createBots = require('./script/point/point.js');
const initBotAnimation = require('./script/point/point.js');
const updateBots = require('./script/point/point.js');

const handleInput = require('./script/player/player.js');
const createPlayers = require('./script/player/player.js');
const getMyPlayer = require('./script/player/player.js');
const initPlayerAnimation = require('./script/player/player.js');
const findPlayerBySocketId = require('./script/player/player.js');
const updatePlayers = require('./script/player/player.js');

const Player = require('./script/player/model.js');

const SCORE = require('./script/score/model.js');
const score = require('./script/score/model.js');

const drawFinalScore = require('./script/score/score.js');
const drawScore = require('./script/score/score.js');
const fadeOutScore = require('./script/score/score.js');

const countdown = require('./script/game/game.js');
const drawBackground = require('./script/game/game.js');
const updateEntities = require('./script/game/game.js');

const checkCollisions = require('./controller/bounds.js');

const drawCharacters = require('./view.js');

const io = require('socket.io-client');

const drawBonuses = require('./script/bonuses/bonus.ts');
const initBonuses = require('./script/bonuses/bonus.ts');




let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = game.getWidth();
canvas.height = game.getHeight();
const socket = io();

let activePlayers = [];
let points = [];
let bonuses = [];
let requiredBots = [2, 3];
let activeBots = [];

module.exports = ctx, activePlayers, points, bonuses, requiredBots, activeBots,
    readyBonuses, main;

const players = ['1'];
const socket_id = '1';

let lastBonusAddTime = 0;
const bonusAddInterval = 3;
let readyBonuses = [];
let bonusIndex = 0;

function init() {
    connect();
    activeBots = createBots(requiredBots);
    bonuses = initBonuses();
    createPoints();
    initBotAnimation();
}

function render() {
    ctx.clearRect(0, 0, game.getWidth(), game.getHeight());
    drawBackground();
    drawScore();
    drawBonuses();
    drawPoints();
    drawCharacters(activePlayers.concat(activeBots));
}

function update(dt) {
    gameState.gameTime += dt;
    botMovement(dt);
    handleInput(dt);
    dataExchange();
    checkCollisions(readyBonuses);
    updateEntities(dt);
    lastBonusAddTime += dt;
    if (lastBonusAddTime >= bonusAddInterval) {
        if (bonusIndex < bonuses.length) {
            readyBonuses.push(bonuses[bonusIndex]); // Добавляем бонус в readyBonuses
            bonusIndex++; // Увеличиваем индекс для следующего бонуса
        } else {
            console.log("No more bonuses to add.");
        }
        lastBonusAddTime = 0; // Сбрасываем таймер
    }

}

function main() {
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
        initBots();
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

function dataExchange() {
    sendDataToServer();
    getDataFromServer();
}
function sendDataToServer() {
    let data;
    let myPlayer = getMyPlayer(activePlayers);
    data['player'] = myPlayer;
    // let transmittedPlayer = prepTransmittedPlayer(myPlayer);
    // Подготовить лазеры к отправке
    data['points'] = points;
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
        updatePlayers(data['players'], socket.id);
        updateBots(data['bots']);
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