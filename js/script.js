import {game} from "./script/game/model";

import {drawPoints, createPoints, initPointAnimation} from "./script/point/point";
import {initBotAnimation} from "./script/bot/bot";
import {
    handleInput,
    getMyPlayer,
    initPlayerAnimation,
    updatePlayers,
    setPlayerWithIdAsMain
} from "./script/player/player";
import {drawScore, fadeOutScore} from "./script/score/score";
import {updateEntities} from "./script/game/game";
import {checkCollisions} from "./controller/bounds";
import {drawCharacters} from "./view";
import {io} from "socket.io-client";
import {drawBonuses, initBonuses} from "./script/bonuses/bonus";
import {GAME_STATES, GAME_TIME, LAST_TIME} from "./script/game/const";

let canvas = document.getElementById("canvas");
export let ctx = canvas.getContext("2d");
canvas.width = game.getWidth();
canvas.height = game.getHeight();
export const socket = io();

export let activePlayers = [];
export let points = [];
export let bonuses = [];
export let readyBonuses = [];
export let requiredBots = [2, 3];
export let activeBots = [];


let lastBonusAddTime = 0;
const bonusAddInterval = 3;
let bonusIndex = 0;

function init() {
    connect();
}

function render() {
    ctx.clearRect(0, 0, game.getWidth(), game.getHeight());
    drawScore();
    drawBonuses();
    drawPoints();
    drawCharacters(activePlayers.concat(activeBots));
}

function update(dt, now) {
    if (game.getState() === GAME_STATES.PLAY) {
        // botMovement(dt);
        handleInput(dt);
        dataExchange(dt);
        checkCollisions(readyBonuses);
    }
    updateEntities(dt, now);

    // перенести
    //отрисовка через readybonuses
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

export function main() {
    let now = Date.now();
    let dt = (now - LAST_TIME.lastTime) / 1000.0;
    GAME_TIME.gameTime += dt;
    update(dt, now);
    render();
    LAST_TIME.lastTime = now;
    requestAnimFrame(main);
}


function connect() {
    socket.on('connect', () => {
        //console.log('Connected to server with id:', socket.id);
        socket.emit('redirected');
        sendCookie();
        initPlayers();
        initBots();
        initServerBonuses();
    });
}


//initBotAnimation(); bonuses

function initServerBonuses() {
    socket.emit('requestForBonuses');
    socket.on('sendBonuses', (serverBonuses) => {
        // console.log('sendBonuses вызван')
        bonuses = serverBonuses;
        // console.log(bonuses, 'before classes')

        bonuses = initBonuses(bonuses);
        //console.log(bonuses)

    })
}

function initPlayers() {
    socket.emit('requestForPlayers');
    //console.log('sendPlayers не вызван');
    socket.on('sendPlayers', (players) => {
        activePlayers = players;
        setPlayerWithIdAsMain(socket.id);
        initPlayerAnimation();
        createPoints();
        initPointAnimation();
        console.log("init закончился");
        main();
    });
}

function initBots() {
    socket.emit('requestForBots');
    socket.on('sendBots', (bots) => {
        //console.log(bots, 'bots from sendBots');
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
        bonuses: readyBonuses,
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
        activeBots = data.bots;
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
    // console.log(document.cookie, 'document.cookie');
    // Отправляем куки на сервер
    socket.emit('sentCookie', cookieValue);
}

setTimeout(fadeOutScore, 6800);
// countdown();
init();