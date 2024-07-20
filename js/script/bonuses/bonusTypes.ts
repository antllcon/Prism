import {BaseBonus} from "./BaseBonus";
import {StopBotBonus} from "./StopOppositeTeamBonus";
import {AvailableBonus, BonusType} from "./types";

export const BONUS_TYPES: BonusType[] = [
    { type: 'base', class: BaseBonus, size: 20, color: 'yellow' },
    { type: 'stopBot', class: StopBotBonus, size: 30, color: 'red' },
];

export const AVAILABLE_BONUSES: AvailableBonus[] = [
    { type: 'base', count: 2 },
    { type: 'stopBot', count: 1 },
];