import {scoreAlphaState} from "./model";
import {score} from "./model";
import {ctx} from "../../script";
import {backgroundTemplate} from "../game/game";

export function drawScore() {
    ctx.save();
    ctx.globalAlpha = scoreAlphaState.scoreAlpha;
    ctx.fillStyle = score.getColor();
    ctx.font = '100px Font Over';
    ctx.fillText(`${score.getTeamPurple()}:${score.getTeamYellow()}`, 50, 100);
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

export function fadeOutScore() {
    // Уменьшаем уровень прозрачности каждые 100 миллисекунд
    const fadeOutInterval = setInterval(() => {
        scoreAlphaState.scoreAlpha -= 0.02; // Регулируйте значение для изменения скорости исчезания

        // Останавливаем интервал, когда прозрачность достигает или падает ниже нуля
        if (scoreAlphaState.scoreAlpha <= 0) {
            clearInterval(fadeOutInterval);
            scoreAlphaState.scoreAlpha = 0; // Убедитесь, что значение не станет отрицательным
        }
    }, 30); // Интервал времени в миллисекундах
}