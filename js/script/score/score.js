import {score, scoreAlpha} from "./model";
import {ctx} from "../../script";
import {backgroundTemplate} from "../game/game";

export function drawScore() {
    ctx.save();
    ctx.globalAlpha = scoreAlpha;
    ctx.fillStyle = score.getColor();
    ctx.font = "100px Font Over";
    ctx.fillText(`${score.getTeamPurple()}:${score.getTeamYellow()}`, 50, 100 );
    ctx.restore();
}

export function drawFinalScore() {
    const background = document.createElement("div");
    const scoreGif = document.createElement("img");

    backgroundTemplate(background, scoreGif);

    if (score.getTeamPurple() === 0 && score.getTeamYellow() === 3) {
        scoreGif.src = "./src/assets/img/0-3.gif";
    }
    if (score.getTeamPurple() === 1 && score.getTeamYellow() === 3) {
        scoreGif.src = "./src/assets/img/1-3.gif";
    }
    if (score.getTeamPurple() === 2 && score.getTeamYellow() === 3) {
        scoreGif.src = "./src/assets/img/2-3.gif";
    }
    if (score.getTeamPurple() === 3 && score.getTeamYellow() === 0) {
        scoreGif.src = "./src/assets/img/3-0.gif";
    }
    if (score.getTeamPurple() === 3 && score.getTeamYellow() === 1) {
        scoreGif.src = "./src/assets/img/3-1.gif";
    }
    if (score.getTeamPurple() === 3 && score.getTeamYellow() === 2) {
        scoreGif.src = "./src/assets/img/3-2.gif";
    }

    setTimeout(() => {
        window.location.href = "index.html";
    }, 4500)
}

let scoreAlph = 0.2;

export function fadeOutScore() {
    const fadeOutInterval = setInterval(() => {
        scoreAlph -= 0.02;
        if (scoreAlph <= 0) {
            clearInterval(fadeOutInterval);
            scoreAlph = 0;
        }
    }, 30);
}