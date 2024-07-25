import { BaseBonus } from "./BaseBonus";
import { Bot } from "../bot/model";
import {BOT_STATES} from "../bot/const";
import { PLAYER_STATES, DURATION_DISABILITY } from "../player/const";
import {TEAM_STATES} from "../game/const";
import {LogLevel} from "ts-loader/dist/logger";

export class StopBonus extends BaseBonus {
    constructor(x: number, y: number, size: number, color: string, team: string) {
        super(x, y, size, color, team);
        this.type = 'stopOppositeTeamBonus';
    }
    //@ts-ignore
    public catch(entity: { id: string, team: string }, activeBots, activePlayers): void {
        super.catch(entity);
        // console.log('произошел catch для StopBonus');
        if (entity.team === TEAM_STATES.PURPLE) {
            //@ts-ignore
            activeBots.forEach(bot => {
                // console.log(bot)
                // console.log(entity.team)
                if (bot.team !== entity.team) {
                    bot.stunnedUntil = Date.now() + DURATION_DISABILITY;
                    bot.speed = (0);
                    bot.state = BOT_STATES.STUNNED;
                    // console.log('after stunning bot is ', bot)
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
        } else if (entity.team === TEAM_STATES.YELLOW) {
            //@ts-ignore
            activeBots.forEach(bot => {
                if (bot.team !== entity.team ) {
                    bot.stunnedUntil = Date.now() + DURATION_DISABILITY;
                    bot.speed = 0;
                    bot.state = BOT_STATES.STUNNED;
                }
            });
            //@ts-ignore
            activePlayers.forEach(player => {
                if (player.team !== entity.team) {
                    player.stunnedUntil = Date.now() + DURATION_DISABILITY;
                    player.speed = 0;
                    player.state = PLAYER_STATES.STUNNED;
                }
            });
        }
    }
}