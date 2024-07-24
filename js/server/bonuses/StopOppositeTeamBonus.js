const BaseBonus = require("./BaseBonus");
class StopBonus extends BaseBonus {
    constructor(x, y, size, color, team) {
        super(x, y, size, color, team);
        this.type = 'stopBot';
    }
   /* catch(entity, activeBots, activePlayers) {
        super.catch(entity);
        if (entity.team === 'purple') {
            activeBots.forEach(bot => {
                if (bot.team !== entity.team && bot.team !== 'purple') {
                    bot.stunnedUntil = Date.now() + DURATION_DISABILITY;
                    bot.speed = 0;
                    bot.state = BOT_STATES.STUNNED;
                }
            });
            activePlayers.forEach(player => {
                if (player.team !== entity.team) {
                    player.stunnedUntil = Date.now() + DURATION_DISABILITY;
                    player.speed = 0;
                    player.state = PLAYER_STATES.STUNNED;
                }
            });
        } else if (entity.team === 'yellow') {
            activeBots.forEach(bot => {
                if (bot.team !== entity.team && bot.team !== 'yellow') {
                    bot.stunnedUntil = Date.now() + DURATION_DISABILITY;
                    bot.speed = 0;
                    bot.state = BOT_STATES.STUNNED;
                }
            });
            activePlayers.forEach(player => {
                if (player.team !== entity.team) {
                    player.stunnedUntil = Date.now() + DURATION_DISABILITY;
                    player.speed = 0;
                    player.state = PLAYER_STATES.STUNNED;
                }
            });
        }
    }*/
}
module.exports = StopBonus;