import {BOT} from "../script/bot/model";
import {BOT_STATES} from "../script/bot/const";
import {getMyPlayer} from "../script/player/player";
import {Player} from "../script/player/model";
import {activePlayers, activeBots} from "../script";
import {POINTS} from "../script/point/model"
import {POINT_STATES, POINT_TYPES} from "../script/point/const";
import {GAME} from "../script/game/model";

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
        activeBots.forEach(bot => {
            const botCorners = [
                {x: bot.getX(), y: bot.getY()},
                {x: bot.getX() + bot.getSize(), y: bot.getY()},
                {x: bot.getX(), y: bot.getY() + bot.getSize()},
                {x: bot.getX() + bot.getSize(), y: bot.getY() + bot.getSize()}
            ];
    
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
                    point.team = bot.getTeam(); // Убедитесь, что присваивается команда бота
                    point.activationTime = Date.now();
                }
    
                // Проверка коллизий с лазерами
                if (point.state === POINT_STATES.ACTIVE) {
                    if (point.type === POINT_TYPES.CROSS && point.team !== bot.getTeam()) { // Крест
                        if ((Math.abs(rotatedX) < point.size / 2 && Math.abs(rotatedY) < point.width / 2) ||
                            (Math.abs(rotatedY) < point.size / 2 && Math.abs(rotatedX) < point.width / 2)) {
                            bot.setState(BOT_STATES.DEAD);
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
                                bot.setState(BOT_STATES.DEAD);
                            }
                        });
                    }
                    if (point.type === POINT_TYPES.LINE && point.team !== BOT.team) { // Прямая линия (горизонтальная)
                        if (corner.y >= point.y - point.width / 2 && corner.y <= point.y + point.width / 2 &&
                            corner.x >= point.x - point.size / 2 && corner.x <= point.x + point.size / 2) {
                            bot.setState(BOT_STATES.DEAD);
                        }
                    }
                }
            }
        });
        
    });
}

function checkBorderGameBounds() {
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
    activeBots.forEach(bot => {
        if (bot.getX() < 0) {
            bot.setX(GAME.width - bot.getSize());
        } else if (bot.getX() + bot.getSize() > GAME.width) {
            bot.setX(0);
        }
    
        if (bot.getY() < 0) {
            bot.setY(GAME.height - bot.getSize());
        } else if (bot.getY() + bot.getSize() > GAME.height) {
            bot.setY(0);
        }
    });
}

export function checkCollisions() {
    checkBorderGameBounds();
    checkLaserBounds();
}
