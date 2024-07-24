import {score, scoreAlpha} from "./model";
import {ctx} from "../../script";
import {backgroundTemplate} from "../game/game";

export function drawScore() {
    ctx.save();
    ctx.globalAlpha = scoreAlpha;
    ctx.fillStyle = score.getColor();
    ctx.font = "100px Font Over";
    ctx.fillText(`${score.getTeamOne()}:${score.getTeamTwo()}`, 50, 100 );
    ctx.restore();
}

export function drawFinalScore() {
    const background = document.createElement("div");
    const scoreGif = document.createElement("img");

    backgroundTemplate(background, scoreGif);

    if (score.getTeamOne() === 0 && score.getTeamTwo() === 3) {
        scoreGif.src = "./src/assets/img/0-3.gif";
    }
    if (score.getTeamOne() === 1 && score.getTeamTwo() === 3) {
        scoreGif.src = "./src/assets/img/1-3.gif";
    }
    if (score.getTeamOne() === 2 && score.getTeamTwo() === 3) {
        scoreGif.src = "./src/assets/img/2-3.gif";
    }
    if (score.getTeamOne() === 3 && score.getTeamTwo() === 0) {
        scoreGif.src = "./src/assets/img/3-0.gif";
    }
    if (score.getTeamOne() === 3 && score.getTeamTwo() === 1) {
        scoreGif.src = "./src/assets/img/3-1.gif";
    }
    if (score.getTeamOne() === 3 && score.getTeamTwo() === 2) {
        scoreGif.src = "./src/assets/img/3-2.gif";
    }

    setTimeout(() => {
        window.location.href = "index.html";
    }, 4500)
}

// export function getScoreGifUrl(teamOneScore, teamTwoScore) {
//     return "./src/assets/img/${teamOneScore}-${teamTwoScore}.gif";
// }

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