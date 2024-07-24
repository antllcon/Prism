import {COLORS} from "../game/const";

export class Score {
    constructor() {
        this.color = COLORS.WHITE;
        this.teamOne = 0;
        this.teamTwo = 0;
    }

    getColor() {
        return this.color
    }

    getTeamOne() {
        return this.teamOne
    }

    getTeamTwo() {
        return this.teamTwo
    }

    increaseTeamOne() {
        this.teamOne++
    }

    increaseTeamTwo() {
        this.teamTwo++
    }

    isVictoryScore() {
        return this.teamOne >= VICTORY_SCORE || this.teamTwo >= VICTORY_SCORE;
    }
}

export let score = new Score();

export let scoreAlpha = 0.2;

export let VICTORY_SCORE = 3;