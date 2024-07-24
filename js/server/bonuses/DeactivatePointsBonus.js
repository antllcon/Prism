const BaseBonus = require("./BaseBonus");
const { points } = require("../../script");

class DeactivatePointsBonus extends BaseBonus {
    constructor(x, y, size, color, team) {
        super(x, y, size, color, team);
        this.type = 'deactivatePoints';
    }

    catch(entity) {
        super.catch(entity);
        points.forEach(point => {
            if (point.isActive()) {
                point.deactivate();
            }
        });
    }
}

module.exports = DeactivatePointsBonus;