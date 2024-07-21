import { white } from '../game/const';

export const scoreAlphaState = {
    scoreAlpha: 0.2,
};

export class Score {
    constructor() {
        this.color = white;
        this.team1 = 0;
        this.team2 = 0;
    }

    getColor() {
        return this.color;
    }

    getTeam1() {
        return this.team1;
    }
    getTeam2() {
        return this.team2;
    }

    increaseTeamYellow() {
        this.team2++;
    }

    increaseTeamPurple() {
        this.team1++;
    }
}

export const score = new Score();

export const SCORE = {
    color: white,
    team1: 0,
    team2: 0,
};
