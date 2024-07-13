import {Bot} from "../script/bot/model";
import {BOT_STATES} from "../script/bot/const";
import {getMyPlayer} from "../script/player/player";
import {Player} from "../script/player/model";
import {activePlayers, activeBots, points} from "../script";
import {POINT_STATES, POINT_TYPES} from "../script/point/const";
import {GAME} from "../script/game/model";

function checkLaserBounds() {

    points.forEach(point => {
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
            const dx = corner.x - point.getX();
            const dy = corner.y - point.getY();

            // переводим удаленность в систему координат вращения лазера
            const rotatedX = cos * dx + sin * dy;
            const rotatedY = -sin * dx + cos * dy;

            // смотрим на положение, делаем выводы относительно каждого состояния лазера
            // и так ищем коллизию игрока с лазером

            // Если точка принимает неактивное состояние
            // Активация лазера
            if (point.isInactive() &&
                rotatedX > -point.getWidth() / 2 && rotatedX < point.getWidth() / 2 &&
                rotatedY > -point.getHeight() / 2 && rotatedY < point.getHeight() / 2) {
                //laserAppearanceAudio.play();
                point.setActive();
                // point.team = PLAYER.team; // Убедитесь, что присваивается команда игрока
                point.setTeam(player.getTeam());
                point.setActivationTime(Date.now());
            }

            // Проверка коллизий с лазерами
            if (point.isActive()) {
                if (point.isTypeCross() && point.getTeam() !== player.getTeam()) { // Крест
                    if ((Math.abs(rotatedX) < point.getSize() / 2 && Math.abs(rotatedY) < point.getWidth() / 2) ||
                        (Math.abs(rotatedY) < point.getSize() / 2 && Math.abs(rotatedX) < point.getWidth() / 2)) {
                        player.die();
                    }
                }
                if (point.isTypeTrigraph() && point.getTeam() !== player.getTeam()) { // Три-радиус
                    const angles = [0, 2 * Math.PI / 3, -2 * Math.PI / 3]; // 0, 120, -120 углы

                    angles.forEach(angle => {
                        const angleSin = Math.sin(angle);
                        const angleCos = Math.cos(angle);

                        const rotatedRayX = angleCos * rotatedX - angleSin * rotatedY;
                        const rotatedRayY = angleSin * rotatedX + angleCos * rotatedY;

                        if (rotatedRayX > 0 && rotatedRayX < point.getSize() / 2 && Math.abs(rotatedRayY) < point.getHeight() / 2) {
                            player.die();
                        }
                    });
                }
                if (point.isTypeLine() && point.getTeam() !== player.getTeam()) { // Прямая линия (горизонтальная)
                    if (corner.y >= point.getY() - point.getWidth() / 2 && corner.y <= point.getY() + point.getWidth() / 2 &&
                        corner.x >= point.getX() - point.getSize() / 2 && corner.x <= point.getX() + point.getSize() / 2) {
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
                const dx = corner.x - point.getX();
                const dy = corner.y - point.getY();
    
                // переводим удаленность в систему координат вращения лазера
                const rotatedX = cos * dx + sin * dy;
                const rotatedY = -sin * dx + cos * dy;
    
                // смотрим на положение, делаем выводы относительно каждого состояния лазера
                // и так ищем коллизию игрока с лазером
    
                // Если точка принимает неактивное состояние
                if (point.isInactive() &&
                    rotatedX > -point.getWidth() / 2 && rotatedX < point.getWidth() / 2 &&
                    rotatedY > -point.getHeight() / 2 && rotatedY < point.getHeight() / 2) {
                    //laserAppearanceAudio.play();
                    point.setActive();
                    point.setTeam(bot.getTeam()); // Убедитесь, что присваивается команда бота
                    point.setActivationTime(Date.now());
                }
    
                // Проверка коллизий с лазерами
                if (point.isActive()) {
                    if (point.isTypeCross() && point.getTeam() !== bot.getTeam()) { // Крест
                        if ((Math.abs(rotatedX) < point.getSize() / 2 && Math.abs(rotatedY) < point.getWidth() / 2) ||
                            (Math.abs(rotatedY) < point.getSize() / 2 && Math.abs(rotatedX) < point.getWidth() / 2)) {
                            bot.die();
                        }
                    }
                    if (point.isTypeTrigraph() && point.getTeam() !== bot.getTeam()) { // Три-радиус
                        const angles = [0, 2 * Math.PI / 3, -2 * Math.PI / 3]; // 0, 120, -120 углы
    
                        angles.forEach(angle => {
                            const angleSin = Math.sin(angle);
                            const angleCos = Math.cos(angle);
    
                            const rotatedRayX = angleCos * rotatedX - angleSin * rotatedY;
                            const rotatedRayY = angleSin * rotatedX + angleCos * rotatedY;
    
                            if (rotatedRayX > 0 && rotatedRayX < point.getSize() / 2 && Math.abs(rotatedRayY) < point.getHeight() / 2) {
                                bot.die();
                            }
                        });
                    }
                    if (point.isTypeLine() && point.getTeam() !== bot.getTeam()) { // Прямая линия (горизонтальная)
                        if (corner.y >= point.getY() - point.getWidth() / 2 && corner.y <= point.getY() + point.getWidth() / 2 &&
                            corner.x >= point.getX() - point.getSize() / 2 && corner.x <= point.getX() + point.getSize() / 2) {
                            bot.die();
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
    } else if (player.getY() + player.getSize() > GAME.height) {
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
