import {BaseBonus} from "./BaseBonus";

export interface BonusType {
    type: string;
    class: new (x: number, y: number) => BaseBonus;
    size: number;
    color: string;
}

export interface AvailableBonus {
    type: string;
    count: number;
}
