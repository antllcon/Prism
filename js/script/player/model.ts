import {
    PLAYER_STATES,
    DEFAULT_PLAYERS,
    ABILITY_SCALE_SPEED,
    ABILITY_SCALE_MAX,
    ABILITY_DURATION,
    MAX_SPEED
} from "./const";

import { canvasHeight, canvasWidth } from "../game/const";
import { ProgressBar } from "./progressBar/progressBar";

export class Player {
    private id: string;
    private main: boolean;
    private x: number;
    private y: number;
    private readonly size: number;
    private speed: number;
    private team: string;
    private color: string;
    // @ts-ignore
    private state: PLAYER_STATES;
    private abilityScale: number;
    private abilityActive: boolean;
    private progressBar: ProgressBar;

    constructor(i: number, id: string, socket_id: string) {
        this.id = id;
        this.main = (socket_id === id);
        this.x = DEFAULT_PLAYERS.x[i];
        this.y = DEFAULT_PLAYERS.y[i];
        this.size = DEFAULT_PLAYERS.size;
        this.speed = DEFAULT_PLAYERS.speed;
        this.team = DEFAULT_PLAYERS.team[i];
        this.color = DEFAULT_PLAYERS.color[i];
        this.state = DEFAULT_PLAYERS.state;
        this.abilityScale = 0;
        this.abilityActive = false;
        this.progressBar = new ProgressBar(this);
        this.progressBar.render();
    }

    getId(): string { return this.id; }
    getX(): number { return this.x; }
    getY(): number { return this.y; }
    getSize(): number { return this.size; }
    getSpeed(): number { return this.speed; }
    getTeam(): string { return this.team; }
    getColor(): string { return this.color; }
    // @ts-ignore
    getState(): PLAYER_STATES { return this.state; }
    getAbilityScale(): number { return this.abilityScale; }
    isAlive(): boolean { return this.state === PLAYER_STATES.ACTIVE; }
    isDead(): boolean { return this.state === PLAYER_STATES.DEAD; }

    moveOn(x: number, y: number): void {
        this.x += x;
        this.y += y;
        this.progressBar.updatePosition(x, y);
    }

    die(): void { this.state = PLAYER_STATES.DEAD; }
    setColor(color: string): void { this.color = color; }
    setX(x: number): void { this.x = x; }
    setY(y: number): void { this.y = y; }
    setSpeed(speed: number): void { this.speed = speed; }
    renaissance(): void { this.state = PLAYER_STATES.ACTIVE; }
    renderPB(): void { this.progressBar.render(); }
    setAbilityScale(value: number): void { this.abilityScale = value; }

    updateAbilityScale(deltaTime: number): void {
        this.abilityScale += ABILITY_SCALE_SPEED * deltaTime;
        this.progressBar.update(this.abilityScale);
        if (this.abilityScale >= ABILITY_SCALE_MAX) {
            this.abilityScale = ABILITY_SCALE_MAX;
        }
    }

    resetAbilityScale(): void {
        if (this.abilityScale >= ABILITY_SCALE_MAX) {
            this.activateAbility();
            this.abilityScale = 0;
            this.progressBar.update(this.abilityScale);
        }
    }

    activateAbility(): void {
        this.abilityActive = true;
        console.log('ability activated');
        console.log(this.abilityActive, 'activateAbility');
        this.setSpeed(MAX_SPEED);
        setTimeout(() => {
            this.abilityActive = false;
            this.setSpeed(DEFAULT_PLAYERS.speed);
        }, ABILITY_DURATION);
    }
}