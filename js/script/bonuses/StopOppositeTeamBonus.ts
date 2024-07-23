import { BaseBonus } from "./BaseBonus";
import { Bot } from "../bot/model";
import {BOT_STATES} from "../bot/const";

export class StopBonus extends BaseBonus {
    constructor(x: number, y: number, size: number, color: string, team: string) {
        super(x, y, size, color, team);
        this.type = 'stopBot';
    }
//@ts-ignore
    public catch(entity: { id: string, team: string }, activeBots, activePlayers): void {
        super.catch(entity);

        if (entity.team === 'purple') {
//@ts-ignore
            activeBots.forEach(bot => {
                if (bot.getTeam() !== entity.team && bot.getTeam() !== 'purple') {
                    bot.makeStunned();
                }
            });
//@ts-ignore
            activePlayers.forEach(player => {
                if (player.getTeam() !== entity.team) {
                    player.makeStunned();
                }
            });
        } else if (entity.team === 'yellow') {
//@ts-ignore

            activeBots.forEach(bot => {
                if (bot.getTeam() !== entity.team && bot.getTeam() !== 'yellow') {
                    bot.makeStunned();
                }
            });
//@ts-ignore

            activePlayers.forEach(player => {
                if (player.getTeam() !== entity.team) {
                    player.makeStunned();
                }
            });
        }
    }
}