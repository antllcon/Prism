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
        if (bonus.color === '#FF0000') {
            let bonusImage = new Image();
            bonusImage.src = './src/assets/img/bonus-stop.png';
            ctx.drawImage(
                bonusImage,
                bonus.x,
                bonus.y
            )
        }
        if (bonus.color === '#05bbf4') {
            let bonusImage = new Image();
            bonusImage.src = './src/assets/img/bonus-deactive.png';
            ctx.drawImage(
                bonusImage,
                bonus.x,
                bonus.y
            )
        }
        if (bonus.color === '#00FF00') {
            let bonusImage = new Image();
            bonusImage.src = './src/assets/img/bonus-change-color.png';
            ctx.drawImage(
                bonusImage,
                bonus.x,
                bonus.y
            )
        }
        if (bonus.color === '#ff7300') {
            let bonusImage = new Image();
            bonusImage.src = './src/assets/img/bonus-invisible.png';
            ctx.drawImage(
                bonusImage,
                bonus.x,
                bonus.y
            )
        }
    });
}

