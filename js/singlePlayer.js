const canvasWidth = 1820;
const canvasHeight = 1024;
const red = "#f8df5c";
const green = "#8f23dc";
const gray = "#666";
const dark = "#333";
const black = "#111";
const white = "#FFF";
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
const BOT_STATES = {
    ACTIVE: 'active',
    STUNNED: 'stunned',
    DEAD: 'dead'
}
const POINT_STATES = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    INVISIBLE: 'invisible'
}
const POINT_TYPES = {
    LINE: "line",
    TRIGRAPH: "trigraph",
    CROSS: "cross"
}
const TEAM_STATES = {
    NONE: "none",
    PURPLE: "purple",
    YELLOW: "yellow"
}

let SCORE = {
    color: white,
    team1: 0,
    team2: 0
}
let DEFAULT_POINTS = [
    {
        id: 0,
        x: 910, // canvasWidth / 2
        y: 20,  // topLinePointDistance
        width: 10,
        height: 10,
        size: 1000,
        type: POINT_TYPES.LINE,
        team: TEAM_STATES.NONE,
        color: gray,
        angle: 0,
        existTime: 10000,
        state: POINT_STATES.INACTIVE,
        speed: 0,
        direction: 0
    },
    {
        id: 1,
        x: 910, // canvasWidth / 2
        y: 1004, // canvasHeight - bottomLinePointDistance
        width: 10,
        height: 10,
        size: 1000,
        type: POINT_TYPES.LINE,
        team: TEAM_STATES.NONE,
        color: gray,
        angle: 0,
        existTime: 10000,
        state: POINT_STATES.INACTIVE,
        speed: 0,
        direction: Math.PI
    },
    {
        id: 2,
        x: 455, // canvasWidth / 4
        y: 512, // canvasHeight / 2
        width: 10,
        height: 10,
        size: 350,
        type: POINT_TYPES.TRIGRAPH,
        team: TEAM_STATES.NONE,
        color: gray,
        angle: 0,
        existTime: 10000,
        state: POINT_STATES.INVISIBLE,
        speed: 150,
        direction: 0
    },
    {
        id: 3,
        x: 1365, // canvasWidth / 4 * 3
        y: 512, // canvasHeight / 2
        width: 10,
        height: 10,
        size: 350,
        type: POINT_TYPES.TRIGRAPH,
        team: TEAM_STATES.NONE,
        color: gray,
        angle: 0,
        existTime: 10000,
        state: POINT_STATES.INVISIBLE,
        speed: 150,
        direction: Math.PI
    },
    {
        id: 4,
        x: 910, // canvasWidth / 2
        y: 512, // canvasHeight / 2
        width: 10,
        height: 10,
        size: 2100,
        type: POINT_TYPES.CROSS,
        team: TEAM_STATES.NONE,
        color: gray,
        angle: 0,
        existTime: 10000,
        state: POINT_STATES.INVISIBLE,
        speed: 0,
        direction: 0
    },
    {
        id: 5,
        x: 1592.5, // canvasWidth * (7 / 8)
        y: 804, // canvasHeight - bottomPointCrossDistance
        width: 10,
        height: 10,
        size: 500,
        type: POINT_TYPES.TRIGRAPH,
        team: TEAM_STATES.NONE,
        color: gray,
        angle: 0,
        existTime: 10000,
        state: POINT_STATES.INVISIBLE,
        speed: 0,
        direction: 0
    },
    {
        id: 6,
        x: 227.5, // canvasWidth * (1 / 8)
        y: 804, // canvasHeight - bottomPointCrossDistance
        width: 10,
        height: 10,
        size: 500,
        type: POINT_TYPES.TRIGRAPH,
        team: TEAM_STATES.NONE,
        color: gray,
        angle: 0,
        existTime: 10000,
        state: POINT_STATES.INVISIBLE,
        speed: 0,
        direction: 0
    },
    {
        id: 7,
        x: 682.5, // canvasWidth * (3 / 8)
        y: 804, // canvasHeight - bottomPointCrossDistance
        width: 10,
        height: 10,
        size: 500,
        type: POINT_TYPES.TRIGRAPH,
        team: TEAM_STATES.NONE,
        color: gray,
        angle: 0,
        existTime: 10000,
        state: POINT_STATES.INVISIBLE,
        speed: 0,
        direction: 0
    },
    {
        id: 8,
        x: 1137.5, // canvasWidth * (5 / 8)
        y: 804, // canvasHeight - bottomPointCrossDistance
        width: 10,
        height: 10,
        size: 500,
        type: POINT_TYPES.TRIGRAPH,
        team: TEAM_STATES.NONE,
        color: gray,
        angle: 0,
        existTime: 10000,
        state: POINT_STATES.INVISIBLE,
        speed: 0,
        direction: 0
    },
    {
        id: 9,
        x: 1592.5, // canvasWidth * (7 / 8)
        y: 210, // topPointCrossDistance
        width: 10,
        height: 10,
        size: 500,
        type: POINT_TYPES.TRIGRAPH,
        team: TEAM_STATES.NONE,
        color: gray,
        angle: 0,
        existTime: 10000,
        state: POINT_STATES.INVISIBLE,
        speed: 0,
        direction: 0
    },
    {
        id: 10,
        x: 227.5, // canvasWidth * (1 / 8)
        y: 210, // topPointCrossDistance
        width: 10,
        height: 10,
        size: 500,
        type: POINT_TYPES.TRIGRAPH,
        team: TEAM_STATES.NONE,
        color: gray,
        angle: 0,
        existTime: 10000,
        state: POINT_STATES.INVISIBLE,
        speed: 0,
        direction: 0
    },
    {
        id: 11,
        x: 682.5, // canvasWidth * (3 / 8)
        y: 210, // topPointCrossDistance
        width: 10,
        height: 10,
        size: 500,
        type: POINT_TYPES.TRIGRAPH,
        team: TEAM_STATES.NONE,
        color: gray,
        angle: 0,
        existTime: 10000,
        state: POINT_STATES.INVISIBLE,
        speed: 0,
        direction: 0
    },
    {
        id: 12,
        x: 1137.5, // canvasWidth * (5 / 8)
        y: 210, // topPointCrossDistance
        width: 10,
        height: 10,
        size: 500,
        type: POINT_TYPES.TRIGRAPH,
        team: TEAM_STATES.NONE,
        color: gray,
        angle: 0,
        existTime: 10000,
        state: POINT_STATES.INVISIBLE,
        speed: 0,
        direction: 0
    },
];

let canvas = document.getElementById("canvas");
let gameTime = 0;
let lastTime;

let countdownAudio = new Audio();
countdownAudio.preload = 'auto';
countdownAudio.src = '../src/sound/countdown.MP3';
let gameThemeAudio = new Audio();
gameThemeAudio.preload = 'auto';
gameThemeAudio.src = '../src/sound/game_theme.MP3';
gameThemeAudio.loop = true;
gameThemeAudio.autoplay = true;
function playLaserSound() {
    const laserSound = new Audio('../src/sound/laser_appearance.MP3');
    laserSound.play();
}
let scoreAlpha = 0.2;

const botStartX = canvasWidth - 50;
const botStartY = canvasHeight / 2;
const playerStartX = 50;
const playerStartY = canvasHeight / 2;

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
    speed: 300,
    team: TEAM_STATES.PURPLE,
    color: black,
    state: PLAYER_STATES.ACTIVE
};

let BOT = {
    x: 200,
    y: 200,
    size: 10,
    color: red,
    speed: 300,
    team: TEAM_STATES.YELLOW,
    state: BOT_STATES.ACTIVE,
    side: 'enemy'
}

let POINTS = DEFAULT_POINTS.map(createPoint);

function createPoint(point) {
    return {
        id: point.id,
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
        speed: point.speed,
        direction: point.direction
    };
}

function resetPoint(point, index) {
    const defaultPoint = DEFAULT_POINTS[index];
    point.id = defaultPoint.id;
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
    point.speed = defaultPoint.speed;
}

function respawnPoint(point) {
    if (point.id !== 0 && point.id !== 1) {
        point.state = POINT_STATES.INVISIBLE;
    }
    point.team = TEAM_STATES.NONE;
    point.activationTime = null;
    point.color = gray;
    point.height = 10;
}

let ctx = canvas.getContext("2d");

canvas.width = GAME.width;
canvas.height = GAME.height;

function drawBackground() {
    ctx.fillStyle = GAME.background;
    ctx.fillRect(0, 0, GAME.width, GAME.height);
}

function drawScore() {
    ctx.save();
    ctx.globalAlpha = scoreAlpha;
    ctx.fillStyle = SCORE.color;
    ctx.font = "100px Font_Over";
    ctx.fillText(`${SCORE.team1}:${SCORE.team2}`, 50, 100 );
    ctx.restore();
}

function drawFinalScore() {
    ctx.save();
    ctx.globalAlpha = scoreAlpha;
    ctx.fillStyle = SCORE.color;
    ctx.font = "700px Font_Over";
    ctx.fillText(`${SCORE.team1}:${SCORE.team2}`, 270, 750);
    ctx.restore();
}

function drawBot() {
    if (BOT.team === TEAM_STATES.PURPLE) {
        PLAYER.color = red;
    }
    if (PLAYER.team === TEAM_STATES.YELLOW) {
        PLAYER.color = green;
    }
    if (BOT.state === BOT_STATES.ACTIVE) {
        ctx.fillStyle = BOT.color;
        ctx.fillRect(BOT.x, BOT.y, BOT.size, BOT.size);
    }
    if (BOT.state === BOT_STATES.DEAD) {
        setTimeout(() => {
            BOT.color = red;
            BOT.x = botStartX;
            BOT.y = botStartY;
            BOT.state = BOT_STATES.ACTIVE;
        }, 1000)
    }
}

function drawPlayer() {
    if (PLAYER.state === PLAYER_STATES.ACTIVE) {
        if (PLAYER.team === TEAM_STATES.PURPLE) {
            PLAYER.color = green;
        }
        if (PLAYER.team === TEAM_STATES.YELLOW) {
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
            if (point.type === POINT_TYPES.CROSS) {
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
            if (point.type === POINT_TYPES.TRIGRAPH) {
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
            if (point.type === POINT_TYPES.LINE) {
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

        }
        if (point.state === POINT_STATES.INACTIVE) {
            point.angle += Math.PI / 180;
            ctx.save();
            ctx.translate(point.x + point.width / 2, point.y + point.height / 2);
            ctx.rotate(point.angle);
            ctx.fillStyle = point.color;
            ctx.fillRect(-point.width / 2, -point.height / 2, point.width, point.height);
            ctx.restore();
        }
        if (point.state === POINT_STATES.INVISIBLE) {

        }
    });
}

function fadeOutScore() {
    // Уменьшаем уровень прозрачности каждые 100 миллисекунд
    const fadeOutInterval = setInterval(() => {
        scoreAlpha -= 0.02; // Регулируйте значение для изменения скорости исчезания

        // Останавливаем интервал, когда прозрачность достигает или падает ниже нуля
        if (scoreAlpha <= 0) {
            clearInterval(fadeOutInterval);
            scoreAlpha = 0; // Убедитесь, что значение не станет отрицательным
        }
    }, 30); // Интервал времени в миллисекундах
}

function render() {
    ctx.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    drawScore();
    drawPoints();
    drawPlayer();
    drawBot();
}

function resetLevel() {
    gameTime = -4.2;
    cordInit();  // Сбрасываем координаты игрока и бота

    // Сбрасываем параметры игрока
    PLAYER.state = PLAYER_STATES.ACTIVE;
    PLAYER.x = playerStartX;
    PLAYER.y = playerStartY;
    PLAYER.speed = 300; // сброс скорости, если она менялась
    PLAYER.team = TEAM_STATES.PURPLE; // сброс команды, если это актуально

    // Сбрасываем параметры бота
    BOT.state = BOT_STATES.ACTIVE;
    BOT.x = botStartX;
    BOT.y = botStartY;
    BOT.speed = 300; // сброс скорости, если она менялась
    BOT.team = TEAM_STATES.YELLOW; // сброс команды, если это актуально

    scoreAlpha = 0.2; // Сброс прозрачности счёта

    // Сбрасываем параметры всех точек
    POINTS.forEach((point, index) => {
        respawnPoint(point, index);
    });

    setTimeout(fadeOutScore, 6800); // Устанавливаем таймер для исчезновения счёта
    // countdown(); // Запускаем анимацию и звук отсчёта
}

function init() {
    cordInit();
    drawBackground();
    drawScore();
    drawPoints();
    drawPlayer();
    drawBot();
    countdown();
}

function countdown() {
    // let inputTime = Date.now();
    let background = document.createElement("div");
    let countdownGif = document.createElement("img");
    document.body.appendChild(background);
    background.classList.add('background-countdown');
    background.appendChild(countdownGif);
    countdownGif.src = "src/img/cat.gif";
    countdownAudio.play();
    setTimeout(() => {
        gameThemeAudio.play();
        background.remove();
        countdownGif.remove();
        lastTime = Date.now();
        main();
    }, 4200)
}

function cordInit() {
    PLAYER.x = playerStartX;
    PLAYER.y = playerStartY;
    BOT.x = botStartX;
    BOT.y = botStartY;
}

function main() {
    let now = Date.now();
    let dt = (now - lastTime) / 1000.0;
    if (SCORE.team1 < 3 && SCORE.team2 < 3) {
        update(dt);
        render();
    }
    else {
        drawBackground();
        drawFinalScore();
        setTimeout(() => {window.location.href = 'menu_all.html';}, 1500);
    }
    lastTime = now;
    requestAnimFrame(main);
}

function update(dt) {
    gameTime += dt;
    botMovement(dt);
    handleInput(dt);
    checkCollisions();
    updateEntities(dt);
}

function botMovement(dt) {
    let loopIndexInactive = 0;
    let loopIndexActive = 0;
    let idInactive;
    let dxMinInactive;
    let dyMinInactive;
    let hypMinInactive;

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
        moveBotOutOfLaserSpiral(); // заносит в dxActive и dyActive приращение для убегания по спирали
    }
    moveBotToLaser(); // заносит в dxInactive и dyInactive приращение для движения к цели
    getRightDirection(); // дает приоритет убеганию, контролирует предельную скорость


    function findNearestPoint(POINTS) {
        POINTS.forEach(point => {
            findInactivePointAndCompare(point);
            findActivePointInArea(point);
        });
    }

    function findInactivePointAndCompare(point) {
        if (point.state === POINT_STATES.INACTIVE) {
            if (loopIndexInactive === 0) {
                idInactive = 0;
                dxMinInactive = point.x - BOT.x;
                dyMinInactive = point.y - BOT.y;
                hypMinInactive = Math.sqrt(dxMinInactive ** 2 + dyMinInactive ** 2);
            }
            let dy;
            let dx;

            if (Math.abs(point.y + (GAME.height - BOT.y)) < Math.abs(point.y - BOT.y)) {
                dy = point.y + (GAME.height - BOT.y);
            } else {
                dy = point.y - BOT.y;
            }
            if (Math.abs(point.x + (GAME.width - BOT.x)) < Math.abs(point.x - BOT.x)) {
                dx = point.x + (GAME.width - BOT.x);
            } else {
                dx = point.x - BOT.x;
            }
            let hyp = Math.sqrt(dx ** 2 + dy ** 2);
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
        if (point.state === POINT_STATES.ACTIVE) {
            if (loopIndexActive === 0) {
                idInactive = 0;
                dxMinActive = point.x - BOT.x;
                dyMinActive = point.y - BOT.y;
                hypMinActive = Math.sqrt(dxMinActive ** 2 + dyMinActive ** 2);
            }
            let dx = point.x - BOT.x;
            let dy = point.y - BOT.y;
            let hyp = Math.sqrt(dx ** 2 + dy ** 2);
            if (hyp < hypMinActive) {
                idActive = point.id;
                dxMinActive = dx;
                dyMinActive = dy;
                hypMinActive = hyp;
            }
            inRangeOfLaser = (hypMinActive - BOT.size * Math.sqrt(2) < point.size / 2);
            loopIndexActive++;
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
        dxActive = angularSpeed * Math.sin(angle) * hypMinActive - radialSpeed * Math.cos(angle);
        dyActive = (-1) * (radialSpeed * Math.sin(angle) + angularSpeed * Math.cos(angle) * hypMinActive);
    }

    function getRightDirection() {
        if (inRangeOfLaser) {
            if ((dxActive * dxInactive >= 0) && (dyActive * dyInactive >= 0)) {
                if (Math.sqrt((dxActive + dxInactive) ** 2 + (dyActive + dyInactive) ** 2) < BOT.speed * dt) {
                    BOT.x += dxActive + dxInactive;
                    BOT.y += dyActive + dyInactive;
                } else {
                    const angle = Math.atan2(dyActive + dyInactive, dxActive + dxInactive);
                    BOT.x += BOT.speed * dt * Math.cos(angle);
                    BOT.y += BOT.speed * dt * Math.sin(angle);
                }
            }
            if ((dxActive * dxInactive >= 0) && (dyActive * dyInactive < 0)) {
                if (Math.sqrt((dxActive + dxInactive) ** 2 + (dyActive) ** 2) < BOT.speed * dt) {
                    BOT.x += dxActive + dxInactive;
                    BOT.y += dyActive;
                } else {
                    const angle = Math.atan2(dyActive, dxActive + dxInactive);
                    BOT.x += BOT.speed * dt * Math.cos(angle);
                    BOT.y += BOT.speed * dt * Math.sin(angle);
                }
            }
            if ((dxActive * dxInactive < 0) && (dyActive * dyInactive >= 0)) {
                if (Math.sqrt((dxActive) ** 2 + (dyActive + dyInactive) ** 2) < BOT.speed * dt) {
                    BOT.x += dxActive;
                    BOT.y += dyActive + dyInactive;
                } else {
                    const angle = Math.atan2(dyActive + dyInactive, dxActive);
                    BOT.x += BOT.speed * dt * Math.cos(angle);
                    BOT.y += BOT.speed * dt * Math.sin(angle);
                }
            }
            if ((dxActive * dxInactive < 0) && (dyActive * dyInactive < 0)) {
                if (Math.sqrt((dxActive) ** 2 + (dyActive) ** 2) < BOT.speed * dt) {
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
    checkLaserBounds();
}

function checkBorderGameBounds() {
    // Проход через границы поля для ИГРОКА
    if (PLAYER.x < 0) {
        PLAYER.x = GAME.width - PLAYER.size;
    } else if (PLAYER.x + PLAYER.size > GAME.width) {
        PLAYER.x = 0;
    }

    if (PLAYER.y < 0) {
        PLAYER.y = GAME.height - PLAYER.size;
    } else if (PLAYER.y + PLAYER.size > GAME.height) {
        PLAYER.y = 0;
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
        const botCorners = [
            {x: BOT.x, y: BOT.y},
            {x: BOT.x + BOT.size, y: BOT.y},
            {x: BOT.x, y: BOT.y + BOT.size},
            {x: BOT.x + BOT.size, y: BOT.y + BOT.size}
        ];

        for (const corner of playerCorners) {
            // рассчитываем удаленность угловой точки игрока от центра лазера
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
                playLaserSound();
                point.state = POINT_STATES.ACTIVE;
                point.team = PLAYER.team; // Убедитесь, что присваивается команда игрока
                point.activationTime = Date.now();
            }

            // Проверка коллизий с лазерами
            if (point.state === POINT_STATES.ACTIVE) {
                if (point.type === POINT_TYPES.CROSS && point.team !== PLAYER.team) { // Крест
                    if ((Math.abs(rotatedX) < point.size / 2 && Math.abs(rotatedY) < point.width / 2) ||
                        (Math.abs(rotatedY) < point.size / 2 && Math.abs(rotatedX) < point.width / 2)) {
                        PLAYER.state = PLAYER_STATES.DEAD;
                    }
                }
                if (point.type === POINT_TYPES.TRIGRAPH && point.team !== PLAYER.team) { // Три-радиус
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
                if (point.type === POINT_TYPES.LINE && point.team !== PLAYER.team) { // Прямая линия (горизонтальная)
                    if (corner.y >= point.y - point.width / 2 && corner.y <= point.y + point.width / 2 &&
                        corner.x >= point.x - point.size / 2 && corner.x <= point.x + point.size / 2) {
                        PLAYER.state = PLAYER_STATES.DEAD;
                    }
                }
            }
        }
        for (const corner of botCorners) {
            // рассчитываем удаленность угловой точки игрока от центра лазера
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
                playLaserSound();
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
    if (PLAYER.state === PLAYER_STATES.DEAD) {
        SCORE.team2 += 1;
        resetLevel();
    }
    if (BOT.state === BOT_STATES.DEAD) {
        SCORE.team1 += 1;
        resetLevel();
    }
}

function movePoint(point, dt) {
    if (point.id === 2 || point.id === 3) {
        if (point.x <= 50) {
            point.direction = 0; // угол 0 радиан означает движение вправо
        }
        if (point.x >= 1760) {
            point.direction = Math.PI; // угол PI радиан означает движение влево
        }
    }
    point.x += Math.cos(point.direction) * point.speed * dt;
}

function updateVisibilityPoints(point) {
    if (point.type === POINT_TYPES.TRIGRAPH) {
        if (5 <= point.id && point.id <= 12 && gameTime > 3) {
            point.state = POINT_STATES.INACTIVE;
        }
        if (2 <= point.id && point.id <= 3 && gameTime > 6) {
            point.state = POINT_STATES.INACTIVE;
        }
    }
    if (point.type === POINT_TYPES.CROSS && gameTime > 15) {
        point.state = POINT_STATES.INACTIVE;
    }
}

// Определение requestAnimFrame
window.requestAnimFrame = window.requestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60);
};

setTimeout(fadeOutScore, 6800);
init();