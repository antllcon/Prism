const BaseBonus = require("./BaseBonus");

class ChangeColorBonus extends BaseBonus {
    constructor(x, y, size, color, team) {
        super(x, y, size, color, team);
        this.type = 'changeColor';
    }
   /* catch(entity) {
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
    }*/
}

module.exports = ChangeColorBonus;