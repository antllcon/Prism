import { BaseBonus } from "./BaseBonus";
import { points } from "../../script";
import {purple, TEAM_STATES, yellow} from "../game/const";
import {drawPoints} from "../point/point";

export class ChangeColorBonus extends BaseBonus {
    constructor(x: number, y: number, size: number, color: string, team: string) {
        super(x, y, size, color, team);
        this.type = 'changeColor';
    }

    public catch(entity: { id: string; team: string }): void {
        super.catch(entity);
        // console.log('произошел catch для ChangeColorBonus');
        points.forEach(point => {
            if (point.getTeam() === TEAM_STATES.YELLOW)
            {
               point.setTeam(TEAM_STATES.PURPLE);
            } else if
                (point.getTeam() === TEAM_STATES.PURPLE)
                {
                    point.setTeam(TEAM_STATES.YELLOW);
                }
            }
        );
    }
}
