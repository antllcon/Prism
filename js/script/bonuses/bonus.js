import {BaseBonus} from "./BaseBonus";
import {GAME as canvas} from "../game/model";
import {bonuses, ctx} from "../../script";
import {AVAILABLE_BONUSES, BONUS_TYPES} from "./bonusTypes";


export function initBonuses() {
    let bonusesForRound = [];

    AVAILABLE_BONUSES.forEach(bonusInfo => {
        for (let i = 0; i < bonusInfo.count; i++) {
            const bonusType = BONUS_TYPES.find(b => b.type === bonusInfo.type);
            if (bonusType) {
                const x = Math.floor(Math.random() * (canvas.width - 40)) + 20;
                const y = Math.floor(Math.random() * (canvas.height - 40)) + 20;
                const bonus = new bonusType.class(x, y);
                bonusesForRound.push(bonus);
                console.log(`Бонус создан: ${bonus.type}`);
            }
        }
    });
    console.log(bonusesForRound)
    console.log('bonusesForRound')
    return bonusesForRound;
}

export function drawBonuses() {
    bonuses.forEach(bonus => {
        ctx.beginPath();
        ctx.arc(bonus.getX(), bonus.getY(), bonus.getSize(), 0, 2 * Math.PI);
        ctx.fillStyle = bonus.color || 'yellow'; // Используйте цвет бонуса, если он задан
        ctx.fill();
        ctx.closePath();
    });
}

export function getBonuses(bonuses) {
    return bonuses.filter(bonus => bonus instanceof BaseBonus);
}