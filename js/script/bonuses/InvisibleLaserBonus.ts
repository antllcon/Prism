import { BaseBonus } from "./BaseBonus";
import {getMyPlayer} from "../player/player";
import {activeBots, activePlayers} from "../../script";
import {Bot} from "../bot/model";

export class InvisibleLaserBonus extends BaseBonus {
    constructor(x: number, y: number, size: number, color: string, team: string) {
        super(x, y, size, color, team);
        this.type = 'invisibleLaser';
    }

    public catch(entity: { id: string; team: string }): void {
        super.catch(entity);
        // console.log('произошел catch для InvisibleLaserBonus');
        let entities = activePlayers.concat(activeBots);
        // console.log(entity.team, 'поймал InvisibleLaserBonus')
        const teamMembers = entities.filter(player => player.team === entity.team);
        //протестить
        teamMembers.forEach(player => {
            player.invisibleLasers = true;
            // console.log(player.invisibleLasers, 'поймал InvisibleLaserBonus')
            if (player instanceof Bot) {
                player.invisibleLasers = true;
            }
            //надо на сервер данные посылать
            setTimeout(() => {
                player.invisibleLasers = false;
            }, 5000);
        });
    }
}