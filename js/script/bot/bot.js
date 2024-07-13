import {BOT_STATES, DEFAULT_BOTS} from './const'
import {Bot} from './model'
import {GAME} from "../game/model";
import {POINTS} from "../point/model";
import {POINT_STATES} from "../point/const";
import {ctx, activeBots, requiredBots} from "../../script"
import {yellow} from "../game/const";

export function createBots() {
    //в requiredBots передается массив с позициями(placeId), на которых надо создать ботов
    let createdBots = [];
    let i = 0;
    requiredBots.forEach(placeId => {
        createdBots[i] = new Bot(placeId);
        i++;
    });
    return createdBots;
}

export function drawBot() {
    activeBots.forEach(bot => {
        if (bot.isAlive) {
            ctx.fillStyle = bot.getColor();
            ctx.fillRect(bot.getX(), bot.getY(), bot.getSize(), bot.getSize());
        }
        // if (bot.isDead) {
        //     setTimeout(() => {
        //         bot.setColor(yellow);
        //         bot.setX(botStartX);
        //         bot.setY(botStartY);
        //         bot.setState(BOT_STATES.ACTIVE);
        //     }, 1000)
        // }
    });
}

export function resetAllBots() {
    for (let i = 0; i < activeBots.length; i++) {
        activeBots[i].setX(DEFAULT_BOTS.x[requiredBots[i]]);
        activeBots[i].setY(DEFAULT_BOTS.y[requiredBots[i]]);
        activeBots[i].renaissance();
    }
}

export function botMovement(dt, activeBots) {
    activeBots.forEach(bot => {
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
        findNearestPoint(POINTS);
        if (inRangeOfLaser) {
            moveBotOutOfLaserSpiral(); // заносит в dxActive и dyActive приращение для убегания по спирали
        }
        moveBotToLaser(); // заносит в dxInactive и dyInactive приращение для движения к цели
        getRightDirection(); // дает приоритет убеганию, контролирует предельную скорость


        function findNearestPoint(POINTS) {
            POINTS.forEach(point => {
                findInactivePointAndCompare(point);
                findActivePointInArea(point);
            });
        }

        function findInactivePointAndCompare(point) {
            if (point.state === POINT_STATES.INACTIVE) {
                if (loopIndexInactive === 0) {
                    idInactive = 0;
                    dxMinInactive = point.x - bot.getX();
                    dyMinInactive = point.y - bot.getY();
                    hypMinInactive = Math.sqrt(dxMinInactive ** 2 + dyMinInactive ** 2);
                }
                let dy;
                let dx;

                if (Math.abs(point.y + (GAME.height - bot.getY())) < Math.abs(point.y - bot.getY())) {
                    dy = point.y + (GAME.height - bot.getY());
                } else {
                    dy = point.y - bot.getY();
                }
                if (Math.abs(point.x + (GAME.width - bot.getX())) < Math.abs(point.x - bot.getX())) {
                    dx = point.x + (GAME.width - bot.getX());
                } else {
                    dx = point.x - bot.getX();
                }
                let hyp = Math.sqrt(dx ** 2 + dy ** 2);
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

            if (point.state === POINT_STATES.ACTIVE) {
                if (loopIndexActive === 0) {
                    idInactive = 0;
                    dxMinActive = point.x - bot.getX();
                    dyMinActive = point.y - bot.getY();
                    hypMinActive = Math.sqrt(dxMinActive ** 2 + dyMinActive ** 2);
                }
                let dx = point.x - bot.getX();
                let dy = point.y - bot.getY();
                let hyp = Math.sqrt(dx ** 2 + dy ** 2);
                if (hyp < hypMinActive) {
                    idActive = point.id;
                    dxMinActive = dx;
                    dyMinActive = dy;
                    hypMinActive = hyp;
                }
                inRangeOfLaser = (hypMinActive - bot.getSize() * Math.sqrt(2) < point.size / 2);
                loopIndexActive++;
            }
        }

        function moveBotToLaser() {
            dxInactive = bot.getSpeed() * dxMinInactive / hypMinInactive * dt;
            dyInactive = bot.getSpeed() * dyMinInactive / hypMinInactive * dt;
        }

        function moveBotOutOfLaserSpiral() {
            // Определяем угол между ботом и точкой
            const angle = Math.atan2(dyMinActive, dxMinActive);

            // Радиальная скорость (от центра прочь)
            const radialSpeed = bot.getSpeed() * dt;

            // Угловая скорость (по окружности)
            const angularSpeed = bot.getSpeed() * dt / hypMinActive;
            // Обновляем координаты бота
            dxActive = angularSpeed * Math.sin(angle) * hypMinActive - radialSpeed * Math.cos(angle);
            dyActive = (-1) * (radialSpeed * Math.sin(angle) + angularSpeed * Math.cos(angle) * hypMinActive);
        }

        function getRightDirection() {
            if (inRangeOfLaser) {
                if ((dxActive * dxInactive >= 0) && (dyActive * dyInactive >= 0)) {
                    if (Math.sqrt((dxActive + dxInactive) ** 2 + (dyActive + dyInactive) ** 2) < bot.getSpeed() * dt) {
                        bot.moveOn(dxActive + dxInactive, 
                            dyActive + dyInactive
                        );
                    } else {
                        const angle = Math.atan2(dyActive + dyInactive, dxActive + dxInactive);
                        bot.moveOn(bot.getSpeed() * dt * Math.cos(angle), 
                            bot.getSpeed() * dt * Math.sin(angle)
                        );
                    }
                }
                if ((dxActive * dxInactive >= 0) && (dyActive * dyInactive < 0)) {
                    if (Math.sqrt((dxActive + dxInactive) ** 2 + (dyActive) ** 2) < bot.getSpeed() * dt) {
                        bot.moveOn(dxActive + dxInactive, 
                            dyActive
                        );
                    } else {
                        const angle = Math.atan2(dyActive, dxActive + dxInactive);
                        bot.moveOn(bot.getSpeed() * dt * Math.cos(angle), 
                            bot.getSpeed() * dt * Math.sin(angle)
                        );
                    }
                }
                if ((dxActive * dxInactive < 0) && (dyActive * dyInactive >= 0)) {
                    if (Math.sqrt((dxActive) ** 2 + (dyActive + dyInactive) ** 2) < bot.getSpeed() * dt) {
                        bot.moveOn(dxActive, 
                            dyActive + dyInactive
                        );
                    } else {
                        const angle = Math.atan2(dyActive + dyInactive, dxActive);
                        bot.moveOn(bot.getSpeed() * dt * Math.cos(angle), 
                            bot.getSpeed() * dt * Math.sin(angle)
                        );
                    }
                }
                if ((dxActive * dxInactive < 0) && (dyActive * dyInactive < 0)) {
                    if (Math.sqrt((dxActive) ** 2 + (dyActive) ** 2) < bot.getSpeed() * dt) {
                        bot.moveOn(dxActive, 
                            dyActive
                        );
                    } else {
                        const angle = Math.atan2(dyActive, dxActive);
                        bot.moveOn(bot.getSpeed() * dt * Math.cos(angle), 
                            bot.getSpeed() * dt * Math.sin(angle)
                        );
                    }
                }
            } else {
                bot.moveOn(dxInactive, 
                    dyInactive
                );
            }
        }
    });
    
}