import {
    PLAYER_STATES,
    DEFAULT_PLAYERS,
    ABILITY_SCALE_SPEED,
    ABILITY_SCALE_MAX,
    ABILITY_DURATION,
    MAX_SPEED,
    DURATION_DISABILITY
} from "./const";

import {canvasHeight, canvasWidth} from "../game/const";
import {ProgressBar} from "./progressBar/progressBar";
import {BOT_STATES, DEFAULT_BOTS} from "../bot/const";
import {ctx} from "../../script";

export class Player {
    private type: string
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
    private stunnedUntil: number;
    private invisibleLasers: boolean = false;
    private image:HTMLImageElement;
    private load: boolean;
    private count: number;
    private tick: number
    private direction: string

    constructor(i: number, id: string, socket_id: string) {
        this.type = DEFAULT_PLAYERS.type;
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
        this.stunnedUntil = 0;
        this.image = new Image();
        this.load = DEFAULT_PLAYERS.load;
        this.count = DEFAULT_PLAYERS.count;
        this.tick = DEFAULT_PLAYERS.tick;
        this.direction = DEFAULT_PLAYERS.direction;
    }

    getDirection() { return this.direction; }
    getType() { return this.type; }
    getId(): string {return this.id;}
    getX(): number {return this.x}
    getY(): number {return this.y;}
    getImage() { return this.image; }
    getLoad() { return this.load; }
    getSize(): number {return this.size;}
    getSpeed(): number {return this.speed;}
    getTeam(): string {return this.team;}
    getTick() { return this.tick; }
    getCount() { return this.count; }
    getColor(): string {return this.color;}
    // @ts-ignore
    getState(): PLAYER_STATES {return this.state;}
    getAbilityScale(): number {return this.abilityScale;}
    isAlive(): boolean {return this.state === PLAYER_STATES.ACTIVE;}
    isDead(): boolean {return this.state === PLAYER_STATES.DEAD;}
    isStunned(): boolean {return this.state === PLAYER_STATES.STUNNED;}
    moveOn(x: number, y: number): void {
        this.x += x;
        this.y += y;
        this.progressBar.updatePosition(x, y);
    }
    die(): void {this.state = PLAYER_STATES.DEAD;}
    setColor(color: string): void {this.color = color;}
    setX(x: number): void {this.x = x;}
    setY(y: number): void {this.y = y;}
    setSpeed(speed: number): void {this.speed = speed;}
    // @ts-ignore
    setState(state: PLAYER_STATES): PLAYER_STATES {this.state = state;}
    setImage(image: string) { this.image.src = image; }
    setLoad(load: boolean) { this.load = load; }
    setCount(count: number) { this.count = count; }
    setTick(tick: number) { this.tick = tick; }
    setDirection(direction: string) { this.direction = direction; }
    renaissance(): void {
        this.state = PLAYER_STATES.ACTIVE;
    }
    renderPB(): void {this.progressBar.render();}
    setAbilityScale(value: number): void {this.abilityScale = value;}
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
        this.setSpeed(MAX_SPEED);
        setTimeout(() => {
            this.abilityActive = false;
            this.setSpeed(DEFAULT_PLAYERS.speed);
        }, ABILITY_DURATION);
    }
    makeStunned(): void {
        this.stunnedUntil = Date.now() + DURATION_DISABILITY;
        this.setSpeed(0);
        this.setState(PLAYER_STATES.STUNNED);
    }
    recoverFromStunned() {
        this.stunnedUntil = 0;
        this.setSpeed(DEFAULT_PLAYERS.speed);

        if (this.isDead() || this.isStunned()) {
            this.renaissance();
        }
    }

    drawCountdown() {
        if (this.isStunned()) {
            const remainingTime = this.stunnedUntil - Date.now();
            const seconds = Math.floor(remainingTime / 1000);
            const milliseconds = Math.floor((remainingTime % 1000) / 10);
            const countdownText = `${seconds}.${milliseconds.toString().padStart(2, '0')}`;
            ctx.fillStyle = 'white';
            ctx.font = '16px Arial';
            ctx.fillText(countdownText, this.x, this.y - 30);
        }
    }

    public setInvisibleLasers(state: boolean): void {
        this.invisibleLasers = state;
    }

    public isInvisibleLasers(): boolean {
        return this.invisibleLasers;
    }
}