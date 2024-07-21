import { BaseBonus } from "./BaseBonus";
import { Bot } from "../bot/model";
import {BOT_STATES} from "../bot/const";

export class StopBotBonus extends BaseBonus {
    constructor(x: number, y: number, team: string) {
        super(x, y, 30, 'red', team);
        this.type = 'stopBot';
    }

    public catch(entity: { id: string, team: string }, activeBots: Bot[]): void {
        super.catch(entity);

        activeBots.forEach(bot => {
            bot.makeStunned();
        });
        console.log("Все боты остановлены!");
    }
}