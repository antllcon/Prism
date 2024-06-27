let canvas = document.getElementById("canvas");

const canvasWidth = 400;
const canvasHeight = 400;
const red = "red";
const green = "#00A86B";
const gray = "#666";
const black = "#111";
const lineSize = 300;
const startPos = [20, 20];

let GAME = {
    width: canvasWidth,
    height: canvasHeight,
    background: '#333'
};

let PLAYER = {
    pos: [20, 20],
    size: 10,
    color: black,
    speed: 200,
    //enum red/blue
    team: 1, 
    // true
    isAlive: true
};

let POINT = {
    pos: [200, 200],
    width: 10,
    height: 10,
    laserWidth: 300,
    type: 0,
    active: false,
    team: 0,
    color: gray,
    angle: 0
};

canvas.width = GAME.width;
canvas.height = GAME.height;

// Инструменты рисования
let ctx = canvas.getContext("2d");

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
        ctx.fillRect(PLAYER.pos[0], PLAYER.pos[1], PLAYER.size, PLAYER.size);
    }
    if (PLAYER.isAlive === false) {
        PLAYER.color = red;
        setTimeout(() => {
            PLAYER.color = green;
            PLAYER.pos[0] = 10;
            PLAYER.pos[1] = 10;
            PLAYER.isAlive = true
          }, 1000);
    }
}

function drawPoint() {
    if (POINT.active) {
        if (POINT.type === 1) {
            POINT.angle += 2 * Math.PI / 180;
            ctx.save();
            ctx.translate(POINT.pos[0] + POINT.width / 2, POINT.pos[1] + POINT.height / 2);
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
        ctx.fillRect(POINT.pos[0], POINT.pos[1], POINT.width, POINT.height);
    }
}
let lastTime;
let timeExist = 30000;
let pointActiveTime = null;
let pointActiveExist = false; 

// Инициализация
function init() {
    drawBackground();
    drawPoint();
    drawPlayer(); 
    lastTime = Date.now();
    main();
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

let gameTime = 0;

function update(dt) {
    gameTime += dt;
    handleInput(dt);
    checkCollisions();
    updateEntities();
}

// Обработка нажатой клавиши
function handleInput(dt) {
    if(input.isDown('DOWN') || input.isDown('s')) {
        PLAYER.pos[1] += PLAYER.speed * dt;
    }

    if(input.isDown('UP') || input.isDown('w')) {
        PLAYER.pos[1] -= PLAYER.speed * dt;
    }

    if(input.isDown('LEFT') || input.isDown('a')) {
        PLAYER.pos[0] -= PLAYER.speed * dt;
    }

    if(input.isDown('RIGHT') || input.isDown('d')) {
        PLAYER.pos[0] += PLAYER.speed * dt;
    }
}

//проблема с тем, что если оставить так, то непонятно, для кого конрктено мы обрабатываем коллизию. Точнее, мы обрабатвыаем ее не для всех. Непонятно, кто главный, кто второстепенный.
function checkCollisions() {
    checkPlayerBounds();
    checkEntitiesBounds();
    checkLaserBounds();
}

function checkPlayerBounds() {
    // Проверка границ
    if(PLAYER.pos[0] < 0) {
        PLAYER.pos[0] = GAME.width;
    } else if(PLAYER.pos[0] > GAME.width) {
        PLAYER.pos[0] = 0;
    }
//баг - герой может быть невидимым +30px (ширина)
    if(PLAYER.pos[1] < 0) {
        PLAYER.pos[1] = GAME.height;
    } else if(PLAYER.pos[1] > GAME.height) {
        PLAYER.pos[1] = 0;
    }
}

function checkEntitiesBounds() {
    if (POINT.active === false &&
        POINT.pos[0] + POINT.width > PLAYER.pos[0] &&
        POINT.pos[0] < PLAYER.pos[0] + PLAYER.size &&
        POINT.pos[1] + POINT.height > PLAYER.pos[1] &&
        POINT.pos[1] < PLAYER.pos[1] + PLAYER.size) 
    {
        POINT.active = true;
    }
    if (POINT.active === true &&
        POINT.pos[0] + POINT.width > PLAYER.pos[0] &&
        POINT.pos[0] < PLAYER.pos[0] + PLAYER.size &&
        POINT.pos[1] + POINT.height > PLAYER.pos[1] &&
        POINT.pos[1] < PLAYER.pos[1] + PLAYER.size) 
    {
        // console.log('Collision');
    }
}


function checkLaserBounds() {
    const sin = Math.sin(POINT.angle);
    const cos = Math.cos(POINT.angle);

    const playerCorners = [
      {x: PLAYER.pos[0], y: PLAYER.pos[1]},
      {x: PLAYER.pos[0] + PLAYER.size, y: PLAYER.pos[1]},
      {x: PLAYER.pos[0], y: PLAYER.pos[1] + PLAYER.size},
      {x: PLAYER.pos[0] + PLAYER.size, y: PLAYER.pos[1] + PLAYER.size}
    ];

    for (const corner of playerCorners) {
      const dx = corner.x - POINT.pos[0] - POINT.width / 2;
      const dy = corner.y - POINT.pos[1] - POINT.height / 2;

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
            POINT.width = lineSize;
            POINT.pos[0] = POINT.pos[0] - POINT.width / 2;
            //время жизни
            pointActiveTime = Date.now(); //переименовать 
        }
        if (POINT.team === PLAYER.team) {
            POINT.color = PLAYER.color;
        } else {
            PLAYER.live = 0;
            PLAYER.color = black;
            PLAYER.pos = startPos;
            //маркер столкновения
            POINT.color = red;
        }

        // можно использовать конструкцию !() {}
        if (Date.now() - pointActiveTime < timeExist) {
            pointActiveExist = true;
        } else {
            POINT.active = false;
        }
    } else {  // изменяем состояния POINT в исходные 
        POINT.pos = [200, 200];
        POINT.width = 10;
        POINT.type = 0;
        POINT.team = 0;
        POINT.color = gray;
    }     
}    


//надо подумать что делать с описанием состояний жизни

function render() {
    ctx.clearRect(0, 0, GAME.width, GAME.height);
    drawBackground();
    drawPoint();
    drawPlayer();
}

// Определение requestAnimFrame
window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

init();
