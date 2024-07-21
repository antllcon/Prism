import {BaseBonus} from "./BaseBonus";
import {StopBonus} from "./StopOppositeTeamBonus";
import {AvailableBonus, BonusType} from "./types";
import {DeactivatePointsBonus} from "./DeactivatePointsBonus";
import {ChangeColorBonus} from "./ChangeColorBonus";

export const BONUS_TYPES: BonusType[] = [
    { type: 'base', class: BaseBonus, size: 20, color: '#FFFF00', team: 'neutral' },
   // { type: 'stopBot', class: StopBonus, size: 30, color: '#FF0000',  team: 'neutral'  },

    { type: 'changeColor', class: ChangeColorBonus, size: 30, color: '#00FF00' ,  team: 'neutral' },
];

export const AVAILABLE_BONUSES: AvailableBonus[] = [
    { type: 'base', count: 5 },
    //{ type: 'stopBot', count: 1 },

    { type: 'changeColor', count: 1 }
];

//{ type: 'deactivatePoints', count: 1 },
//{ type: 'deactivatePoints', class: DeactivatePointsBonus, size: 30, color: '#05bbf4' ,  team: 'neutral' },