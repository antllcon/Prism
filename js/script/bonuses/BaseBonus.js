export class BaseBonus {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 20;
        this.type = 'generic';
    }

    getX() {return this.x;}
    getY() {return this.y;}
    getSize() {return this.size;}
    catch(entity) {
        console.log(`${entity.name} поймал бонус!`);
    }
}