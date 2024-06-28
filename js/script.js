const canvasWidth = 400;
const canvasHeight = 400;
const red = "red";
const green = "#00A86B";
const gray = "#666";
const dark = "#333";
const black = "#111";
const lineSize = 300;

let canvas = document.getElementById("canvas");
let gameTime = 0;
let lastTime;
let timeExist = 15000;
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
    type: 0,
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
    if (PLAYER.isAlive == false) {
        PLAYER.color = 'black';
        setTimeout(() => {
            PLAYER.color = 'blue';
            PLAYER.x = playerStartX;
            PLAYER.y = playerStartY;
            PLAYER.isAlive = true
          }, 1000);
    }
    
    
}

function drawPoint() {
    if (POINT.active) {
        if (POINT.type === 1) {
            POINT.angle += 2 * Math.PI / 180;
            ctx.save();
            ctx.translate(POINT.x + POINT.width / 2, POINT.y + POINT.height / 2);
            ctx.rotate(POINT.angle);
            ctx.fillStyle = POINT.color;
            ctx.fillRect(-POINT.width/2, -POINT.height/2, POINT.width, POINT.height);
            ctx.restore();
        }
        if (POINT.type === 2) {
        //дописать типы
        }
    } else {
        ctx.fillStyle = POINT.color;
        ctx.fillRect(POINT.x, POINT.y, POINT.width, POINT.height);
    }
}

// Инициализация
function init() {
    coordInit();
    console.log(BOT.x);
    console.log(BOT.size);
    drawBackground();
    drawPoint();
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
    let stepX = BOT.speed * dx/hyp;
    let stepY = BOT.speed * dy/hyp;
    const inRangeOfLaser = (hyp - BOT.size*Math.sqrt(2) < POINT.laserWidth)
    if (POINT.active === false) {
        BOT.x += stepX*dt;
        BOT.x += stepY*dt;
    }
    if ((POINT.active === true) && (!inRangeOfLaser)) {
        BOT.x += stepX*dt;
        BOT.y += stepY*dt;
    }
    if ((POINT.active === true) && (inRangeOfLaser)) {
        BOT.x -= stepX*dt;
        BOT.y -= stepY*dt;
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
    if (POINT.active === true &&
        POINT.x + POINT.width > PLAYER.x &&
        POINT.x < PLAYER.x + PLAYER.size &&
        POINT.y + POINT.height > PLAYER.y &&
        POINT.y < PLAYER.y + PLAYER.size)
    {
        // console.log('Collision');
    }
}

function checkLaserBounds() {
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

function updateEntities() {
    if (POINT.active) {
        if (POINT.team === 0) {
            //установить вариативность типов
            POINT.type = 1;
            POINT.team = PLAYER.team;
            POINT.width = POINT.laserWidth;
            POINT.x = POINT.x - POINT.width / 2;
            //время жизни
            pointActiveTime = Date.now(); //переименовать 
        }
        if (POINT.team === PLAYER.team) {
            POINT.color = PLAYER.color;
        } else {
            PLAYER.isAlive = 0;
            PLAYER.color = black;
            // в константы
            PLAYER.x = 20;
            PLAYER.y = 20;
            POINT.color = gray;
        }
        // можно использовать конструкцию !() {}
        if (Date.now() - pointActiveTime < timeExist) {
            pointActiveExist = true;
        } else {
            POINT.active = false;
        }
    } else {  // изменяем состояния POINT в исходные 
        POINT.x = 200;
        POINT.y = 200;
        POINT.width = 10;
        POINT.type = 0;
        POINT.team = 0;
        POINT.color = gray;
    }     
}    

function render() {
    ctx.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    drawPoint();
    drawBot();
    drawPlayer();
}

// Определение requestAnimFrame
window.requestAnimFrame = window.requestAnimationFrame || function(callback) {
    window.setTimeout(callback, 1000 / 60);
};

init();
