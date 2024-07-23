import { BaseBonus } from "./BaseBonus";
import { points } from "../../script";
import {purple, yellow} from "../game/const";
import {drawPoints} from "../point/point";

export class ChangeColorBonus extends BaseBonus {
    constructor(x: number, y: number, size: number, color: string, team: string) {
        super(x, y, size, color, team);
        this.type = 'changeColor';
    }

    public catch(entity: { id: string; team: string }): void {
        super.catch(entity);

        points.forEach(point => {
            if (point.getColor() === 'yellow') {
                    point.setColor('purple');
                    point.setTeam('purple');

                } else if (point.getColor() === 'purple') {
                    point.setColor('yellow');
                    point.setTeam('yellow');
                }
            }
        );
    }
}
