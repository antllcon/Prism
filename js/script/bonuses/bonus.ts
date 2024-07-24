import { BaseBonus } from './BaseBonus';
import { GAME as canvas } from '../game/model';
import { readyBonuses, ctx } from '../../script';
import { AVAILABLE_BONUSES, BONUS_TYPES } from './bonusTypes';
import {AvailableBonus, BonusType} from "./types";


export function initBonuses(bonusData: Array<{ color: string; size: number; teamActivated: string; type: string; x: number; y: number; }>): BaseBonus[]    {
    const bonusesForRound: BaseBonus[] = [];

    bonusData.forEach((bonusInfo) => {
        const bonusType: BonusType | undefined = BONUS_TYPES.find(
            (b: BonusType): boolean => b.type === bonusInfo.type
        );

        if (bonusType) {
            const bonus: BaseBonus = new bonusType.class(
                bonusInfo.x,
                bonusInfo.y,
                bonusInfo.size,
                bonusInfo.color,
                bonusInfo.teamActivated
            );
            bonusesForRound.push(bonus);
        }
    });
    return bonusesForRound;
}

export function drawBonuses(): void {
    //@ts-ignore
    readyBonuses.forEach((bonus) => {
        ctx.beginPath();
        ctx.arc(bonus.x, bonus.y, bonus.size, 0, 2 * Math.PI);
        ctx.fillStyle = bonus.color;
        ctx.fill();
        ctx.closePath();
    });
}

