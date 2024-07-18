import {Player} from "./model";
import {ctx} from "../../script";
import {GREEN} from "./const";
import {logPlugin} from "@babel/preset-env/lib/debug";
import {game} from "../game/model";
import {
    PLAYER_STATES,
    DEFAULT_PLAYERS,
    ABILITY_SCALE_SPEED,
    ABILITY_SCALE_MAX,
    ABILITY_DURATION,
    ABILITY_SPEED_MULTIPLAYER
} from "./const";

export const SIZE = {
    x: 50,
    y: 15
}

export const GRAY = '#808080';


export class ProgressBar {
    constructor(player)
    {
        this.playerId = player.id;
        this.x = player.x;
        this.y = player.y - 60;
        this.height = SIZE.y;
        this.width = ABILITY_SCALE_MAX;
        this.color = GREEN;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, 100, 20);
        this.progressFillColor = GREEN;
        this.progressEmptyColor = GRAY;
        this.progress = 0;
        this.maxProgress = ABILITY_SCALE_MAX;
    }

    updatePosition(x, y) {
        this.x += x;
        this.y += y;
    }

    update(scaleValue) {
        this.progress = scaleValue;
        if (this.progress === this.maxProgress) {
            this.progress = 0;
        }
    }
    render() {
        ctx.fillStyle = this.progressEmptyColor;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.fillStyle = this.progressFillColor;
        ctx.fillRect(this.x, this.y, (this.width * this.progress) / this.maxProgress, this.height);
    }
}