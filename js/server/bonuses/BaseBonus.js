class BaseBonus {
    constructor(x, y, size= 20, color, team) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.type = 'generic';
        this.teamActivated = team;
    }

    getX(){ return this.x;}
    getY(){ return this.y;}
    getSize(){return this.size;}
    getColor(){return this.color}
    getTeam(){return this.teamActivated}
    catch(entitity, ...args) {}
}

module.exports = BaseBonus;