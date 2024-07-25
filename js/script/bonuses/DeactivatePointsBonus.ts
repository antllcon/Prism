import { BaseBonus } from "./BaseBonus";
import {points} from "../../script";
import {Point} from "../point/model";

export class DeactivatePointsBonus extends BaseBonus {
    constructor(x: number, y: number, size: number, color: string, team: string) {
        super(x, y, size, color, team);
        this.type = 'deactivatePoints';
    }

    public catch(entity: { id: string; team: string }): void {
        super.catch(entity);
        points.forEach(point => {
            if (point.isActive()) {
                point.deactivate();
            }
        });
    }
}