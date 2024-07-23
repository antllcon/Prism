// import {COLORS} from "../game/const";
const COLORS = require('../game/const');
module.exports = scoreAlphaState, Score, score, SCORE;

const scoreAlphaState = {
    scoreAlpha: 0.2,
};

class Score{
    constructor(){
        this.color = COLORS.WHITE;
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

const score = new Score();

let SCORE = {
    color: COLORS.WHITE,
    team1: 0,
    team2: 0,
};
