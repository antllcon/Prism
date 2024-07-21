import { BaseBonus } from "./BaseBonus";
import {points} from "../../script";

export class DeactivatePointsBonus extends BaseBonus {
    constructor(x: number, y: number, size: number, color: string, team: string) {
        console.log('DeactivatePointsBonus');
        super(x, y, size, color, team);
        this.type = 'deactivatePoints';
    }

    public catch(entity: { id: string; team: string }): void {
        super.catch(entity);
        console.log(points);

        points.forEach(point => {
            point.deactivate();
            console.log(`Поинт ${point.getId()} деактивирован!`);
        });

        console.log(`${entity.id} из команды ${entity.team} активировал бонус деактивации поинтов!`);
    }
}