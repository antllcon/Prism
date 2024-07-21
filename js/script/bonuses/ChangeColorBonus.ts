import { BaseBonus } from "./BaseBonus";
import { points } from "../../script";
import {purple, yellow} from "../game/const";

export class ChangeColorBonus extends BaseBonus {
    constructor(x: number, y: number, size: number, color: string, team: string) {
        super(x, y, size, color, team);
        this.type = 'changeColor';
    }

    public catch(entity: { id: string; team: string }): void {
        super.catch(entity);

        points.forEach(point => {

            console.log(point, "до захода в условие")
            if (point.isActive()) {
                console.log('до захода активны:', point.isActive(), point.getId())
                if (point.getColor() === 'yellow') {
                    console.log('мы обнаружили поинт по имени ', point.getId(), point)
                    point.setColor(purple);
                } else if (point.getColor() === 'purple') {
                    console.log('мы обнаружили поинт по имени ', point.getId(), point)
                    point.setColor(yellow);
                }
                console.log(`Цвет поинта ${point.getId()} изменен на ${point.getColor()}`);
            }
        });

        console.log(`${entity.id} из команды ${entity.team} активировал бонус смены цвета!`);
    }
}
