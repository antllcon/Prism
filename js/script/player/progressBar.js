import {Player} from "./model";
import {ctx} from "../../script";
import {GREEN} from "./const";
import {logPlugin} from "@babel/preset-env/lib/debug";
import {game} from "../game/model";
export const SIZE = {
    x: 50,
    y: 15
}
/*

export class ProgressBar {
    constructor(player) {
        this.player = player.id;
        this.progress = 0;
        this.maxProgress = 100;
        this.fillColor = GREEN;
        this.x = player.getX();
        this.y = player.getY() - 50;
    }

    updatePosition(x, y) {
        this.x = x - SIZE.x / 2;
        this.y = y - 50;
    }

  /!*  update(deltaTime) {
        this.progress += (deltaTime / 1000) * (this.maxProgress / 5); // Увеличиваем прогресс со временем
        this.progress = Math.min(this.progress, this.maxProgress); // Ограничиваем прогресс максимальным значением
        this.updatePosition(); // Обновляем позицию прогресс-бара
    }*!/

    render() {
        console.log('we are in render pb');
        console.log(this)
        ctx.fillStyle = this.fillColor;
        ctx.fillRect(this.x, this.y, SIZE.x, SIZE.y);
    }

}*/


export class ProgressBar {
    constructor(player)
    {
        this.playerId = player.id;
        this.x = player.x;
        this.y = player.y - 60;
        this.height = SIZE.y,
        this.width = SIZE.x,
        this.color = GREEN;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, 100, 20);
        console.log('we are in pb constructor');
    }

    updatePosition(x, y) {
        this.x += x;
        this.y += y;
    }

    render() {
        console.log('we are in render pb');
        console.log(this)
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, 100, 20);
    }
}