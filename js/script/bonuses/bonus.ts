import { BaseBonus } from './BaseBonus';
import { GAME as canvas } from '../game/model.mjs';
import { readyBonuses, ctx } from '../../script.mjs';
import { AVAILABLE_BONUSES, BONUS_TYPES } from './bonusTypes';
import {AvailableBonus, BonusType} from "./types";


export function initBonuses(): BaseBonus[]    {
    const bonusesForRound: BaseBonus[] = [];

    AVAILABLE_BONUSES.forEach((bonusInfo: AvailableBonus): void => {
        for (let i: number = 0; i < bonusInfo.count; i++) {
            const bonusType:BonusType | undefined = BONUS_TYPES.find(
                (b: BonusType): boolean => b.type === bonusInfo.type
            );
            if (bonusType) {
                const x: number = Math.floor(Math.random() * (canvas.width - 40)) + 20;
                const y: number = Math.floor(Math.random() * (canvas.height - 40)) + 20;
                const bonus: BaseBonus = new bonusType.class(
                    x,
                    y,
                    bonusType.size,
                    bonusType.color,
                    bonusType.team
                );
                bonusesForRound.push(bonus);
            }
        }
    });
    return bonusesForRound;
}

export function drawBonuses(): void {
    readyBonuses.forEach((bonus: { getX: () => any; getY: () => any; getSize: () => any; getColor: () => any; }): void => {
        ctx.beginPath();
        ctx.arc(bonus.getX(), bonus.getY(), bonus.getSize(), 0, 2 * Math.PI);
        ctx.fillStyle = bonus.getColor();
        ctx.fill();
        ctx.closePath();
    });
}

export function getBonuses(bonuses: any[]): any[] {
    return bonuses.filter((bonus): boolean => bonus instanceof BaseBonus);
}
