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
                    console.log('yellow мы обнаружили поинт по имени ', point.getId(), point)
                    point.setColor('purple');
                    point.setTeam('purple');

                } else if (point.getColor() === 'purple') {
                    console.log('purple мы обнаружили поинт по имени ', point.getId(), point)
                    point.setColor('yellow');
                    point.setTeam('yellow');
                }
                console.log(`Цвет поинта ${point.getId()} изменен на ${point.getColor()}`);
            }
        );
        points.forEach(point => {
            console.log(point.getColor(), 'get color после')
            console.log(point.getTeam(), 'get team после')
        }
        );
        console.log(`${entity.id} из команды ${entity.team} активировал бонус смены цвета!`);
    }
}
