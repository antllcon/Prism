const BotConsts = require('./const.js');
const Bot = require('./model.js');
const GAME_CONSTS = require('../consts.js')

class BotFunctions {
    createBots(requiredBots) {
        //в requiredBots передается массив с позициями(placeId), на которых надо создать ботов
        const createdBots = [];
        let i = 0;
        requiredBots.forEach((placeId) => {
            createdBots[i] = new Bot(placeId);
            i++;
        });
        return createdBots;
    }
    
    resetAllBots(requiredBots, activeBots) {
        for (let i = 0; i < activeBots.length; i++) {
            activeBots[i].x = BotConsts.DEFAULT_BOTS.x[requiredBots[i]];
            activeBots[i].y = BotConsts.DEFAULT_BOTS.y[requiredBots[i]];
            activeBots[i].state = BotConsts.BOT_STATES.ACTIVE;
        }
    }
    
    botMovement(dt, activeBots, points, readyBonuses) {
        activeBots.forEach((bot) => {
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
            findNearestPoint();
            if (inRangeOfLaser) {
                moveBotOutOfLaserSpiral();
            }
            moveBotToLaser();
            getRightDirection();
    
            function findNearestPoint() {
                points.forEach((point) => {
                    findInactivePointAndCompare(point);
                    findActivePointInArea(point);
                });
            }
    
            function findInactivePointAndCompare(point) {
                if (point.state === GAME_CONSTS.POINT_STATES.INACTIVE) {
                    if (loopIndexInactive === 0) {
                        idInactive = 0;
                        dxMinInactive = point.x - bot.getX();
                        dyMinInactive = point.y - bot.getY();
                        hypMinInactive = Math.sqrt(
                            dxMinInactive ** 2 + dyMinInactive ** 2
                        );
                    }
                    let dy;
                    let dx;
    
                    if (
                        Math.abs(point.y + (GAME_CONSTS.canvasHeight - bot.getY())) <
                        Math.abs(point.y - bot.getY())
                    ) {
                        dy = point.y + (GAME_CONSTS.canvasHeight - bot.getY());
                    } else {
                        dy = point.y - bot.getY();
                    }
                    if (
                        Math.abs(point.x + (GAME_CONSTS.canvasWidth - bot.getX())) <
                        Math.abs(point.x - bot.getX())
                    ) {
                        dx = point.x + (GAME_CONSTS.canvasWidth - bot.getX());
                    } else {
                        dx = point.x - bot.getX();
                    }
                    const hyp = Math.sqrt(dx ** 2 + dy ** 2);
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
                if (point.state === GAME_CONSTS.POINT_STATES.ACTIVE && point.team !== bot.team) {
                    if (loopIndexActive === 0) {
                        idInactive = 0;
                        dxMinActive = point.x - bot.getX();
                        dyMinActive = point.y - bot.getY();
                        hypMinActive = Math.sqrt(
                            dxMinActive ** 2 + dyMinActive ** 2
                        );
                    }
                    const dx = point.x - bot.getX();
                    const dy = point.y - bot.getY();
                    const hyp = Math.sqrt(dx ** 2 + dy ** 2);
                    if (hyp < hypMinActive) {
                        idActive = point.id;
                        dxMinActive = dx;
                        dyMinActive = dy;
                        hypMinActive = hyp;
                    }
                    inRangeOfLaser =
                        hypMinActive - bot.getSize() * Math.sqrt(2) <
                        point.size / 2;
                    loopIndexActive++;
                }
            }
    
            function moveBotToLaser() {
                dxInactive =
                    ((bot.getSpeed() * dxMinInactive) / hypMinInactive) * dt;
                dyInactive =
                    ((bot.getSpeed() * dyMinInactive) / hypMinInactive) * dt;
            }
    
            function moveBotOutOfLaserSpiral() {
                const angle = Math.atan2(dyMinActive, dxMinActive);
                const radialSpeed = bot.getSpeed() * dt;
                const angularSpeed = (bot.getSpeed() * dt) / hypMinActive;
                dxActive =
                    angularSpeed * Math.sin(angle) * hypMinActive -
                    radialSpeed * Math.cos(angle);
                dyActive =
                    -1 *
                    (radialSpeed * Math.sin(angle) +
                        angularSpeed * Math.cos(angle) * hypMinActive);
            }
    
            function getRightDirection() {
                let closestBonus = null;
                let closestDistance = Infinity;
    
                readyBonuses.forEach((bonus) => {
                    const dx = bot.x - bonus.x;
                    const dy = bot.y - bonus.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
    
                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestBonus = bonus;
                    }
                });
    
                if (closestBonus && (closestDistance < hypMinActive)) {
                    // Проверка, куда ближе
                    // резуальтат проверки: если ближе бонус, завершаем тело if
                    // если ближе поинт, идем в else
                    const dxBonus = closestBonus.x - bot.x;
                    const dyBonus = closestBonus.y - bot.y;
                    const angleToBonus = Math.atan2(dyBonus, dxBonus);
                    const speed = bot.speed * dt;
    
                    bot.moveOn(
                        speed * Math.cos(angleToBonus),
                        speed * Math.sin(angleToBonus)
                    );
                } else {
                if (inRangeOfLaser ) {
                    if ((dxActive * dxInactive >= 0) && (dyActive * dyInactive >= 0)) {
                        if (Math.sqrt((dxActive + dxInactive) ** 2 + (dyActive + dyInactive) ** 2) < bot.getSpeed() * dt) {
                            bot.moveOn(dxActive + dxInactive, dyActive + dyInactive);
                        } else {
                            const angle = Math.atan2(dyActive + dyInactive, dxActive + dxInactive);
                            bot.moveOn(bot.getSpeed() * dt * Math.cos(angle), bot.getSpeed() * dt * Math.sin(angle));
                        }
                    }
                    if ((dxActive * dxInactive >= 0) && (dyActive * dyInactive < 0)) {
                        if (Math.sqrt((dxActive + dxInactive) ** 2 + (dyActive) ** 2) < bot.getSpeed() * dt) {
                            bot.moveOn(dxActive + dxInactive, dyActive);
                        } else {
                            const angle = Math.atan2(dyActive, dxActive + dxInactive);
                            bot.moveOn(bot.getSpeed() * dt * Math.cos(angle), bot.getSpeed() * dt * Math.sin(angle));
                        }
                    }
                    if ((dxActive * dxInactive < 0) && (dyActive * dyInactive >= 0)) {
                        if (Math.sqrt((dxActive) ** 2 + (dyActive + dyInactive) ** 2) < bot.getSpeed() * dt) {
                            bot.moveOn(dxActive, dyActive + dyInactive);
                        } else {
                            const angle = Math.atan2(dyActive + dyInactive, dxActive);
                            bot.moveOn(bot.getSpeed() * dt * Math.cos(angle), bot.getSpeed() * dt * Math.sin(angle));
                        }
                    }
                    if ((dxActive * dxInactive < 0) && (dyActive * dyInactive < 0)) {
                        if (Math.sqrt((dxActive) ** 2 + (dyActive) ** 2) < bot.getSpeed() * dt) {
                            bot.moveOn(dxActive, dyActive);
                        } else {
                            const angle = Math.atan2(dyActive, dxActive);
                            bot.moveOn(bot.getSpeed() * dt * Math.cos(angle), bot.getSpeed() * dt * Math.sin(angle));
                        }
                    }
                } else {
                    bot.moveOn(dxInactive, dyInactive);
                }
                updateBotDirection(bot, dxInactive, dyInactive); // Добавляем обновление направления
            }
    
            function updateBotDirection(bot, dx, dy) {
                if (Math.abs(dx) > Math.abs(dy)) {
                    if (dx > 0) {
                        bot.setDirection("right");
                    } else {
                        bot.setDirection("left");
                    }
                } else {
                    if (dy > 0) {
                        bot.setDirection("down");
                    } else {
                        bot.setDirection("up");
                    }
                }
            }}
        });

        // Check collisions border
        activeBots.forEach((bot) => {
            if (bot.x < 0) {
                // console.log(game.getWidth(), "getwidth bounds js")
                bot.x = (GAME_CONSTS.canvasWidth - bot.size);
            } else if (bot.x + bot.size > GAME_CONSTS.canvasWidth) {
                bot.x = 0;
            }
        
            if (bot.y < 0) {
                bot.y = (GAME_CONSTS.canvasHeight - bot.size);
            } else if (bot.y + bot.size > GAME_CONSTS.canvasHeight) {
                bot.y = 0;
            }
        });
    }
    findBotById(bots, id) {
        let foundBot;
        bots.forEach(bot => {
            if (bot.getId() === id)
            foundBot = bot;
        });
        return foundBot;
    }
    updateBots(bots) {
        data[bots].foreach(botFromServer => {
            const bot = findBotById(botFromServer.id);
            updateBot(bot, botFromServer);
        })
    }
    updateBot(bot, botFromServer) {
        botFromServer.y ? bot.setY(botFromServer.y) : null;
        botFromServer.x ? bot.setX(botFromServer.x) : null;
        botFromServer.team ? bot.setTeam(botFromServer.team) : null;
        botFromServer.color ? bot.setColor(botFromServer.color) : null;
        botFromServer.state ? bot.setState(botFromServer.state) : null;
    }
    
    
    /* let closestBonus = null;
                let closestDistance = Infinity;
    
                bonuses.forEach(bonus => {
                    const dx = bot.x - bonus.getX();
                    const dy = bot.y - bonus.getY();
                    const distance = Math.sqrt(dx * dx + dy * dy);
    
                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestBonus = bonus;
                    }
                });
    
                if (closestBonus) {
                    const dxBonus = closestBonus.getX() - bot.x;
                    const dyBonus = closestBonus.getY() - bot.y;
                    const angleToBonus = Math.atan2(dyBonus, dxBonus);
                    const speed = bot.getSpeed() * dt;
    
                    bot.moveOn(speed * Math.cos(angleToBonus), speed * Math.sin(angleToBonus));
                } else {*/
}
module.exports = BotFunctions;
