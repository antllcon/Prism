import { Bot } from '../script/bot/model';
import { BOT_STATES } from '../script/bot/const';
import { getMyPlayer } from '../script/player/player';
import { Player } from '../script/player/model';
import { activePlayers, activeBots, points } from '../script';
import { POINT_STATES, POINT_TYPES } from '../script/point/const';
import { GAME, game } from '../script/game/model';
import { SIZE as SIZE_PB } from '../script/player/progressBar/progressBar';

function checkLaserBounds() {

    points.forEach(point => {
        // let player = getMyPlayer(activePlayers);
        activePlayers.forEach(player => {
            if (player.isInvisibleLasers()) {
                return;
            }
            const sin = Math.sin(point.angle);
            const cos = Math.cos(point.angle);

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
            // Проверка коллизий с лазерами
            if (point.isActive()) {
                if (
                    point.isTypeCross() &&
                    point.getTeam() !== player.getTeam()
                ) {
                    // Крест
                    if (
                        (Math.abs(rotatedX) < point.getSize() / 2 &&
                            Math.abs(rotatedY) < point.getWidth() / 2) ||
                        (Math.abs(rotatedY) < point.getSize() / 2 &&
                            Math.abs(rotatedX) < point.getWidth() / 2)
                    ) {
                        player.die();
                    }
                }
                if (
                    point.isTypeTrigraph() &&
                    point.getTeam() !== player.getTeam()
                ) {
                    // Три-радиус
                    const angles = [0, (2 * Math.PI) / 3, (-2 * Math.PI) / 3]; // 0, 120, -120 углы

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
                    // рассчитываем удаленность угловой точки игрока от центра лазера
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

    });
}

function checkBorderGameBounds() {
    const player = getMyPlayer(activePlayers);
    if (player.getX() < 0) {
        player.setX(game.getWidth() - player.getSize());
    } else if (player.getX() + player.getSize() > game.getWidth()) {
        player.setX(0);
    }
    if (player.getY() < 0) {
        player.setY(game.getHeight() - player.getSize());
    } else if (player.getY() + player.getSize() > game.getHeight()) {
        player.setY(0);
    }

    if (player.progressBar.x < 0) {
        player.progressBar.x = game.getWidth() - player.progressBar.width;
    } else if (
        player.progressBar.x + player.progressBar.width >
        game.getWidth()
    ) {
        player.progressBar.x = 0;
    }

    if (player.progressBar.y < 0) {
        player.progressBar.y = game.getHeight() - player.getSize();
    } else if (
        player.progressBar.y + player.progressBar.height >
        game.getHeight()
    ) {
        player.progressBar.y = player.progressBar.height + 20;
    }

    activeBots.forEach((bot) => {
        if (bot.getX() < 0) {
            // console.log(game.getWidth(), "getwidth bounds js")
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

function checkPlayerBotCollisions() {
    const player = getMyPlayer(activePlayers);
    if (!player.abilityActive) {
        return;
    }

    const playerRect = {
        x: player.getX(),
        y: player.getY(),
        width: player.getSize(),
        height: player.getSize(),
    };

    activeBots.forEach((bot) => {
        const botRect = {
            x: bot.getX(),
            y: bot.getY(),
            width: bot.getSize(),
            height: bot.getSize(),
        };

        if (checkRectCollision(playerRect, botRect)) {
            const dx = player.getX() - bot.getX();
            const dy = player.getY() - bot.getY();
            const distance = Math.sqrt(dx * dx + dy * dy);
            const pushForce = 30;
            bot.moveOn(
                (-dx / distance) * pushForce,
                (-dy / distance) * pushForce
            );
        }
    });
}

function checkRectCollision(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}

function checkPlayerBotBonusCollision(bonuses) {
    const player = getMyPlayer(activePlayers);

    bonuses.forEach((bonus) => {
        const dx = player.x - bonus.getX();
        const dy = player.y - bonus.getY();
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < player.size + bonus.getSize()) {
            bonus.catch(player, activeBots, activePlayers);
            bonuses.splice(bonuses.indexOf(bonus), 1);
        }
    });
    activeBots.forEach((bot) => {
        bonuses.forEach((bonus) => {
            const dx = bot.x - bonus.getX();
            const dy = bot.y - bonus.getY();
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < bot.size + bonus.getSize()) {
                bonus.catch(bot, activeBots, activePlayers);
                bonuses.splice(bonuses.indexOf(bonus), 1);
            }
        });
    });
}

export function checkCollisions(bonuses) {
    checkBorderGameBounds();
    checkLaserBounds();
    checkPlayerBotCollisions();
    checkPlayerBotBonusCollision(bonuses);
}
