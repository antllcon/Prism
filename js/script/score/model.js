import {COLORS} from "../game/const";
import {VICTORY_SCORE} from "./const";

export const scoreAlphaState = {
    scoreAlpha: 0.2,
};

export class Score{
    constructor(){
        this.color = COLORS.WHITE;
        this.teamPurple = 0;
        this.teamYellow = 0;
    }

    getColor() {
        return this.color;
    }

    getTeamPurple() {
        return this.teamPurple;
    }
    getTeamYellow() {
        return this.teamYellow;
    }

    increaseTeamYellow() {
        this.teamYellow++;
    }

    increaseTeamPurple() {
        this.teamPurple++;
    }

    isVictoryScore() {
        return this.teamPurple >= VICTORY_SCORE || this.teamYellow >= VICTORY_SCORE;
    }
}

export const score = new Score();
