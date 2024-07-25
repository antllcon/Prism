import {StopBonus} from "./StopOppositeTeamBonus";
import {AvailableBonus, BonusType} from "./types";
import {DeactivatePointsBonus} from "./DeactivatePointsBonus";
import {ChangeColorBonus} from "./ChangeColorBonus";
import {InvisibleLaserBonus} from "./InvisibleLaserBonus.ts";

export const BONUS_TYPES: BonusType[] = [
    //{ type: 'base', class: BaseBonus, size: 20, color: '#FFFF00', team: 'neutral' },
    { type: 'stopOppositeTeamBonus', class: StopBonus, size: 30, color: '#FF0000',  team: 'neutral'  },
    { type: 'deactivatePoints', class: DeactivatePointsBonus, size: 30, color: '#05bbf4' ,  team: 'neutral' },
    { type: 'changeColor', class: ChangeColorBonus, size: 30, color: '#00FF00' ,  team: 'neutral' },
    { type: 'invisibleLaser', class: InvisibleLaserBonus, size: 30, color: '#ff7300' ,  team: 'neutral' },
];

// появление каждые 30 секунд,
// а еще нужно поправить движение бота, сначала убегание, потом захват бонуса

export const AVAILABLE_BONUSES: AvailableBonus[] = [
    { type: 'base', count: 5 },
    { type: 'stopOppositeTeamBonus', count: 2 },
    { type: 'deactivatePoints', count: 2 },
    { type: 'changeColor', count: 2 },
    { type: 'invisibleLaser', count: 2 }
];