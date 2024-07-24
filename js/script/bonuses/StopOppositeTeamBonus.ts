import { BaseBonus } from "./BaseBonus";
import { Bot } from "../bot/model";
import {BOT_STATES} from "../bot/const";
import { PLAYER_STATES, DURATION_DISABILITY } from "../player/const";

export class StopBonus extends BaseBonus {
    constructor(x: number, y: number, size: number, color: string, team: string) {
        super(x, y, size, color, team);
        this.type = 'stopBot';
    }
//@ts-ignore
    public catch(entity: { id: string, team: string }, activeBots, activePlayers): void {
        super.catch(entity);
        //console.log('произошел catch для StopBonus');
        if (entity.team === 'purple') {
//@ts-ignore
            activeBots.forEach(bot => {
                if (bot.team !== entity.team && bot.team !== 'purple') {
                    bot.stunnedUntil = Date.now() + DURATION_DISABILITY;
                    bot.speed = (0);
                    bot.state = BOT_STATES.STUNNED;
                }
            });
//@ts-ignore
            activePlayers.forEach(player => {
                if (player.team !== entity.team) {
                    player.stunnedUntil = Date.now() + DURATION_DISABILITY;
                    player.speed = (0);
                    player.state = PLAYER_STATES.STUNNED;
                }
            });
        } else if (entity.team === 'yellow') {
//@ts-ignore

            activeBots.forEach(bot => {
                if (bot.team !== entity.team && bot.team !== 'yellow') {
                    bot.stunnedUntil = Date.now() + DURATION_DISABILITY;
                    bot.speed = (0);
                    bot.state = BOT_STATES.STUNNED;
                }
            });
//@ts-ignore

            activePlayers.forEach(player => {
                if (player.team !== entity.team) {
                    player.stunnedUntil = Date.now() + DURATION_DISABILITY;
                    player.speed = (0);
                    player.state = PLAYER_STATES.STUNNED;
                }
            });
        }
    }
}