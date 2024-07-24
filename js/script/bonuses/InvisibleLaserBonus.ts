import { BaseBonus } from "./BaseBonus";
import {getMyPlayer} from "../player/player";
import {activePlayers} from "../../script";

export class InvisibleLaserBonus extends BaseBonus {
    constructor(x: number, y: number, size: number, color: string, team: string) {
        super(x, y, size, color, team);
        this.type = 'invisibleLaser';
    }

    public catch(entity: { id: string; team: string }): void {

        super.catch(entity);
        //время невидимости сделать
        //визуально затемнить
        console.log('произошел catch для InvisibleLaserBonus');
        const player = getMyPlayer(activePlayers);
        player.invisibleLasers = true;
        setTimeout(() => {
            player.invisibleLasers = false;
        }, 5000);
    }
}
