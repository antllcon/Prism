import { BaseBonus } from "./BaseBonus";
import { Bot } from "../bot/model.mjs";
import {BOT_STATES} from "../bot/const.mjs";
import {Player} from "../player/model";

export class StopBonus extends BaseBonus {
    constructor(x: number, y: number, size: number, color: string, team: string) {
        super(x, y, size, color, team);
        this.type = 'stopBot';
    }

    public catch(entity: { id: string, team: string }, activeBots: Bot[], activePlayers: Player[]): void {
        super.catch(entity);

        if (entity.team === 'purple') {

            activeBots.forEach(bot => {
                if (bot.getTeam() !== entity.team && bot.getTeam() !== 'purple') {
                    bot.makeStunned();
                }
            });

            activePlayers.forEach(player => {
                if (player.getTeam() !== entity.team) {
                    player.makeStunned();
                }
            });
        } else if (entity.team === 'yellow') {

            activeBots.forEach(bot => {
                if (bot.getTeam() !== entity.team && bot.getTeam() !== 'yellow') {
                    bot.makeStunned();
                }
            });

            activePlayers.forEach(player => {
                if (player.getTeam() !== entity.team) {
                    player.makeStunned();
                }
            });
        }
    }
}