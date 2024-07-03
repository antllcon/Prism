const canvasWidth = 960;
const canvasHeight = 540;
const red = "#FC0000";
const green = "#00A86B";
const gray = "#666";
const dark = "#333";
const black = "#111";
const laserWidth = 200;
const GAME_STATES = {
    START: "start",
    PLAY: "play",
    VICTORY: "victory",
    PAUSE: "pause"
}
const PLAYER_STATES = {
    ACTIVE: 'active',
    STUNNED: 'stunned',
    DEAD: 'dead'
}
const POINT_STATES = {
    ACTIVE: 'active',
    INACTIVE: 'inactive'
};
const DEFAULT_POINTS = [
    {
        x: canvasWidth / 2,
        y: 10,
        width: 10,
        height: 10,
        size: 1000,
        type: 3,
        team: 0,
        color: gray,
        angle: 1,
        existTime: 10000,
        state: POINT_STATES.INACTIVE
    },
    {
        x: canvasWidth / 2,
        y: canvasHeight - 10,
        width: 10,
        height: 10,
        size: 1000,
        type: 3,
        team: 0,
        color: gray,
        angle: 1,
        existTime: 10000,
        state: POINT_STATES.INACTIVE
    },
    {
        x: canvasWidth / 4,
        y: canvasHeight / 2,
        width: 10,
        height: 10,
        size: 200,
        type: 2,
        team: 0,
        color: gray,
        angle: 1,
        existTime: 10000,
        state: POINT_STATES.INACTIVE
    },
    {
        x: canvasWidth / 4 * 3,
        y: canvasHeight / 2,
        width: 10,
        height: 10,
        size: 200,
        type: 2,
        team: 0,
        color: gray,
        angle: 1,
        existTime: 10000,
        state: POINT_STATES.INACTIVE
    },
    {
        x: canvasWidth / 2,
        y: canvasHeight / 2,
        width: 10,
        height: 10,
        size: 1000,
        type: 1,
        team: 0,
        color: gray,
        angle: 1,
        existTime: 10000,
        state: POINT_STATES.INACTIVE
    },
    {
        x: canvasWidth * (1 / 5),
        y: canvasHeight - laserWidth / 2 - 20,
        width: 10,
        height: 10,
        size: 300,
        type: 2,
        team: 0,
        color: gray,
        angle: 1,
        existTime: 10000,
        state: POINT_STATES.INACTIVE
    },
    {
        x: canvasWidth * (2 / 5),
        y: canvasHeight - laserWidth / 2 - 20,
        width: 10,
        height: 10,
        size: 300,
        type: 2,
        team: 0,
        color: gray,
        angle: 1,
        existTime: 10000,
        state: POINT_STATES.INACTIVE
    },
    {
        x: canvasWidth * (3 / 5),
        y: canvasHeight - laserWidth / 2 - 20,
        width: 10,
        height: 10,
        size: 300,
        type: 2,
        team: 0,
        color: gray,
        angle: 1,
        existTime: 10000,
        state: POINT_STATES.INACTIVE
    },
    {
        x: canvasWidth * (4 / 5),
        y: canvasHeight - laserWidth / 2 - 20,
        width: 10,
        height: 10,
        size: 300,
        type: 2,
        team: 0,
        color: gray,
        angle: 1,
        existTime: 10000,
        state: POINT_STATES.INACTIVE
    },
    {
        x: canvasWidth * (1 / 5),
        y: laserWidth / 2 + 20,
        width: 10,
        height: 10,
        size: 300,
        type: 2,
        team: 0,
        color: gray,
        angle: 1,
        existTime: 10000,
        state: POINT_STATES.INACTIVE
    },
    {
        x: canvasWidth * (2 / 5),
        y: laserWidth / 2 + 20,
        width: 10,
        height: 10,
        size: 300,
        type: 2,
        team: 0,
        color: gray,
        angle: 1,
        existTime: 10000,
        state: POINT_STATES.INACTIVE
    },
    {
        x: canvasWidth * (3 / 5),
        y: laserWidth / 2 + 20,
        width: 10,
        height: 10,
        size: 300,
        type: 2,
        team: 0,
        color: gray,
        angle: 1,
        existTime: 10000,
        state: POINT_STATES.INACTIVE
    },
    {
        x: canvasWidth * (4 / 5),
        y: laserWidth / 2 + 20,
        width: 10,
        height: 10,
        size: 300,
        type: 2,
        team: 0,
        color: gray,
        angle: 1,
        existTime: 10000,
        state: POINT_STATES.INACTIVE
    },
];

let canvas = document.getElementById("canvas");
let gameTime = 0;
let lastTime;
let GAME = {
    width: canvasWidth,
    height: canvasHeight,
    background: dark,
    state: GAME_STATES.PLAY
};
let PLAYER = {
    x: 30,
    y: 30,
    size: 10,
    speed: 200,
    team: 1,
    color: black,
    state: PLAYER_STATES.ACTIVE
};
let POINTS = DEFAULT_POINTS.map(createPoint);

function createPoint(point) {
    return {
        x: point.x,
        y: point.y,
        width: point.width,
        height: point.height,
        size: point.size,
        type: point.type,
        team: point.team,
        color: point.color,
        angle: point.angle,
        existTime: point.existTime,
        activationTime: null,
        state: point.state,
    };
}

function resetPoint(point, index) {
    const defaultPoint = DEFAULT_POINTS[index];
    point.x = defaultPoint.x;
    point.y = defaultPoint.y;
    point.width = defaultPoint.width;
    point.height = defaultPoint.height;
    point.size = defaultPoint.size;
    point.type = defaultPoint.type;
    point.team = defaultPoint.team;
    point.color = defaultPoint.color;
    point.existTime = defaultPoint.existTime;
    point.activationTime = null;
    point.state = POINT_STATES.INACTIVE;
}

let ctx = canvas.getContext("2d");

canvas.width = GAME.width;
canvas.height = GAME.height;

function drawBackground() {
    ctx.fillStyle = GAME.background;
    ctx.fillRect(0, 0, GAME.width, GAME.height);
}

function drawPlayer() {
    if (PLAYER.state === PLAYER_STATES.ACTIVE) {
        if (PLAYER.team === 1) {
            PLAYER.color = green;
        }
        if (PLAYER.team === 2) {
            PLAYER.color = red;
        }
        ctx.fillStyle = PLAYER.color;
        ctx.fillRect(PLAYER.x, PLAYER.y, PLAYER.size, PLAYER.size);
    }
    if (PLAYER.state === PLAYER_STATES.DEAD) {
        setTimeout(() => {
            PLAYER.color = green;
            PLAYER.x = 10;
            PLAYER.y = 10;
            PLAYER.state = PLAYER_STATES.ACTIVE;
        }, 1000); // Changed delay to 1000ms
    }
}

function drawPoints() {
    POINTS.forEach(point => {
        if (point.state === POINT_STATES.ACTIVE) {
            if (point.type === 1) {
                point.angle += Math.PI / 180;
                ctx.save();

                ctx.translate(point.x, point.y);
                ctx.rotate(point.angle);
                ctx.strokeStyle = point.color;
                ctx.lineWidth = 5;

                ctx.beginPath();
                ctx.moveTo(-point.size / 2, 0);
                ctx.lineTo(point.size / 2, 0);

                ctx.moveTo(0, -point.size / 2);
                ctx.lineTo(0, point.size / 2);
                ctx.stroke();

                ctx.restore();
            }
            if (point.type === 2) {
                point.angle += Math.PI / 180;
                ctx.save();

                ctx.translate(point.x, point.y);
                ctx.rotate(point.angle);
                ctx.strokeStyle = point.color;
                ctx.lineWidth = 5;

                ctx.beginPath();
                ctx.moveTo(point.size / 2, 0);
                ctx.lineTo(0, 0);

                ctx.moveTo(0, 0);
                ctx.lineTo(-point.size / 2 * Math.cos(Math.PI / 3), -point.size / 2 * Math.sin(Math.PI / 3));

                ctx.moveTo(0, 0);
                ctx.lineTo(-point.size / 2 * Math.cos(-Math.PI / 3), -point.size / 2 * Math.sin(-Math.PI / 3));
                ctx.stroke();

                ctx.restore();
            }
            if (point.type === 3) {
                ctx.save();

                ctx.translate(point.x, point.y);
                ctx.strokeStyle = point.color;
                ctx.lineWidth = 5;
                ctx.beginPath();
                ctx.moveTo(point.size, 0);
                ctx.lineTo(-point.size, 0);
                ctx.stroke();

                ctx.restore();
            }

        } else {
            point.angle += Math.PI / 180;
            ctx.save();
            ctx.translate(point.x + point.width / 2, point.y + point.height / 2);
            ctx.rotate(point.angle);
            ctx.fillStyle = point.color;
            ctx.fillRect(-point.width / 2, -point.height / 2, point.width, point.height);
            ctx.restore();
        }
    });
}

function render() {
    ctx.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    drawPoints();
    drawPlayer();
}

function init() {
    drawBackground();
    drawPoints();
    drawPlayer();
    main();
    lastTime = Date.now();
}

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
    checkLaserBounds();
}

function checkBorderGameBounds() {
    (PLAYER.x < 0) ? (PLAYER.x = GAME.width - PLAYER.size) : ((PLAYER.x + PLAYER.size) > GAME.width ? (PLAYER.x = 0) : (0));
    (PLAYER.y < 0) ? (PLAYER.y = GAME.height - PLAYER.size) : ((PLAYER.y + PLAYER.size) > GAME.height ? (PLAYER.y = 0) : (0));
}

function checkLaserBounds() {
    // Перебор всех лазеров
    POINTS.forEach(point => {
        // считаем sin и cos для каждого угла лазера
        const sin = Math.sin(point.angle);
        const cos = Math.cos(point.angle);

        // массив углов игрока
        const playerCorners = [
            {x: PLAYER.x, y: PLAYER.y},
            {x: PLAYER.x + PLAYER.size, y: PLAYER.y},
            {x: PLAYER.x, y: PLAYER.y + PLAYER.size},
            {x: PLAYER.x + PLAYER.size, y: PLAYER.y + PLAYER.size}
        ];

        // проверяем каждую угловую точку игрока
        for (const corner of playerCorners) {
            // расчитваем удаленность угловой точки игрока от центра лазера
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
                point.state = POINT_STATES.ACTIVE;
                point.team = PLAYER.team;
                point.activationTime = Date.now();
            }

            // Проверка коллизий с лазерами
            if (point.state === POINT_STATES.ACTIVE) {
                if (point.type === 1 && point.team === PLAYER.team) { // Крест
                    if ((Math.abs(rotatedX) < point.size / 2 && Math.abs(rotatedY) < point.width / 2) ||
                        (Math.abs(rotatedY) < point.size / 2 && Math.abs(rotatedX) < point.width / 2)) {
                        PLAYER.state = PLAYER_STATES.DEAD;
                    }
                }
                if (point.type === 2 && point.team === PLAYER.team) { // Три-радиус
                    const angles = [0, 2 * Math.PI / 3, -2 * Math.PI / 3]; // 0, 120, -120 углы

                    angles.forEach(angle => {
                        const angleSin = Math.sin(angle);
                        const angleCos = Math.cos(angle);

                        const rotatedRayX = angleCos * rotatedX - angleSin * rotatedY;
                        const rotatedRayY = angleSin * rotatedX + angleCos * rotatedY;

                        if (rotatedRayX > 0 && rotatedRayX < point.size / 2 && Math.abs(rotatedRayY) < point.height / 2) {
                            PLAYER.state = PLAYER_STATES.DEAD;
                        }
                    });
                }
                if (point.type === 3 && point.team === PLAYER.team) { // Прямая линия (горизонтальная)
                    if (corner.y >= point.y - point.width / 2 && corner.y <= point.y + point.width / 2 &&
                        corner.x >= point.x - point.size / 2 && corner.x <= point.x + point.size / 2) {
                        PLAYER.state = PLAYER_STATES.DEAD;
                        console.log("Collision")
                    }
                }
            }
        }
    });
}

function updateEntities() {
    POINTS.forEach(point => {
        if (point.state === POINT_STATES.ACTIVE && Date.now() - point.activationTime < point.existTime) {
            if (point.team === PLAYER.team) {
                point.color = PLAYER.color;
                point.height = 5;
            }
        } else {
            point.state = POINT_STATES.INACTIVE;
            resetPoint(point, POINTS.indexOf(point));
        }
        if (PLAYER.state === POINT_STATES.DEAD) {
            PLAYER.color = black;
        }
        if (PLAYER.state === PLAYER_STATES.STUNNED) {
            PLAYER.x = 30;
            PLAYER.y = 30;
        }
    });
}

// Обработка нажатой клавиши
function handleInput(dt) {
    if (PLAYER.state === PLAYER_STATES.ACTIVE) {
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
}

// Определение requestAnimFrame
window.requestAnimFrame = window.requestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60);
};

init();

