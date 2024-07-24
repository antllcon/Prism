const BaseBonus = require("./BaseBonus");
class InvisibleLaserBonus extends BaseBonus {
    constructor(x, y, size, color, team) {
        super(x, y, size, color, team);
        this.type = 'invisibleLaser';
    }
/*    catch(entity) {
        super.catch(entity);

        const player = getMyPlayer(activePlayers);
        player.invisibleLasers = true;
        setTimeout(() => {
            player.invisibleLasers = false;
        }, 5000);
    }*/
}
module.exports = InvisibleLaserBonus;