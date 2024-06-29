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
    speed: 100,
    team: 'red', 
    isAlive: true,
    side: 'enemy'
}

let POINT= {
    x: 200,
    y: 200,
    width: 10,
    height: 10,
    laserWidth: 150,
    type: 1,
    active: false,
    team: '',
    color: gray,
    angle: 0
};

let ctx = canvas.getContext("2d");

canvas.width = GAME.width;
canvas.height = GAME.height;

function drawBackground() {
    ctx.fillStyle = GAME.background;
    ctx.fillRect(0, 0, GAME.width, GAME.height);
}

function drawBot() {
    if (BOT.isAlive === true) {
        ctx.fillStyle = BOT.color;
        ctx.fillRect(BOT.x, BOT.y, BOT.size, BOT.size);
    }
    if (BOT.isAlive === false) {
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
    
    const dx = POINT.x - BOT.x;
    const dy = POINT.y - BOT.y;
    const hyp = Math.sqrt(dx**2 + dy**2);
    const inRangeOfLaser = (hyp - BOT.size * Math.sqrt(2) < POINT.laserWidth);
    
    if (!POINT.active) {
        // Бот движется к точке, когда лазер не активен
        moveBotToLaser();
    }
    if (POINT.active && inRangeOfLaser) {
        // Бот движется по спирали от центра, когда лазер активен и бот в зоне поражения
        moveBotOutOfLaserSpiral();
    } 
    if (POINT.active && !inRangeOfLaser) {
        // Бот движется к точке, когда лазер активен, но бот не в зоне поражения
        moveBotToLaser();
    }
    function moveBotToLaser() {
        BOT.x += BOT.speed * dx / hyp * dt;
        BOT.y += BOT.speed * dy / hyp * dt;
    }
    function moveBotOutOfLaserSpiral() {
        // Определяем угол между ботом и точкой
        const angle = Math.atan2(dy, dx);
                
        // Радиальная скорость (от центра прочь)
        const radialSpeed = BOT.speed * dt;

        // Угловая скорость (по окружности)
        const angularSpeed = BOT.speed * dt / hyp;

        // Обновляем координаты бота
        BOT.x -= radialSpeed * Math.cos(angle) - angularSpeed * Math.sin(angle) * hyp;
        BOT.y -= radialSpeed * Math.sin(angle) + angularSpeed * Math.cos(angle) * hyp;
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
}

function checkPointBounds() {
    if (POINT.active === false &&
        POINT.x + POINT.width > PLAYER.x &&
        POINT.x < PLAYER.x + PLAYER.size &&
        POINT.y + POINT.height > PLAYER.y &&
        POINT.y < PLAYER.y + PLAYER.size)
    {
        POINT.active = true;
    }
    // Столкновение с ботом
    //
    // if (POINT.active === false &&
    //     POINT.x + POINT.width > BOT.x &&
    //     POINT.x < BOT.x + BOT.size &&
    //     POINT.y + POINT.height > BOT.y &&
    //     POINT.y < BOT.y + BOT.size)
    // {
    //     POINT.active = true;
    //     POINT.team = BOT.team;
    // }
}

function checkLaserBounds() {
    if (PLAYER.team != POINT.team) {
        const sin = Math.sin(POINT.angle);
        const cos = Math.cos(POINT.angle);
    
        const playerCorners = [
          {x: PLAYER.x, y: PLAYER.y},
          {x: PLAYER.x + PLAYER.size, y: PLAYER.y},
          {x: PLAYER.x, y: PLAYER.y + PLAYER.size},
          {x: PLAYER.x + PLAYER.size, y: PLAYER.y + PLAYER.size}
        ];
    
        for (const corner of playerCorners) {
          const dx = corner.x - POINT.x - POINT.width / 2;
          const dy = corner.y - POINT.y - POINT.height / 2;
    
          const rotatedX = cos * dx + sin * dy;
          const rotatedY = -sin * dx + cos * dy;
    
          if (rotatedX > -POINT.width / 2 && rotatedX < POINT.width / 2 &&
                  rotatedY > -POINT.height / 2 && rotatedY < POINT.height / 2) {
            PLAYER.isAlive = false;
          }
        }
    }
    
}

function updateEntities() {
    if (POINT.active) {
        if (POINT.team === '') {
            POINT.team = PLAYER.team;
            POINT.color = PLAYER.color;
            pointActiveTime = Date.now(); //переименовать 
        }

        if (Date.now() - pointActiveTime > timeExist) {
            POINT.active = false;
            POINT.team = '';
        }
    } else {  // изменяем состояния POINT в исходные 
        POINT.width = 10;
        POINT.team = '';
        POINT.color = gray;
    }     
}    

// Определение requestAnimFrame
    window.requestAnimFrame = window.requestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };

    init();
