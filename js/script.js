const canvasWidth = 960;
const canvasHeight = 540;
const red = "#FC0000";
const green = "#00A86B";
const gray = "#666";
const dark = "#333";
const black = "#111";
const DEFAULT_POINTS = [
    {
        x: 192,
        y: 150,
        width: 10,
        height: 10,
        type: 1,
        active: false,
        team: 0,
        color: gray,
        angle: 0,
        existTime: 10000
    },
    {
        x: 384,
        y: 150,
        width: 10,
        height: 10,
        type: 2,
        active: false,
        team: 0,
        color: gray,
        angle: 0,
        existTime: 10000
    },
    {
        x: 576,
        y: 150,
        width: 10,
        height: 10,
        type: 2,
        active: false,
        team: 0,
        color: gray,
        angle: 0,
        existTime: 10000
    },
    {
        x: 768,
        y: 150,
        width: 10,
        height: 10,
        type: 2,
        active: false,
        team: 0,
        color: gray,
        angle: 0,
        existTime: 10000
    },
    {
        x: 192,
        y: 380,
        width: 10,
        height: 10,
        type: 2,
        active: false,
        team: 0,
        color: gray,
        angle: 0,
        existTime: 10000
    },
    {
        x: 384,
        y: 380,
        width: 10,
        height: 10,
        type: 2,
        active: false,
        team: 0,
        color: gray,
        angle: 0,
        existTime: 10000
    },
    {
        x: 576,
        y: 380,
        width: 10,
        height: 10,
        type: 2,
        active: false,
        team: 0,
        color: gray,
        angle: 0,
        existTime: 10000
    },
    {
        x: 768,
        y: 380,
        width: 10,
        height: 10,
        type: 2,
        active: false,
        team: 0,
        color: gray,
        angle: 0,
        existTime: 10000
    }
];

let canvas = document.getElementById("canvas");
let gameTime = 0;
let lastTime;

let GAME = {
    width: canvasWidth,
    height: canvasHeight,
    background: dark
};

let PLAYER = {
    x: 20,
    y: 20,
    size: 10,
    color: black,
    speed: 200,
    team: 1,
    isAlive: true
};

let POINTS = DEFAULT_POINTS.map(createPoint);

function createPoint(point) {
    return {
        x: point.x,
        y: point.y,
        width: point.width,
        height: point.height,
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
    point.type = defaultPoint.type;
    point.active = defaultPoint.active;
    point.team = defaultPoint.team;
    point.color = defaultPoint.color;
    point.angle = defaultPoint.angle;
    point.wasActive = false;
    point.activeSince = null;
    point.existTime = defaultPoint.existTime;
}

let ctx = canvas.getContext("2d");

canvas.width = GAME.width;
canvas.height = GAME.height;

function drawBackground() {
    ctx.fillStyle = GAME.background;
    ctx.fillRect(0, 0, GAME.width, GAME.height);
}

function drawPlayer() {
    if (PLAYER.isAlive === true) {
        if (PLAYER.team === 1) {
            PLAYER.color = green;
        }
        if (PLAYER.team === 2) {
            PLAYER.color = red;
        }
        ctx.fillStyle = PLAYER.color;
        ctx.fillRect(PLAYER.x, PLAYER.y, PLAYER.size, PLAYER.size);
    }
    if (PLAYER.isAlive === false) {
        setTimeout(() => {
            PLAYER.color = green;
            PLAYER.x = 10;
            PLAYER.y = 10;
            PLAYER.isAlive = true
        }, 1);
    }
}

function drawPoints() {

    POINTS.forEach(point => {
        if (point.active) {
            if (point.type === 1) {
                ctx.fillStyle = point.color;
                ctx.fillRect(point.x, point.y, point.width, point.height);
            }
            if (point.type === 2) {
                point.angle += 2 * Math.PI / 180;
                ctx.save();
                ctx.translate(point.x + point.width / 2, point.y + point.height / 2);
                ctx.rotate(point.angle);
                ctx.fillStyle = point.color;
                ctx.fillRect(-point.width / 2, -point.height / 2, point.width, point.height);
                ctx.restore();
            }
        } else {
            point.angle += 2 * Math.PI / 180;
            ctx.save();
            ctx.translate(point.x + point.width / 2, point.y + point.height / 2);
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
    drawPoints();
    drawPlayer();
}

// Инициализация
function init() {
    drawBackground();
    drawPoints();
    drawPlayer();
    main();
    lastTime = Date.now();
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
    handleInput(dt);
    checkCollisions();
    updateEntities();
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
    } else if (PLAYER.x > GAME.width) {
        PLAYER.x = 0;
    }

    if (PLAYER.y < 0) {
        PLAYER.y = GAME.height;
    } else if (PLAYER.y > GAME.height) {
        PLAYER.y = 0;
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
    });
}


//
// if (point.team === 0) {
//     point.team = PLAYER.team;
//     point.width = lizerSize;
//     point.x = point.x - point.width / 2;
// }
// if (point.team === PLAYER.team) {
//     point.color = PLAYER.color;
// } else {
//     PLAYER.isAlive = 0;
//     PLAYER.color = black;
//     // в константы
//     PLAYER.x = 20;
//     PLAYER.y = 20;
//     point.color = gray;
// }


function updateEntities() {
    POINTS.forEach(point => {
        if (point.active) {
            if (point.team === 0) {
                point.team = PLAYER.team;
            }
            if (point.team === 1) {
                if (point.type === 1) {
                    point.width = laserSize;
                }
            }
            if (!(Date.now() - point.activationTime < point.existTime)) {
                point.active = false;
            }
        } else if (point.wasActive && Date.now() - point.activationTime >= point.existTime) {
            resetPoint(point, POINTS.indexOf(point)); // сброс объекта POINT в исходные значения
        }
    });
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

// Определение requestAnimFrame
window.requestAnimFrame = window.requestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60);
};

init();