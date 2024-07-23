export class BaseBonus {
    private x: number;
    private y: number;
    private size: number;
    private color: string;
    public type: string;
    public teamActivated: string

    constructor(x: number, y: number, size: number = 20, color: string, team: string) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.type = 'generic';
        this.teamActivated = team;
    }

    public getX(): number { return this.x;}
    public getY(): number { return this.y;}
    public getSize(): number {return this.size;}
    public getColor():string {return this.color}
    public getTeam(): string {return this.teamActivated}
    public catch(entity: { id: string, team: string }, ...args: any[]): void {
    }
}