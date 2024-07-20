// BaseBonus.ts

export class BaseBonus {
    private x: number;
    private y: number;
    private size: number;
    private color: string;
    public type: string;

    constructor(x: number, y: number, size: number = 20, color: string = 'yellow') {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.type = 'generic';
        console.log('BaseBonus constructed');
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public getSize(): number {
        return this.size;
    }

    public catch(entity: { id: string }, ...args: any[]): void {
        console.log(`${entity.id} поймал бонус!`);
    }
}