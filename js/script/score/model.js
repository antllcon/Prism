import {COLORS} from "../game/const";

export class Score {
    constructor() {
        this.color = COLORS.WHITE;
        this.teamPurple = 0;
        this.teamYellow = 0;
    }

    getColor() {
        return this.color
    }

    getTeamPurple() {
        return this.teamPurple
    }

    getTeamYellow() {
        return this.teamYellow
    }

    increaseTeamPurple() {
        this.teamPurple++
    }

    increaseTeamYellow() {
        this.teamYellow++
    }

    isVictoryScore() {
        return this.teamPurple >= VICTORY_SCORE || this.teamYellow >= VICTORY_SCORE;
    }
}

export let score = new Score();

export let scoreAlpha = 0.2;

export let VICTORY_SCORE = 3;