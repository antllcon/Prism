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

let canvas = document.getElementById("canvas");
export let ctx = canvas.getContext("2d");
canvas.width = GAME.width;
canvas.height = GAME.height;

function render() {
    ctx.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    drawScore();
    drawPoints();
    drawPlayer();
    drawBot();
}

function createPlayers(players, myId) {
    let activePlayers = [];
    for (let i = 0; i < players.length; i++) {
        activePlayers[i] = new Player(i, players[i], myId);
    }
    return activePlayers
}

let activePlayers = [];

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
    initPlayers();
    cordInit();
    drawBackground();
    drawScore();
    drawPoints();
    drawPlayer();
    drawPlayerEntity(activePlayers);
    drawBot();
    countdown();
}

function connect() {
    socket.on('connect', () => {
        //на room is full событие
        // let player = getMyPlayer(activePlayers)
        console.log('Connected to server with id:', socket.id);
        // let transPlayer = {
        //     team: player.getTeam(),
        //     color: player.getColor(),
        //     x: player.getX(),
        //     socket_id: socket.id
        // }
        // console.log(transPlayer)
    });
}

function initPlayers() {
    socket.on('roomIsReady', (players) => {
        activePlayers = createPlayers(players, socket.id);
    })
}

function countdown() {
    // let inputTime = Date.now();
    let background = document.createElement("div");
    let countdownGif = document.createElement("img");
    document.body.appendChild(background);
    background.classList.add('background-countdown');
    background.appendChild(countdownGif);
    //countdownGif.src = "src/img/cat.gif";
    //countdownAudio.play();
    setTimeout(() => {
        //gameThemeAudio.play();
        background.remove();
        countdownGif.remove();
        lastTime = Date.now();
        main();
    }, 4200)
}

function cordInit() {
    //для класса бесполезно
    PLAYER.x = playerStartX;
    PLAYER.y = playerStartY;
    BOT.x = botStartX;
    BOT.y = botStartY;
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

function main() {
    let now = Date.now();
    let dt = (now - lastTime) / 1000.0;
    update(dt);
    sendDataToServer();
    getDataFromServer();
    render();
    lastTime = now;
    requestAnimFrame(main);
}

function update(dt) {
    gameTime += dt;
    botMovement(dt);
    //handleInput(dt);
    handleEntityPlayerInput(dt);
    checkCollisions();
    updateEntities(dt);
}

//это для let player
function handleInput(dt) {
    if (input.isDown('LEFT') || input.isDown('a')) {
        PLAYER.x -= PLAYER.speed * dt;
    }
    if (input.isDown('RIGHT') || input.isDown('d')) {
        PLAYER.x += PLAYER.speed * dt;
    }
    if (input.isDown('DOWN') || input.isDown('s')) {
        PLAYER.y += PLAYER.speed * dt;
    }
    if (input.isDown('UP') || input.isDown('w')) {
        PLAYER.y -= PLAYER.speed * dt;
    }
}
//это для class player
function handleEntityPlayerInput(dt) {
    const player = getMyPlayer(activePlayers);
    if (input.isDown('LEFT') || input.isDown('a')) {
        player.moveOn(player.getSpeed() * dt * (-1), 0)
    }
    if (input.isDown('RIGHT') || input.isDown('d')) {
        player.moveOn(player.getSpeed() * dt, 0)
    }
    if (input.isDown('DOWN') || input.isDown('s')) {
        player.moveOn(0,player.getSpeed() * dt )
    }
    if (input.isDown('UP') || input.isDown('w')) {
        console.log(dt, "dt undefined")
        player.moveOn(0,player.getSpeed() * dt * (-1))
    }
}


function checkLaserBounds() {

    POINTS.forEach(point => {
        let player = getMyPlayer(activePlayers);
        const sin = Math.sin(point.angle);
        const cos = Math.cos(point.angle);

        /*const playerCorners = [
            {x: PLAYER.x, y: PLAYER.y},
            {x: PLAYER.x + PLAYER.size, y: PLAYER.y},
            {x: PLAYER.x, y: PLAYER.y + PLAYER.size},
            {x: PLAYER.x + PLAYER.size, y: PLAYER.y + PLAYER.size}
        ];*/
        // в будущем
        const playerCorners = [
            {x: player.getX(), y: player.getY()},
            {x: player.getX() + player.getSize(), y: player.getY()},
            {x: player.getX(), y: player.getY() + player.getSize()},
            {x: player.getX() + player.getSize(), y: player.getY() + player.getSize()}
        ];

        const botCorners = [
            {x: BOT.x, y: BOT.y},
            {x: BOT.x + BOT.size, y: BOT.y},
            {x: BOT.x, y: BOT.y + BOT.size},
            {x: BOT.x + BOT.size, y: BOT.y + BOT.size}
        ];

        for (const corner of playerCorners) {
            // расчитываем удаленность угловой точки игрока от центра лазера
            const dx = corner.x - point.x;
            const dy = corner.y - point.y;

            // переводим удаленность в систему координат вращения лазера
            const rotatedX = cos * dx + sin * dy;
            const rotatedY = -sin * dx + cos * dy;

            // смотрим на положение, делаем выводы относительно каждого состояния лазера
            // и так ищем коллизию игрока с лазером

            // Если точка принимает неактивное состояние
            // Активация лазера
            if (point.state === POINT_STATES.INACTIVE &&
                rotatedX > -point.width / 2 && rotatedX < point.width / 2 &&
                rotatedY > -point.height / 2 && rotatedY < point.height / 2) {
                //laserAppearanceAudio.play();
                point.state = POINT_STATES.ACTIVE;
                // point.team = PLAYER.team; // Убедитесь, что присваивается команда игрока
                point.team = player.getTeam();
                point.activationTime = Date.now();
            }

            // Проверка коллизий с лазерами
            if (point.state === POINT_STATES.ACTIVE) {
                if (point.type === POINT_TYPES.CROSS && point.team !== player.getTeam()) { // Крест
                    if ((Math.abs(rotatedX) < point.size / 2 && Math.abs(rotatedY) < point.width / 2) ||
                        (Math.abs(rotatedY) < point.size / 2 && Math.abs(rotatedX) < point.width / 2)) {
                        player.die();
                    }
                }
                if (point.type === POINT_TYPES.TRIGRAPH && point.team !== player.getTeam()) { // Три-радиус
                    const angles = [0, 2 * Math.PI / 3, -2 * Math.PI / 3]; // 0, 120, -120 углы

                    angles.forEach(angle => {
                        const angleSin = Math.sin(angle);
                        const angleCos = Math.cos(angle);

                        const rotatedRayX = angleCos * rotatedX - angleSin * rotatedY;
                        const rotatedRayY = angleSin * rotatedX + angleCos * rotatedY;

                        if (rotatedRayX > 0 && rotatedRayX < point.size / 2 && Math.abs(rotatedRayY) < point.height / 2) {
                            player.die();
                        }
                    });
                }
                if (point.type === POINT_TYPES.LINE && point.team !== player.getTeam()) { // Прямая линия (горизонтальная)
                    if (corner.y >= point.y - point.width / 2 && corner.y <= point.y + point.width / 2 &&
                        corner.x >= point.x - point.size / 2 && corner.x <= point.x + point.size / 2) {
                        player.die();
                    }
                }
            }
        }
        for (const corner of botCorners) {
            // расчитываем удаленность угловой точки игрока от центра лазера
            const dx = corner.x - point.x;
            const dy = corner.y - point.y;

            // переводим удаленность в систему координат вращения лазера
            const rotatedX = cos * dx + sin * dy;
            const rotatedY = -sin * dx + cos * dy;

            // смотрим на положение, делаем выводы относительно каждого состояния лазера
            // и так ищем коллизию игрока с лазером

            // Если точка принимает неактивное состояние
            if (point.state === POINT_STATES.INACTIVE &&
                rotatedX > -point.width / 2 && rotatedX < point.width / 2 &&
                rotatedY > -point.height / 2 && rotatedY < point.height / 2) {
                //laserAppearanceAudio.play();
                point.state = POINT_STATES.ACTIVE;
                point.team = BOT.team; // Убедитесь, что присваивается команда бота
                point.activationTime = Date.now();
            }

            // Проверка коллизий с лазерами
            if (point.state === POINT_STATES.ACTIVE) {
                if (point.type === POINT_TYPES.CROSS && point.team !== BOT.team) { // Крест
                    if ((Math.abs(rotatedX) < point.size / 2 && Math.abs(rotatedY) < point.width / 2) ||
                        (Math.abs(rotatedY) < point.size / 2 && Math.abs(rotatedX) < point.width / 2)) {
                        BOT.state = BOT_STATES.DEAD;
                    }
                }
                if (point.type === POINT_TYPES.TRIGRAPH && point.team !== BOT.team) { // Три-радиус
                    const angles = [0, 2 * Math.PI / 3, -2 * Math.PI / 3]; // 0, 120, -120 углы

                    angles.forEach(angle => {
                        const angleSin = Math.sin(angle);
                        const angleCos = Math.cos(angle);

                        const rotatedRayX = angleCos * rotatedX - angleSin * rotatedY;
                        const rotatedRayY = angleSin * rotatedX + angleCos * rotatedY;

                        if (rotatedRayX > 0 && rotatedRayX < point.size / 2 && Math.abs(rotatedRayY) < point.height / 2) {
                            BOT.state = BOT_STATES.DEAD;
                        }
                    });
                }
                if (point.type === POINT_TYPES.LINE && point.team !== BOT.team) { // Прямая линия (горизонтальная)
                    if (corner.y >= point.y - point.width / 2 && corner.y <= point.y + point.width / 2 &&
                        corner.x >= point.x - point.size / 2 && corner.x <= point.x + point.size / 2) {
                        BOT.state = BOT_STATES.DEAD;
                    }
                }
            }
        }
    });
}

function checkCollisions() {
    checkBorderGameBounds();
    checkLaserBounds();
}

function checkBorderGameBounds() {
    //переделываем на класс player
    // Проход через границы поля для ИГРОКА
    let player = getMyPlayer(activePlayers);
    if (player.getX() < 0) {
        player.setX(GAME.width - player.getSize());
    } else if (player.getX() + player.getSize() > GAME.width) {
        player.setX(0)
    }

    if (player.getY() < 0) {
        player.setY(GAME.height - player.getSize());
    } else if (player.getY + player.getSize() > GAME.height) {
        player.setY(0)  ;
    }

    // Проход через границы поля БОТА
    if (BOT.x < 0) {
        BOT.x = GAME.width - BOT.size;
    } else if (BOT.x + BOT.size > GAME.width) {
        BOT.x = 0;
    }

    if (BOT.y < 0) {
        BOT.y = GAME.height - BOT.size;
    } else if (BOT.y + BOT.size > GAME.height) {
        BOT.y = 0;
    }
}

function updateEntities(dt) {
    POINTS.forEach(point => {
        if (point.state === POINT_STATES.ACTIVE) {
            if (Date.now() - point.activationTime < point.existTime) {
                if (point.team === PLAYER.team) {
                    point.color = PLAYER.color;
                    point.height = 5;
                }
                if (point.team === BOT.team) {
                    point.color = BOT.color;
                    point.height = 5;
                }
            } else {
                point.state = POINT_STATES.INACTIVE;
                resetPoint(point, POINTS.indexOf(point));
            }
        }
        if (point.state === POINT_STATES.INACTIVE) {

        }
        if (point.state === POINT_STATES.INVISIBLE) {
            updateVisibilityPoints(point);
        }
        if (point.state === POINT_STATES.ACTIVE || point.state === POINT_STATES.INACTIVE) {
            movePoint(point, dt);
        }
    })
    if (PLAYER.state === PLAYER_STATES.STUNNED) {
        PLAYER.x = 30;
        PLAYER.y = 30;
    }
}

window.requestAnimFrame = window.requestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60);
};

setTimeout(fadeOutScore, 6800);
init();


//инициализоровать по айди
//и отрисовать по айди переходя в цикле по массиву
//внести в инит, и игровой цикл




// let canvas = document.getElementById("canvas");
// export let gameTime = 0;
// let lastTime;

//вынесла весь код по объявлению аудио в countdownAudio
//остальной закомментировала (laser Appearance)
//


// const botStartX = canvasWidth - 50;
// const botStartY = canvasHeight / 2;
// const playerStartX = 50;
// const playerStartY = canvasHeight / 2;
//
// let PLAYER = {
//     x: 30,
//     y: 30,
//     size: 10,
//     speed: 300,
//     team: TEAM_STATES.PURPLE,
//     color: black,
//     state: PLAYER_STATES.ACTIVE
// };
//
// let ctx = canvas.getContext("2d");
//


//
// function drawBackground() {
//     ctx.fillStyle = GAME.background;
//     ctx.fillRect(0, 0, GAME.width, GAME.height);
// }

// function drawBot() {
//     if (BOT.team === TEAM_STATES.PURPLE) {
//         PLAYER.color = yellow;
//     }
//     if (PLAYER.team === TEAM_STATES.YELLOW) {
//         PLAYER.color = purple;
//     }
//     if (BOT.state === BOT_STATES.ACTIVE) {
//         ctx.fillStyle = BOT.color;
//         ctx.fillRect(BOT.x, BOT.y, BOT.size, BOT.size);
//     }
//     if (BOT.state === BOT_STATES.DEAD) {
//         setTimeout(() => {
//             BOT.color = yellow;
//             BOT.x = botStartX;
//             BOT.y = botStartY;
//             BOT.state = BOT_STATES.ACTIVE;
//         }, 1000)
//     }
// }

// function drawPlayer() {
//     if (PLAYER.state === PLAYER_STATES.ACTIVE) {
//         if (PLAYER.team === TEAM_STATES.PURPLE) {
//             PLAYER.color = purple;
//         }
//         if (PLAYER.team === TEAM_STATES.YELLOW) {
//             PLAYER.color = yellow;
//         }
//         ctx.fillStyle = PLAYER.color;
//         ctx.fillRect(PLAYER.x, PLAYER.y, PLAYER.size, PLAYER.size);
//     }
//     if (PLAYER.state === PLAYER_STATES.DEAD) {
//         setTimeout(() => {
//             PLAYER.color = purple;
//             PLAYER.x = 10;
//             PLAYER.y = 10;
//             PLAYER.state = PLAYER_STATES.ACTIVE;
//         }, 1000);
//     }
// }
//
// function drawPlayerEntity(activePlayers) {
//     activePlayers.forEach(player => {
//         if (player.isAlive()) {
//             ctx.fillStyle = player.getColor;
//             ctx.fillRect(player.getX(), player.getY(), player.getSize(), player.getSize());
//         }
//         if (player.isDead()) {
//             setTimeout(() => {
//                 player.setColor(green);
//                 player.setX(10);
//                 player.setY(10);
//                 player.renaissance();
//             }, 1000); // Changed delay to 1000ms
//         }
//     })
// }




// function render() {
//     ctx.clearRect(0, 0, GAME.width, GAME.height);
//     drawBackground();
//     drawPoints();
//     drawPlayer();
//     drawPlayerEntity(activePlayers);
//     drawBot();
// }
//
// function createPlayers() {
//     let activePlayers = []
//     //socket.on('roomIsReady', (socketIds) => {
//     let socket = {
//         //костыль
//         id: socketIds[0].id
//     }
//     for (let i = 0; i < socketIds.length; i++) {
//         activePlayers[i] = new Player(i, socketIds[i].id, socket.id);
//
//     }
//     //})
//     return activePlayers
// }
//
// let activePlayers = [];
//
//
// function init() {
//     cordInit();
//     drawBackground();
//     drawPoints();
//     drawPlayer();
//     activePlayers = createPlayers();
//     drawPlayerEntity(activePlayers);
//     //drawBot();
//     countdown();
// }
//
// function countdown() {
//     // let inputTime = Date.now();
//     let background = document.createElement("div");
//     let countdownGif = document.createElement("img");
//     document.body.appendChild(background);
//     background.classList.add('background-countdown');
//     background.appendChild(countdownGif);
//     //countdownGif.src = "src/img/cat.gif";
//     //countdownAudio.play();
//     setTimeout(() => {
//         //gameThemeAudio.play();
//         background.remove();
//         countdownGif.remove();
//         lastTime = Date.now();
//         main();
//     }, 4200)
// }
//
// function cordInit() {
//     PLAYER.x = playerStartX;
//     PLAYER.y = playerStartY;
//     BOT.x = botStartX;
//     BOT.y = botStartY;
// }
//
// function main() {
//     let now = Date.now();
//     let dt = (now - lastTime) / 1000.0;
//     update(dt);
//     render();
//     lastTime = now;
//     requestAnimFrame(main);
// }
//
// function update(dt) {
//     gameTime += dt;
//     botMovement(dt);
//     //handleInput(dt);
//     handleEntityPlayerInput(dt);
//     checkCollisions();
//     updateEntities(dt);
// }
//
// function botMovement(dt) {
//     let loopIndexInactive = 0;
//     let loopIndexActive = 0;
//     let idInactive;
//     let dxMinInactive;
//     let dyMinInactive;
//     let hypMinInactive;
//
//     let idActive;
//     let dxMinActive;
//     let dyMinActive;
//     let hypMinActive;
//     let inRangeOfLaser;
//
//     let dxInactive;
//     let dxActive;
//     let dyInactive;
//     let dyActive;
//     findNearestPoint(POINTS);
//     if (inRangeOfLaser) {
//         moveBotOutOfLaserSpiral(); // заносит в dxActive и dyActive приращение для убегания по спирали
//     }
//     moveBotToLaser(); // заносит в dxInactive и dyInactive приращение для движения к цели
//     getRightDirection(); // дает приоритет убеганию, контролирует предельную скорость
//
//
//     function findNearestPoint(POINTS) {
//         POINTS.forEach(point => {
//             findInactivePointAndCompare(point);
//             findActivePointInArea(point);
//         });
//     }
//
//     function findInactivePointAndCompare(point) {
//         if (point.state === POINT_STATES.INACTIVE) {
//             if (loopIndexInactive === 0) {
//                 idInactive = 0;
//                 dxMinInactive = point.x - BOT.x;
//                 dyMinInactive = point.y - BOT.y;
//                 hypMinInactive = Math.sqrt(dxMinInactive ** 2 + dyMinInactive ** 2);
//             }
//             let dy;
//             let dx;
//
//             if (Math.abs(point.y + (GAME.height - BOT.y)) < Math.abs(point.y - BOT.y)) {
//                 dy = point.y + (GAME.height - BOT.y);
//             } else {
//                 dy = point.y - BOT.y;
//             }
//             if (Math.abs(point.x + (GAME.width - BOT.x)) < Math.abs(point.x - BOT.x)) {
//                 dx = point.x + (GAME.width - BOT.x);
//             } else {
//                 dx = point.x - BOT.x;
//             }
//             let hyp = Math.sqrt(dx ** 2 + dy ** 2);
//             if (hyp < hypMinInactive) {
//                 idInactive = point.id;
//                 dxMinInactive = dx;
//                 dyMinInactive = dy;
//                 hypMinInactive = hyp;
//             }
//             loopIndexInactive++;
//         }
//     }
//
//     function findActivePointInArea(point) {
//
//         if (point.state === POINT_STATES.ACTIVE) {
//             if (loopIndexActive === 0) {
//                 idInactive = 0;
//                 dxMinActive = point.x - BOT.x;
//                 dyMinActive = point.y - BOT.y;
//                 hypMinActive = Math.sqrt(dxMinActive ** 2 + dyMinActive ** 2);
//             }
//             let dx = point.x - BOT.x;
//             let dy = point.y - BOT.y;
//             let hyp = Math.sqrt(dx ** 2 + dy ** 2);
//             if (hyp < hypMinActive) {
//                 idActive = point.id;
//                 dxMinActive = dx;
//                 dyMinActive = dy;
//                 hypMinActive = hyp;
//             }
//             inRangeOfLaser = (hypMinActive - BOT.size * Math.sqrt(2) < point.size / 2);
//             loopIndexActive++;
//         }
//     }
//
//     function moveBotToLaser() {
//         dxInactive = BOT.speed * dxMinInactive / hypMinInactive * dt;
//         dyInactive = BOT.speed * dyMinInactive / hypMinInactive * dt;
//     }
//
//     function moveBotOutOfLaserSpiral() {
//         // Определяем угол между ботом и точкой
//         const angle = Math.atan2(dyMinActive, dxMinActive);
//
//         // Радиальная скорость (от центра прочь)
//         const radialSpeed = BOT.speed * dt;
//
//         // Угловая скорость (по окружности)
//         const angularSpeed = BOT.speed * dt / hypMinActive;
//         // Обновляем координаты бота
//         dxActive = angularSpeed * Math.sin(angle) * hypMinActive - radialSpeed * Math.cos(angle);
//         dyActive = (-1) * (radialSpeed * Math.sin(angle) + angularSpeed * Math.cos(angle) * hypMinActive);
//     }
//
//     function getRightDirection() {
//         if (inRangeOfLaser) {
//             if ((dxActive * dxInactive >= 0) && (dyActive * dyInactive >= 0)) {
//                 if (Math.sqrt((dxActive + dxInactive) ** 2 + (dyActive + dyInactive) ** 2) < BOT.speed * dt) {
//                     BOT.x += dxActive + dxInactive;
//                     BOT.y += dyActive + dyInactive;
//                 } else {
//                     const angle = Math.atan2(dyActive + dyInactive, dxActive + dxInactive);
//                     BOT.x += BOT.speed * dt * Math.cos(angle);
//                     BOT.y += BOT.speed * dt * Math.sin(angle);
//                 }
//             }
//             if ((dxActive * dxInactive >= 0) && (dyActive * dyInactive < 0)) {
//                 if (Math.sqrt((dxActive + dxInactive) ** 2 + (dyActive) ** 2) < BOT.speed * dt) {
//                     BOT.x += dxActive + dxInactive;
//                     BOT.y += dyActive;
//                 } else {
//                     const angle = Math.atan2(dyActive, dxActive + dxInactive);
//                     BOT.x += BOT.speed * dt * Math.cos(angle);
//                     BOT.y += BOT.speed * dt * Math.sin(angle);
//                 }
//             }
//             if ((dxActive * dxInactive < 0) && (dyActive * dyInactive >= 0)) {
//                 if (Math.sqrt((dxActive) ** 2 + (dyActive + dyInactive) ** 2) < BOT.speed * dt) {
//                     BOT.x += dxActive;
//                     BOT.y += dyActive + dyInactive;
//                 } else {
//                     const angle = Math.atan2(dyActive + dyInactive, dxActive);
//                     BOT.x += BOT.speed * dt * Math.cos(angle);
//                     BOT.y += BOT.speed * dt * Math.sin(angle);
//                 }
//             }
//             if ((dxActive * dxInactive < 0) && (dyActive * dyInactive < 0)) {
//                 if (Math.sqrt((dxActive) ** 2 + (dyActive) ** 2) < BOT.speed * dt) {
//                     BOT.x += dxActive;
//                     BOT.y += dyActive;
//                 } else {
//                     const angle = Math.atan2(dyActive, dxActive);
//                     BOT.x += BOT.speed * dt * Math.cos(angle);
//                     BOT.y += BOT.speed * dt * Math.sin(angle);
//                 }
//             }
//         } else {
//             BOT.x += dxInactive;
//             BOT.y += dyInactive;
//         }
//     }
// }
//
// function handleInput(dt) {
//     if (input.isDown('LEFT') || input.isDown('a')) {
//         PLAYER.x -= PLAYER.speed * dt;
//     }
//     if (input.isDown('RIGHT') || input.isDown('d')) {
//         PLAYER.x += PLAYER.speed * dt;
//     }
//     if (input.isDown('DOWN') || input.isDown('s')) {
//         PLAYER.y += PLAYER.speed * dt;
//     }
//     if (input.isDown('UP') || input.isDown('w')) {
//         PLAYER.y -= PLAYER.speed * dt;
//     }
// }
//
// function handleEntityPlayerInput(dt) {
//     const player = getMyPlayer(activePlayers);
//     console.log(player)
//     if (input.isDown('LEFT') || input.isDown('a')) {
//         player.moveOn(player.getSpeed() * dt * (-1), 0)
//     }
//     if (input.isDown('RIGHT') || input.isDown('d')) {
//         player.moveOn(player.getSpeed() * dt, 0)
//     }
//     if (input.isDown('DOWN') || input.isDown('s')) {
//         player.moveOn(0,player.getSpeed() * dt )
//     }
//     if (input.isDown('UP') || input.isDown('w')) {
//         console.log(dt, "dt undefined")
//         player.moveOn(0,player.getSpeed() * dt * (-1))
//     }
// }