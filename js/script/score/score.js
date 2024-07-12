import {scoreAlphaState} from "./model";
import {SCORE} from "./model";
import {ctx} from "../../script";

export function drawScore() {
    ctx.save();
    ctx.globalAlpha = scoreAlphaState.scoreAlpha;
    ctx.fillStyle = SCORE.color;
    ctx.font = "100px Font Over";
    ctx.fillText(`${SCORE.team1}:${SCORE.team2}`, 50, 100 );
    ctx.restore();
}

export function drawFinalScore() {
    ctx.save();
    ctx.globalAlpha = scoreAlphaState.scoreAlpha;
    ctx.fillStyle = SCORE.color;
    ctx.font = "700px Font Over";
    ctx.fillText(`${SCORE.team1}:${SCORE.team2}`, 270, 750);
    ctx.restore();
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