import {score, scoreAlpha} from "./model";
import {ctx} from "../../script";

export function drawScore() {
    ctx.save();
    ctx.globalAlpha = scoreAlpha;
    ctx.fillStyle = score.getColor();
    ctx.font = "100px Font Over";
    ctx.fillText(`${score.getTeamOne()}:${score.getTeamTwo()}`, 50, 100 );
    ctx.restore();
}

export function drawFinalScore() {
    ctx.save();
    ctx.globalAlpha = scoreAlpha;
    ctx.fillStyle = score.getColor();
    ctx.font = "700px Font Over";
    ctx.fillText(`${score.getTeamOne()}:${score.getTeamTwo()}`, 270, 750);
    ctx.restore();
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