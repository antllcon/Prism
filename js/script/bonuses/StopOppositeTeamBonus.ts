import { BaseBonus } from "./BaseBonus";
import { Bot } from "../bot/model";
import {BOT_STATES} from "../bot/const";

export class StopBotBonus extends BaseBonus {
    constructor(x: number, y: number) {
        super(x, y, 30, 'red');
        this.type = 'stopBot';
    }

    public catch(entity: { id: string }, activeBots: Bot[]): void {
        super['catch'](entity);

        activeBots.forEach(bot => {
            bot.makeStunned();
            console.log(BOT_STATES.STUNNED)
            console.log('bot_states stunned')
        });
        console.log("Все боты остановлены!");
    }
}