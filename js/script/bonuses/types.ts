import {BaseBonus} from "./BaseBonus";

export interface BonusType {
    type: string;
    class: new (x: number, y: number, size: number, color: string, team: string) => BaseBonus;
    size: number;
    color: string;
    team: string;
}

export interface AvailableBonus {
    type: string;
    count: number;
}