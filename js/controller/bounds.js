import {BOT} from "../script/bot/model";
import {BOT_STATES} from "../script/bot/const";
import {PLAYER} from "../script/player/model";
import {PLAYER_STATES} from "../script/player/const";
import {POINTS} from "../script/point/model"
import {POINT_STATES, POINT_TYPES} from "../script/point/const";
import {GAME} from "../script/game/model";
import {playLaserAppearance} from "../sound/laserAppearanceAudio";

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
                playLaserAppearance();
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
                playLaserAppearance();
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

export function checkCollisions() {
    checkBorderGameBounds();
    checkLaserBounds();
}
