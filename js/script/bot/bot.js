import { BOT_STATES, DEFAULT_BOTS } from './const';
import { Bot } from './model';
import { GAME } from '../game/model';
import { Point } from '../point/model.mjs';
import { POINT_STATES } from '../point/const.mjs';
import { ctx, activeBots, requiredBots, points, readyBonuses } from '../../script.mjs';
import { yellow } from '../game/const.mjs';

export function createBots() {
    //в requiredBots передается массив с позициями(placeId), на которых надо создать ботов
    const createdBots = [];
    let i = 0;
    requiredBots.forEach((placeId) => {
        createdBots[i] = new Bot(placeId);
        i++;
    });
    return createdBots;
}

export function initBotAnimation() {
    activeBots.forEach(bot => {
        bot.setImage("./src/assets/sprites/bot/left.png");
        bot.getImage().onload = () => {
            bot.setLoad(true);
        }
    })
}
// переписать drawcharacters
export function drawBot() {

    const endAnimation = 9;
    const spriteSize = 64;

    activeBots.forEach((bot) => {
        if (bot.isAlive() || bot.isStunned()) {
            ctx.fillStyle = bot.getColor();
            ctx.fillRect(bot.getX(), bot.getY(), bot.getSize(), bot.getSize());
            console.log(bot.getCount());
            if (bot.getLoad() === true) {
                switch (bot.getDirection()) {
                    case "up":
                        bot.setImage("./src/assets/sprites/bot/up.png");
                        break;
                    case "down":
                        bot.setImage("./src/assets/sprites/bot/down.png");
                        break;
                    case "left":
                        bot.setImage("./src/assets/sprites/bot/left.png");
                        break;
                    case "right":
                        bot.setImage("./src/assets/sprites/bot/right.png");
                        break;
                }
                ctx.drawImage(
                    bot.getImage(),
                    spriteSize * bot.getCount(),
                    0,
                    spriteSize,
                    spriteSize,
                    bot.getX() - (spriteSize / 2 - bot.getSize() / 2),
                    bot.getY() - (spriteSize / 2 - bot.getSize() / 2),
                    spriteSize,
                    spriteSize
                );
                bot.setTick(bot.getTick() + 1);
                if (bot.getTick() >= 2) {
                    bot.setCount(bot.getCount() + 1);
                    bot.setTick(0);
                }
            }
            if (bot.getCount() === endAnimation) {
                bot.setCount(0);
            }
        }
        if (bot.isStunned() && bot.stunnedUntil < Date.now()) {
            bot.recoverFromStunned();
        }
        if (bot.isStunned()) {
            bot.drawCountdown();
        }
    });
}

export function resetAllBots() {
    for (let i = 0; i < activeBots.length; i++) {
        activeBots[i].setX(DEFAULT_BOTS.x[requiredBots[i]]);
        activeBots[i].setY(DEFAULT_BOTS.y[requiredBots[i]]);
        activeBots[i].renaissance();
    }
}

export function botMovement(dt) {
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
            if (point.isInactive()) {
                if (loopIndexInactive === 0) {
                    idInactive = 0;
                    dxMinInactive = point.getX() - bot.getX();
                    dyMinInactive = point.getY() - bot.getY();
                    hypMinInactive = Math.sqrt(
                        dxMinInactive ** 2 + dyMinInactive ** 2
                    );
                }
                let dy;
                let dx;

                if (
                    Math.abs(point.getY() + (GAME.height - bot.getY())) <
                    Math.abs(point.getY() - bot.getY())
                ) {
                    dy = point.getY() + (GAME.height - bot.getY());
                } else {
                    dy = point.getY() - bot.getY();
                }
                if (
                    Math.abs(point.getX() + (GAME.width - bot.getX())) <
                    Math.abs(point.getX() - bot.getX())
                ) {
                    dx = point.getX() + (GAME.width - bot.getX());
                } else {
                    dx = point.getX() - bot.getX();
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
            if (point.isActive()) {
                if (loopIndexActive === 0) {
                    idInactive = 0;
                    dxMinActive = point.getX() - bot.getX();
                    dyMinActive = point.getY() - bot.getY();
                    hypMinActive = Math.sqrt(
                        dxMinActive ** 2 + dyMinActive ** 2
                    );
                }
                const dx = point.getX() - bot.getX();
                const dy = point.getY() - bot.getY();
                const hyp = Math.sqrt(dx ** 2 + dy ** 2);
                if (hyp < hypMinActive) {
                    idActive = point.getId();
                    dxMinActive = dx;
                    dyMinActive = dy;
                    hypMinActive = hyp;
                }
                inRangeOfLaser =
                    hypMinActive - bot.getSize() * Math.sqrt(2) <
                    point.getSize() / 2;
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

                bot.moveOn(
                    speed * Math.cos(angleToBonus),
                    speed * Math.sin(angleToBonus)
                );
            } else {
            if (inRangeOfLaser) {
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
