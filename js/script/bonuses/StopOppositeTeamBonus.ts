import { BaseBonus } from "./BaseBonus";
import { Bot } from "../bot/model";
import {BOT_STATES} from "../bot/const";
import {Player} from "../player/model";

export class StopBonus extends BaseBonus {
    constructor(x: number, y: number, size: number, color: string, team: string) {
        super(x, y, size, color, team);
        this.type = 'stopBot';
    }

    public catch(entity: { id: string, team: string }, activeBots: Bot[], activePlayers: Player[]): void {
        super.catch(entity);

        if (entity.team === 'purple') {
            console.log(`Player purple ${entity.id} поймал бонус и замораживает противников!`);

            activeBots.forEach(bot => {
                if (bot.getTeam() !== entity.team && bot.getTeam() !== 'purple') {
                    bot.makeStunned();
                    console.log(`Бот ${bot.getName()} из команды ${bot.getTeam()} остановлен!`);
                }
            });

            activePlayers.forEach(player => {
                if (player.getTeam() !== entity.team) {
                    player.makeStunned();
                    console.log(`Игрок ${player.getId()} из команды ${player.getTeam()} остановлен!`);
                }
            });
        } else if (entity.team === 'yellow') {
            console.log(`Player yellow ${entity.id} поймал бонус и замораживает противников!`);

            activeBots.forEach(bot => {
                if (bot.getTeam() !== entity.team && bot.getTeam() !== 'yellow') {
                    bot.makeStunned();
                    console.log(`Бот ${bot.getName()} из команды ${bot.getTeam()} остановлен!`);
                }
            });

            activePlayers.forEach(player => {
                if (player.getTeam() !== entity.team) {
                    player.makeStunned();
                    console.log(`Игрок ${player.getId()} из команды ${player.getTeam()} остановлен!`);
                }
            });
        }
    }
}