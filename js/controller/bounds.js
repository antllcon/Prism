import {BOT_STATES} from "../script/bot/const";
import {getMyPlayer} from "../script/player/player";
import {Player} from "../script/player/model";
import {activePlayers, activeBots} from "../script";
import {POINTS} from "../script/point/model"
import {POINT_STATES, POINT_TYPES} from "../script/point/const";
import {GAME, game} from "../script/game/model";

function checkLaserBounds() {

    POINTS.forEach(point => {
        let player = getMyPlayer(activePlayers);
        const sin = Math.sin(point.angle);
        const cos = Math.cos(point.angle);

        const playerCorners = [
            {x: player.getX(), y: player.getY()},
            {x: player.getX() + player.getSize(), y: player.getY()},
            {x: player.getX(), y: player.getY() + player.getSize()},
            {x: player.getX() + player.getSize(), y: player.getY() + player.getSize()}
        ];

        

        for (const corner of playerCorners) {
            const dx = corner.x - point.x;
            const dy = corner.y - point.y;

            const rotatedX = cos * dx + sin * dy;
            const rotatedY = -sin * dx + cos * dy;

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

        activeBots.forEach(bot => {
            const botCorners = [
                {x: bot.getX(), y: bot.getY()},
                {x: bot.getX() + bot.getSize(), y: bot.getY()},
                {x: bot.getX(), y: bot.getY() + bot.getSize()},
                {x: bot.getX() + bot.getSize(), y: bot.getY() + bot.getSize()}
            ];
    
            for (const corner of botCorners) {
                const dx = corner.x - point.x;
                const dy = corner.y - point.y;

                const rotatedX = cos * dx + sin * dy;
                const rotatedY = -sin * dx + cos * dy;

                if (point.state === POINT_STATES.INACTIVE &&
                    rotatedX > -point.width / 2 && rotatedX < point.width / 2 &&
                    rotatedY > -point.height / 2 && rotatedY < point.height / 2) {
                    //laserAppearanceAudio.play();
                    point.state = POINT_STATES.ACTIVE;
                    point.team = bot.getTeam(); // Убедитесь, что присваивается команда бота
                    point.activationTime = Date.now();
                }

                if (point.state === POINT_STATES.ACTIVE) {
                    if (point.type === POINT_TYPES.CROSS && point.team !== bot.getTeam()) { // Крест
                        if ((Math.abs(rotatedX) < point.size / 2 && Math.abs(rotatedY) < point.width / 2) ||
                            (Math.abs(rotatedY) < point.size / 2 && Math.abs(rotatedX) < point.width / 2)) {
                            bot.die();
                        }
                    }
                    if (point.type === POINT_TYPES.TRIGRAPH && point.team !== bot.getTeam()) { // Три-радиус
                        const angles = [0, 2 * Math.PI / 3, -2 * Math.PI / 3]; // 0, 120, -120 углы
    
                        angles.forEach(angle => {
                            const angleSin = Math.sin(angle);
                            const angleCos = Math.cos(angle);
    
                            const rotatedRayX = angleCos * rotatedX - angleSin * rotatedY;
                            const rotatedRayY = angleSin * rotatedX + angleCos * rotatedY;
    
                            if (rotatedRayX > 0 && rotatedRayX < point.size / 2 && Math.abs(rotatedRayY) < point.height / 2) {
                                bot.die();
                            }
                        });
                    }
                    if (point.type === POINT_TYPES.LINE && point.team !== bot.getTeam()) { // Прямая линия (горизонтальная)
                        if (corner.y >= point.y - point.width / 2 && corner.y <= point.y + point.width / 2 &&
                            corner.x >= point.x - point.size / 2 && corner.x <= point.x + point.size / 2) {
                            bot.die();
                        }
                    }
                }
            }
        });
    activeBots.forEach(bot => {
        console.log("x", bot.getX(), " y ", bot.getY(), " state ", bot.getState(), "bounds.js")
        }
    )
    });
}

function checkBorderGameBounds() {
    let player = getMyPlayer(activePlayers);
    if (player.getX() < 0) {
        player.setX(game.getWidth() - player.getSize());
    } else if (player.getX() + player.getSize() > game.getWidth()) {
        player.setX(0)
    }
    if (player.getY() < 0) {
        player.setY(game.getHeight() - player.getSize());
    } else if (player.getY() + player.getSize() > game.getHeight()) {
        player.setY(0)  ;
    }
    activeBots.forEach(bot => {
        if (bot.getX() < 0) {
            console.log(game.getWidth(), "getwidth bounds js")
            bot.setX(game.getWidth() - bot.getSize());
        } else if (bot.getX() + bot.getSize() > game.getWidth()) {
            bot.setX(0);
        }
    
        if (bot.getY() < 0) {
            bot.setY(game.getHeight() - bot.getSize());
        } else if (bot.getY() + bot.getSize() > game.getHeight()) {
            bot.setY(0);
        }
    });
}

export function checkCollisions() {
    checkBorderGameBounds();
    checkLaserBounds();
}
