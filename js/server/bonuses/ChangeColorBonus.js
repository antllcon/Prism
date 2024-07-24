const BaseBonus = require("./BaseBonus");
const { points } = require("../../script");
const { purple, yellow } = require("../game/const");

class ChangeColorBonus extends BaseBonus {
    constructor(x, y, size, color, team) {
        super(x, y, size, color, team);
        this.type = 'changeColor';
    }

    catch(entity) {
        super.catch(entity);

        points.forEach(point => {
            if (point.getColor() === 'yellow') {
                point.setColor('purple');
                point.setTeam('purple');
            } else if (point.getColor() === 'purple') {
                point.setColor('yellow');
                point.setTeam('yellow');
            }
        });
    }
}

module.exports = ChangeColorBonus;