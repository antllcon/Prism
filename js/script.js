const canvasWidth = 960;
const canvasHeight = 540;
const red = "#FC0000";
const green = "#00A86B";
const gray = "#666";
const dark = "#333";
const black = "#111";
const lineSize = 300;
const laserWidth = 300;
const DEFAULT_POINTS = [
    {
        id: 0,
        x: 200,
        y: 200,
        width: 10,
        height: 10,
        laserWidth: laserWidth,
        type: 1,
        active: false,
        team: 0,
        color: gray,
        angle: 0,
        existTime: 10000
    },
    {
        id: 1,
        x: 350,
        y: 400,
        width: 10,
        height: 10,
        laserWidth: laserWidth,
        type: 1,
        active: false,
        team: 0,
        color: gray,
        angle: 45,
        existTime: 10000
    },
    {
        id: 2,
        x: 650,
        y: 400,
        width: 10,
        height: 10,
        laserWidth: laserWidth,
        type: 1,
        active: false,
        team: 0,
        color: gray,
        angle: 30,
        existTime: 10000
    },
    {
        id: 3,
        x: 500,
        y: 200,
        width: 10,
        height: 10,
        laserWidth: laserWidth,
        type: 1,
        active: false,
        team: 0,
        color: gray,
        angle: 90,
        existTime: 10000
    }
];

let canvas = document.getElementById("canvas");
let gameTime = 0;
let lastTime;
let timeExist = 5000;
let pointActiveTime = null;
let pointActiveExist = false;
const botStartX = canvasWidth - 50;
const botStartY = canvasHeight/2;
const playerStartX = 50;
const playerStartY = canvasHeight/2;

let GAME = {
    width: canvasWidth,
    height: canvasHeight,
    background: dark
};

let PLAYER = {
    x: 0,
    y: 0,
    size: 10,
    color: 'blue',
    speed: 200,
    team: 'blue',
    isAlive: true
};

let POINTS = DEFAULT_POINTS.map(createPoint);

function createPoint(point) {
    return {
        id: point.id,
        x: point.x,
        y: point.y,
        width: point.width,
        height: point.height,
        laserWidth: point.laserWidth,
        type: point.type,
        active: point.active,
        team: point.team,
        color: point.color,
        angle: point.angle,
        wasActive: false, // новый флаг
        activationTime: null, // время активации
        existTime: point.existTime // время существования для каждого POINT
    };
}

function resetPoint(point, index) {
    const defaultPoint = DEFAULT_POINTS[index];
    point.x = defaultPoint.x;
    point.y = defaultPoint.y;
    point.width = defaultPoint.width;
    point.height = defaultPoint.height;
    point.laserWidth = defaultPoint.laserWidth;
    point.type = defaultPoint.type;
    point.active = defaultPoint.active;
    point.team = defaultPoint.team;
    point.color = defaultPoint.color;
    point.angle = defaultPoint.angle;
    point.wasActive = false;
    point.activeSince = null;
    point.existTime = defaultPoint.existTime;
}

let BOT = {
    x: 0,
    y: 0,
    size: 10,
    color: 'red',
    speed: 200,
    team: 'red', 
    isAlive: true,
    side: 'enemy'
}

// let POINT= {
//     x: 200,
//     y: 200,
//     width: 10,
//     height: 10,
//     laserWidth: 150,
//     type: 1,
//     active: false,
//     team: '',
//     color: gray,
//     angle: 0
// };

let ctx = canvas.getContext("2d");

canvas.width = GAME.width;
canvas.height = GAME.height;

function drawBackground() {
    ctx.fillStyle = GAME.background;
    ctx.fillRect(0, 0, GAME.width, GAME.height);
}

function drawBot() {
    if (BOT.isAlive) {
        ctx.fillStyle = BOT.color;
        ctx.fillRect(BOT.x, BOT.y, BOT.size, BOT.size);
    }
    if (!BOT.isAlive) {
        setTimeout(() => {
            BOT.color = 'red';
            BOT.x = botStartX;
            BOT.y = botStartY;
            BOT.isAlive = true;
        }, 1000)
    }
}

function drawPlayer() {
    if (PLAYER.isAlive === true) {   
        ctx.fillStyle = PLAYER.color;
        ctx.fillRect(PLAYER.x, PLAYER.y, PLAYER.size, PLAYER.size);
    }
    if (PLAYER.isAlive === false) {
        PLAYER.color = 'black';
        setTimeout(() => {
            PLAYER.color = 'blue';
            PLAYER.x = playerStartX;
            PLAYER.y = playerStartY;
            PLAYER.isAlive = true;
          }, 1000);
    }
    
    
}

function drawPoints() {
    POINTS.forEach(point => {
        if (point.type === 1) {
            point.angle += 2 * Math.PI / 180;
            ctx.save();
            ctx.translate(point.x, point.y);
            ctx.rotate(point.angle);
            ctx.fillStyle = point.color;
            ctx.fillRect(-point.width / 2, -point.height / 2, point.width, point.height);
            ctx.restore();
        }
    })
}
function render() {
    ctx.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    drawBot();
    drawPoints();
    drawPlayer();
}

// Инициализация
function init() {
    coordInit();
    drawBackground();
    drawPoints();
    drawBot();
    drawPlayer(); 
    lastTime = Date.now();
    main();
}

function coordInit() {
    PLAYER.x = playerStartX;
    PLAYER.y = playerStartY;
    BOT.x = botStartX;
    BOT.y = botStartY;
}
// Основной цикл
function main() {
    let now = Date.now();
    let dt = (now - lastTime) / 1000.0;
    update(dt);
    render();
    lastTime = now;
    requestAnimFrame(main);
}

function update(dt) {
    gameTime += dt;
    botMovement(dt);
    handleInput(dt);
    checkCollisions();
    updateEntities();
}

function botMovement(dt) {
    let loopIndexInactive = 0; 
    let loopIndexActive = 0; 
    let idInactive;
    let dxMinInactive;
    let dxMinInactiveReversed;
    let dyMinInactive;
    let dyMinInactiveReversed;
    let hypMinInactive;
    let hypMinInactiveReversed;
    
    let idActive;
    let dxMinActive;
    let dyMinActive;
    let hypMinActive;
    let inRangeOfLaser;

    let dxInactive;
    let dxActive;
    let dyInactive;
    let dyActive;
    findNearestPoint(POINTS);

    if (inRangeOfLaser) {
        moveBotOutOfLaserSpiral(); // заночит в dxActive и dyActive приращение для убегания по спирали
    }
    moveBotToLaser(); // заночит в dxInactive и dyInactive приращение для движения к цели
    getRightDirection(); // дает приоритет убеганию, контролирует предельную скорость

    
    function findNearestPoint(POINTS) {
        POINTS.forEach(point => {
            findInactivePointAndCompare(point);
            findActivePointInArea(point);
        });
    }
    function findInactivePointAndCompare(point) {
        if (!point.active) {
            if (loopIndexInactive === 0) {
                idInactive = 0;
                dxMinInactive = point.x - BOT.x;
                dyMinInactive = point.y - BOT.y;
                hypMinInactive = Math.sqrt(dxMinInactive**2 + dyMinInactive**2);
            }
            let dx = point.x - BOT.x;
            let dy = point.y - BOT.y;
            let dxReversed = point.x - BOT.x;
            let dyReversed = point.y - BOT.y;
            let hyp = Math.sqrt(dx**2 + dy**2);
            if (hyp < hypMinInactive) {
                idInactive = point.id;
                dxMinInactive = dx;
                dyMinInactive = dy;
                hypMinInactive = hyp;
            }
            loopIndexInactive++;
        }
    }
    function findActivePointInArea(point) {
        
        if (point.active) {
            if (loopIndexActive === 0) {
                idInactive = 0;
                    dxMinActive = point.x - BOT.x;
                    dyMinActive = point.y - BOT.y;
                    hypMinActive = Math.sqrt(dxMinActive**2 + dyMinActive**2);
            }
            let dx = point.x - BOT.x;
            let dy = point.y - BOT.y;
            let hyp = Math.sqrt(dx**2 + dy**2);
            if (hyp < hypMinActive) {
                idActive = point.id;
                dxMinActive = dx;
                dyMinActive = dy;
                hypMinActive = hyp;
            }
            inRangeOfLaser = (hypMinActive - BOT.size * Math.sqrt(2) < point.laserWidth/2);
            loopIndexActive++;
        }
    }
    function goToNearestPoint() {
        moveBotToLaser();
        if (POINTS[idInactive].active && inRangeOfLaser) {
            // Бот движется по спирали от центра, когда лазер активен и бот в зоне поражения
            moveBotOutOfLaserSpiral();
        } 
        if (POINTS[id].active && !inRangeOfLaser) {
            // Бот движется к точке, когда лазер активен, но бот не в зоне поражения
            moveBotToLaser();
        }
    }
    function moveBotToLaser() {
        dxInactive = BOT.speed * dxMinInactive / hypMinInactive * dt;
        dyInactive = BOT.speed * dyMinInactive / hypMinInactive * dt;
    }
    function moveBotOutOfLaserSpiral() {
        // Определяем угол между ботом и точкой
        const angle = Math.atan2(dyMinActive, dxMinActive);
                
        // Радиальная скорость (от центра прочь)
        const radialSpeed = BOT.speed * dt;

        // Угловая скорость (по окружности)
        const angularSpeed = BOT.speed * dt / hypMinActive;
        // Обновляем координаты бота
        dxActive =  angularSpeed * Math.sin(angle) * hypMinActive - radialSpeed * Math.cos(angle);
        dyActive = (-1) * (radialSpeed * Math.sin(angle) + angularSpeed * Math.cos(angle) * hypMinActive);
    }
    function getRightDirection() {
        if (inRangeOfLaser) {
            if ((dxActive * dxInactive >= 0) && (dyActive * dyInactive >= 0)) {
                if (Math.sqrt((dxActive + dxInactive)**2 + (dyActive + dyInactive)**2) < BOT.speed * dt) {
                    BOT.x += dxActive + dxInactive;
                    BOT.y += dyActive + dyInactive;
                } else {
                    const angle = Math.atan2(dyActive + dyInactive, dxActive + dxInactive);
                    BOT.x += BOT.speed * dt * Math.cos(angle);
                    BOT.y += BOT.speed * dt * Math.sin(angle);
                }
            }
            if ((dxActive * dxInactive >= 0) && (dyActive * dyInactive < 0)) {
                if (Math.sqrt((dxActive + dxInactive)**2 + (dyActive)**2) < BOT.speed * dt) {
                    BOT.x += dxActive + dxInactive;
                    BOT.y += dyActive;
                } else {
                    const angle = Math.atan2(dyActive, dxActive + dxInactive);
                    BOT.x += BOT.speed * dt * Math.cos(angle);
                    BOT.y += BOT.speed * dt * Math.sin(angle);
                }
            }
            if ((dxActive * dxInactive < 0) && (dyActive * dyInactive >= 0)) {
                if (Math.sqrt((dxActive)**2 + (dyActive + dyInactive)**2) < BOT.speed * dt) {
                    BOT.x += dxActive;
                    BOT.y += dyActive + dyInactive;
                } else {
                    const angle = Math.atan2(dyActive + dyInactive, dxActive);
                    BOT.x += BOT.speed * dt * Math.cos(angle);
                    BOT.y += BOT.speed * dt * Math.sin(angle);
                }
            }; 
            if ((dxActive * dxInactive < 0) && (dyActive * dyInactive < 0)) {
                if (Math.sqrt((dxActive)**2 + (dyActive)**2) < BOT.speed * dt) {
                    BOT.x += dxActive;
                    BOT.y += dyActive;
                } else {
                    const angle = Math.atan2(dyActive, dxActive);
                    BOT.x += BOT.speed * dt * Math.cos(angle);
                    BOT.y += BOT.speed * dt * Math.sin(angle);
                }
            }
        } else {
            BOT.x += dxInactive;
            BOT.y += dyInactive;
        }
    }
}

// Обработка нажатой клавиши
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

function checkCollisions() {
    checkBorderGameBounds();
    checkPointBounds();
    checkLaserBounds();
}

function checkBorderGameBounds() {
    // Проверка границ
    if (PLAYER.x < 0) {
        PLAYER.x = GAME.width;
    } else if (PLAYER.x  > GAME.width) {
        PLAYER.x = 0;
    }

   if (PLAYER.y < 0) {
        PLAYER.y = GAME.height;
    } else if (PLAYER.y > GAME.height) {
        PLAYER.y = 0;
    }
    // КОЛЛИЗИЯ СТЕНОК И БОТА
    if (BOT.x < 0) {
        BOT.x = GAME.width;
    } else if (BOT.x  > GAME.width) {
        BOT.x = 0;
    }

   if (BOT.y < 0) {
        BOT.y = GAME.height;
    } else if (BOT.y > GAME.height) {
        BOT.y = 0;
    }
}

function checkPointBounds() {
    POINTS.forEach(point => {
        if (!point.active &&
            point.x + point.width > PLAYER.x &&
            point.x < PLAYER.x + PLAYER.size &&
            point.y + point.height > PLAYER.y &&
            point.y < PLAYER.y + PLAYER.size) {
            point.active = true;
            point.wasActive = true; // обновляем флаг
            point.activationTime = Date.now(); // обновляем время активации
        }
    });
}

function checkLaserBounds() {
    POINTS.forEach(point => {
        if (point.team != PLAYER.team) {
            const sin = Math.sin(point.angle);
            const cos = Math.cos(point.angle);
    
            const playerCorners = [
                {x: PLAYER.x, y: PLAYER.y},
                {x: PLAYER.x + PLAYER.size, y: PLAYER.y},
                {x: PLAYER.x, y: PLAYER.y + PLAYER.size},
                {x: PLAYER.x + PLAYER.size, y: PLAYER.y + PLAYER.size}
            ];
    
            for (const corner of playerCorners) {
                const dx = corner.x - point.x - point.width / 2;
                const dy = corner.y - point.y - point.height / 2;
    
                const rotatedX = cos * dx + sin * dy;
                const rotatedY = -sin * dx + cos * dy;
    
                if (rotatedX > -point.width / 2 && rotatedX < point.width / 2 &&
                    rotatedY > -point.height / 2 && rotatedY < point.height / 2) {
                    PLAYER.isAlive = false;
                }
            }
        }
    });
}

function updateEntities() {
    POINTS.forEach(point => {
        if (point.active) {
            if (point.team === 0) {
                // установить вариативность типов
                point.type = 1;
                point.team = PLAYER.team;
                point.width = lineSize;
            }
            if (point.team === PLAYER.team) {
                point.color = PLAYER.color;
            } else {
                PLAYER.isAlive = 0;
                PLAYER.color = black;
                // в константы
                PLAYER.x = 20;
                PLAYER.y = 20;
                point.color = gray;
            }
            if (!(Date.now() - point.activationTime < point.existTime)) {
                point.active = false;
            }
        } else if (point.wasActive && Date.now() - point.activationTime >= point.existTime) {
            resetPoint(point, POINTS.indexOf(point)); // сброс объекта POINT в исходные значения
        }
    });
}    

// Определение requestAnimFrame
    window.requestAnimFrame = window.requestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };

    init();
