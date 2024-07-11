import {BOT_STATES, botStartX, botStartY} from './const'
import {BOT} from './model'
import {ctx, GAME} from "../game/model";
import {POINTS} from "../point/model";
import {POINT_STATES} from "../point/const";

export function drawBot() {
    if (BOT.state === BOT_STATES.ACTIVE) {
        ctx.fillStyle = BOT.color;
        ctx.fillRect(BOT.x, BOT.y, BOT.size, BOT.size);
    }
    if (BOT.state === BOT_STATES.DEAD) {
        setTimeout(() => {
            BOT.color = yellow;
            BOT.x = botStartX;
            BOT.y = botStartY;
            BOT.state = BOT_STATES.ACTIVE;
        }, 1000)
    }
}

export function botMovement(dt) {
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
                dxMinInactive = point.x - BOT.x;
                dyMinInactive = point.y - BOT.y;
                hypMinInactive = Math.sqrt(dxMinInactive ** 2 + dyMinInactive ** 2);
            }
            let dy;
            let dx;

            if (Math.abs(point.y + (GAME.height - BOT.y)) < Math.abs(point.y - BOT.y)) {
                dy = point.y + (GAME.height - BOT.y);
            } else {
                dy = point.y - BOT.y;
            }
            if (Math.abs(point.x + (GAME.width - BOT.x)) < Math.abs(point.x - BOT.x)) {
                dx = point.x + (GAME.width - BOT.x);
            } else {
                dx = point.x - BOT.x;
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
                dxMinActive = point.x - BOT.x;
                dyMinActive = point.y - BOT.y;
                hypMinActive = Math.sqrt(dxMinActive ** 2 + dyMinActive ** 2);
            }
            let dx = point.x - BOT.x;
            let dy = point.y - BOT.y;
            let hyp = Math.sqrt(dx ** 2 + dy ** 2);
            if (hyp < hypMinActive) {
                idActive = point.id;
                dxMinActive = dx;
                dyMinActive = dy;
                hypMinActive = hyp;
            }
            inRangeOfLaser = (hypMinActive - BOT.size * Math.sqrt(2) < point.size / 2);
            loopIndexActive++;
        }
    }

    function moveBotToLaser() {
        dxInactive = BOT.speed * dxMinInactive / hypMinInactive * dt;
        dyInactive = BOT.speed * dyMinInactive / hypMinInactive * dt;
    }

    function moveBotOutOfLaserSpiral() {
        // Определяем угол между ботом и точкой
        const angle = Math.atan2(dyMinActive, dxMinActive);

        // Радиальная скорость (от центра прочь)
        const radialSpeed = BOT.speed * dt;

        // Угловая скорость (по окружности)
        const angularSpeed = BOT.speed * dt / hypMinActive;
        // Обновляем координаты бота
        dxActive = angularSpeed * Math.sin(angle) * hypMinActive - radialSpeed * Math.cos(angle);
        dyActive = (-1) * (radialSpeed * Math.sin(angle) + angularSpeed * Math.cos(angle) * hypMinActive);
    }

    function getRightDirection() {
        if (inRangeOfLaser) {
            if ((dxActive * dxInactive >= 0) && (dyActive * dyInactive >= 0)) {
                if (Math.sqrt((dxActive + dxInactive) ** 2 + (dyActive + dyInactive) ** 2) < BOT.speed * dt) {
                    BOT.x += dxActive + dxInactive;
                    BOT.y += dyActive + dyInactive;
                } else {
                    const angle = Math.atan2(dyActive + dyInactive, dxActive + dxInactive);
                    BOT.x += BOT.speed * dt * Math.cos(angle);
                    BOT.y += BOT.speed * dt * Math.sin(angle);
                }
            }
            if ((dxActive * dxInactive >= 0) && (dyActive * dyInactive < 0)) {
                if (Math.sqrt((dxActive + dxInactive) ** 2 + (dyActive) ** 2) < BOT.speed * dt) {
                    BOT.x += dxActive + dxInactive;
                    BOT.y += dyActive;
                } else {
                    const angle = Math.atan2(dyActive, dxActive + dxInactive);
                    BOT.x += BOT.speed * dt * Math.cos(angle);
                    BOT.y += BOT.speed * dt * Math.sin(angle);
                }
            }
            if ((dxActive * dxInactive < 0) && (dyActive * dyInactive >= 0)) {
                if (Math.sqrt((dxActive) ** 2 + (dyActive + dyInactive) ** 2) < BOT.speed * dt) {
                    BOT.x += dxActive;
                    BOT.y += dyActive + dyInactive;
                } else {
                    const angle = Math.atan2(dyActive + dyInactive, dxActive);
                    BOT.x += BOT.speed * dt * Math.cos(angle);
                    BOT.y += BOT.speed * dt * Math.sin(angle);
                }
            }
            if ((dxActive * dxInactive < 0) && (dyActive * dyInactive < 0)) {
                if (Math.sqrt((dxActive) ** 2 + (dyActive) ** 2) < BOT.speed * dt) {
                    BOT.x += dxActive;
                    BOT.y += dyActive;
                } else {
                    const angle = Math.atan2(dyActive, dxActive);
                    BOT.x += BOT.speed * dt * Math.cos(angle);
                    BOT.y += BOT.speed * dt * Math.sin(angle);
                }
            }
        } else {
            BOT.x += dxInactive;
            BOT.y += dyInactive;
        }
    }
}