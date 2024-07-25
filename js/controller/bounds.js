import {Bot} from '../script/bot/model';
import {BOT_STATES} from '../script/bot/const';
import {getMyPlayer} from '../script/player/player';
import {activePlayers, activeBots, points, socket} from '../script';
import {POINT_STATES, POINT_TYPES} from '../script/point/const';
import {GAME, game} from '../script/game/model';
import {SIZE as SIZE_PB} from '../script/player/progressBar/progressBar';
import {PLAYER_STATES} from '../script/player/const';

function checkLaserBounds() {

    points.forEach(point => {
        activePlayers.forEach(player => {
            if (player.invisibleLasers) {
                return;
            }
            const sin = Math.sin(point.angle);
            const cos = Math.cos(point.angle);

            const playerCorners = [
                {x: player.x, y: player.y},
                {x: player.x + player.size, y: player.y},
                {x: player.x, y: player.y + player.size},
                {x: player.x + player.size, y: player.y + player.size}
            ];

            for (const corner of playerCorners) {
                const dx = corner.x - point.x;
                const dy = corner.y - point.y;
                const rotatedX = cos * dx + sin * dy;
                const rotatedY = -sin * dx + cos * dy;
                if (point.isInactive() &&
                    rotatedX > -point.getWidth() / 2 && rotatedX < point.getWidth() / 2 &&
                    rotatedY > -point.getHeight() / 2 && rotatedY < point.getHeight() / 2) {
                    point.setActive();
                    point.setTeam(player.team);
                    point.setActivationTime(Date.now());
                }
                if (point.isActive()) {
                    if (point.isTypeCross() && point.getTeam() !== player.team) {
                        if ((Math.abs(rotatedX) < point.size / 2 && Math.abs(rotatedY) < point.getWidth() / 2) ||
                            (Math.abs(rotatedY) < point.size / 2 && Math.abs(rotatedX) < point.getWidth() / 2)) {
                            player.state = BOT_STATES.DEAD;
                        }
                    }
                    if (point.isTypeTrigraph() && point.getTeam() !== player.team) {
                        const angles = [0, 2 * Math.PI / 3, -2 * Math.PI / 3];
                        angles.forEach(angle => {
                            const angleSin = Math.sin(angle);
                            const angleCos = Math.cos(angle);
                            const rotatedRayX = angleCos * rotatedX - angleSin * rotatedY;
                            const rotatedRayY = angleSin * rotatedX + angleCos * rotatedY;
                            if (rotatedRayX > 0 && rotatedRayX < point.size / 2 && Math.abs(rotatedRayY) < point.getHeight() / 2) {
                                player.state = PLAYER_STATES.DEAD;
                            }
                        });
                    }
                    if (point.isTypeLine() && point.getTeam() !== player.team) {
                        if (corner.y >= point.y - point.getWidth() / 2 && corner.y <= point.y + point.getWidth() / 2 &&
                            corner.x >= point.x - point.size / 2 && corner.x <= point.x + point.size / 2) {
                            player.state = PLAYER_STATES.DEAD;
                        }
                    }
                }
            }
            activeBots.forEach(bot => {
                const botCorners = [
                    {x: bot.x, y: bot.y},
                    {x: bot.x + bot.size, y: bot.y},
                    {x: bot.x, y: bot.y + bot.size},
                    {x: bot.x + bot.size, y: bot.y + bot.size}
                ];
                for (const corner of botCorners) {
                    const dx = corner.x - point.x;
                    const dy = corner.y - point.y;
                    const rotatedX = cos * dx + sin * dy;
                    const rotatedY = -sin * dx + cos * dy;
                    if (point.isInactive() &&
                        rotatedX > -point.getWidth() / 2 && rotatedX < point.getWidth() / 2 &&
                        rotatedY > -point.getHeight() / 2 && rotatedY < point.getHeight() / 2) {
                        point.setActive();
                        point.setTeam(bot.team);
                        point.setActivationTime(Date.now());
                    }
                    if (point.isActive()) {
                        if (point.isTypeCross() && point.getTeam() !== bot.team) { // Крест
                            if ((Math.abs(rotatedX) < point.size / 2 && Math.abs(rotatedY) < point.getWidth() / 2) ||
                                (Math.abs(rotatedY) < point.size / 2 && Math.abs(rotatedX) < point.getWidth() / 2)) {
                                bot.state = BOT_STATES.DEAD;
                                socket.emit('updateEntityParams', bot)
                            }
                        }
                        if (point.isTypeTrigraph() && point.getTeam() !== bot.team) { // Три-радиус
                            const angles = [0, 2 * Math.PI / 3, -2 * Math.PI / 3]; // 0, 120, -120 углы
                            angles.forEach(angle => {
                                const angleSin = Math.sin(angle);
                                const angleCos = Math.cos(angle);
                                const rotatedRayX = angleCos * rotatedX - angleSin * rotatedY;
                                const rotatedRayY = angleSin * rotatedX + angleCos * rotatedY;
                                if (rotatedRayX > 0 && rotatedRayX < point.size / 2 && Math.abs(rotatedRayY) < point.getHeight() / 2) {
                                    bot.state = BOT_STATES.DEAD;
                                    socket.emit('updateEntityParams', bot)
                                }
                            });
                        }
                        if (point.isTypeLine() && point.getTeam() !== bot.team) {
                            if (corner.y >= point.y - point.getWidth() / 2 && corner.y <= point.y + point.getWidth() / 2 &&
                                corner.x >= point.x - point.size / 2 && corner.x <= point.x + point.size / 2) {
                                bot.state = BOT_STATES.DEAD;
                                socket.emit('updateEntityParams', bot)
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
    if (player.x < 0) {
        player.x = (game.getWidth() - player.size);
    } else if (player.x + player.size > game.getWidth()) {
        player.x = (0);
    }
    if (player.y < 0) {
        player.y = (game.getHeight() - player.size);
    } else if (player.y + player.size > game.getHeight()) {
        player.y = (0);
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
        player.progressBar.y = game.getHeight() - player.size;
    } else if (
        player.progressBar.y + player.progressBar.height >
        game.getHeight()
    ) {
        player.progressBar.y = player.progressBar.height + 20;
    }

    // activeBots.forEach((bot) => {
    //     if (bot.x < 0) {
    //         // console.log(game.getWidth(), "getwidth bounds js")
    //         bot.x = (game.getWidth() - bot.size);
    //     } else if (bot.x + bot.size > game.getWidth()) {
    //         bot.x = 0;
    //     }

    //     if (bot.y < 0) {
    //         bot.y = (game.getHeight() - bot.size);
    //     } else if (bot.y + bot.size > game.getHeight()) {
    //         bot.y = 0;
    //     }
    // });
}

function checkAbilityToJostle() {
    const player = getMyPlayer(activePlayers);
    if (!player.abilityActive) {
        return;
    }

    const playerRect = {
        x: player.x,
        y: player.y,
        width: player.size,
        height: player.size,
    };

    const botsAndPlayers = activeBots.concat(activePlayers);

    botsAndPlayers.forEach((entity) => {
        if (!entity.main) {
            const entityRect = {
                x: entity.x,
                y: entity.y,
                width: entity.size,
                height: entity.size,
            };

            if (checkRectCollision(playerRect, entityRect)) {
                const dx = player.x - entity.x;
                const dy = player.y - entity.y;
                //если dx меньше чем размер игрока, то толкаем по вертикали
                // если dy меньше чем размер игрока то толкаем по горизонтали

                const distance = Math.sqrt(dx * dx + dy * dy);
                const pushForce = 200;

                if (dx < 0 && dy < 40) {
                    entity.x += (-dx / distance) * pushForce;
                }

                if (dx > 0 && dy < 40) {
                    entity.x += (dx / distance) * pushForce;
                }

                if (dy < 0 && dx < 40) {
                    entity.y += (-dy / distance) * pushForce;
                }

                if (dy > 0 && dx < 40) {
                    entity.y += (dy / distance) * pushForce;
                }

                /*


                if ( dx > 0)
                {
                    entity.x += (-dx / distance) * pushForce;
                    entity.y += (-dy / distance) * Math.sqrt(pushForce);
                }

                if (dy < 0)
                {
                    entity.x += (-dx / distance) * pushForce;
                    entity.y += (-dy / distance) * Math.sqrt(pushForce);
                }*/
                socket.emit('updateEntityParams', entity)
            }
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

    activePlayers.forEach((player) => {
        bonuses.forEach((bonus) => {
            const dx = player.x - bonus.getX();
            const dy = player.y - bonus.getY();
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < player.size + bonus.getSize()) {
                bonus.catch(player, activeBots, activePlayers);
                bonuses.splice(bonuses.indexOf(bonus), 1);
            }
        });
    })
    activeBots.forEach((bot) => {
        bonuses.forEach((bonus) => {
            const dx = bot.x - bonus.getX();
            const dy = bot.y - bonus.getY();
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < bot.size + bonus.getSize()) {
                bonus.catch(bot, activeBots, activePlayers);
                console.log(bonuses);
                console.log('bonuses before')
                bonuses.splice(bonuses.indexOf(bonus), 1);
                console.log(bonuses);
                console.log('bonuses after')
                // socket.emit
            }
        });
    });
}

export function checkCollisions(bonuses) {
    checkBorderGameBounds();
    checkLaserBounds();
    checkAbilityToJostle();
    checkPlayerBotBonusCollision(bonuses);
}
