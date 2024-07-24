const BaseBonus = require("./BaseBonus");
const { getMyPlayer } = require("../player/player");
const { activePlayers } = require("../../script");

class InvisibleLaserBonus extends BaseBonus {
    constructor(x, y, size, color, team) {
        super(x, y, size, color, team);
        this.type = 'invisibleLaser';
    }

    catch(entity) {
        super.catch(entity);
        // время невидимости сделать
        // визуально затемнить
        const player = getMyPlayer(activePlayers);
        player.invisibleLasers = true;
        setTimeout(() => {
            player.invisibleLasers = false;
        }, 5000);
    }
}

module.exports = InvisibleLaserBonus;