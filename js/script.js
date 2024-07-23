// в константе socket должен лежать айди игрока
// и по каждому айди мы должны его рисовать
import {game, gameState, lastState} from "./script/game/model";
import {drawPoints, createPoints} from "./script/point/point";
import {botMovement, drawBot, createBots, initBotAnimation, updateBots} from "./script/bot/bot";
import {
    handleInput,
    createPlayers,
    getMyPlayer,
    initPlayerAnimation,
    findPlayerBySocketId,
    updatePlayers,
    setPlayerWithIdAsMain
} from "./script/player/player";
import {SCORE, score} from "./script/score/model";
import {drawFinalScore, drawScore, fadeOutScore} from "./script/score/score";
import {countdown, drawBackground, updateEntities} from "./script/game/game";
import {checkCollisions} from "./controller/bounds";
import {drawCharacters} from "./view";
import {io} from "socket.io-client";
import {drawBonuses, initBonuses} from "./script/bonuses/bonus";

let canvas = document.getElementById("canvas");
export let ctx = canvas.getContext("2d");
canvas.width = game.getWidth();
canvas.height = game.getHeight();
const socket = io();

export let activePlayers = [];
export let points = [];
export let bonuses = [];
export let requiredBots = [2, 3];
export let activeBots = [];


let lastBonusAddTime = 0;
const bonusAddInterval = 3;
export let readyBonuses = [];
let bonusIndex = 0;

function init() {
    connect();
    activeBots = createBots(requiredBots);
    console.log(activeBots);
    console.log('activeBots');
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
    drawCharacters(activePlayers);
    drawCharacters(activeBots);
}

function update(dt) {
    gameState.gameTime += dt;
    // botMovement(dt);
    handleInput(dt);
    dataExchange(dt);
    checkCollisions(readyBonuses);
    updateEntities(dt);
    lastBonusAddTime += dt;
    if (lastBonusAddTime >= bonusAddInterval) {
        if (bonusIndex < bonuses.length) {
            readyBonuses.push(bonuses[bonusIndex]);
            bonusIndex++;
        } else {
            console.log("No more bonuses to add.");
        }
        lastBonusAddTime = 0;
    }

}

export function main() {
    let now = Date.now();
    let dt = (now - lastState.lastTime) / 1000.0;
    if (score.getTeam1() < 3 && score.getTeam2() < 3) {
        update(dt);
        render(dt);
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
        initBots();
        // activePlayers = createPlayers(players, socket_id);
    });
}


function initPlayers() {
    socket.emit('requestForPlayers');
    console.log('sendPlayers не вызван');
    socket.on('sendPlayers', (players) => {
        console.log('sendPlayers вызван')
        activePlayers = players;
        setPlayerWithIdAsMain(socket.id);
        console.log(players, 'players from sendPlayers');
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