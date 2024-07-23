// import {scoreAlphaState} from "./model";
// import {score} from "./model";
// import {ctx} from "../../script";
const scoreAlphaState, score = require('./model');
const ctx = require('../../script');
module.exports = drawScore, drawFinalScore, fadeOutScore;

function drawScore() {
    ctx.save();
    ctx.globalAlpha = scoreAlphaState.scoreAlpha;
    ctx.fillStyle = score.getColor();
    ctx.font = '100px Font Over';
    ctx.fillText(`${score.getTeam1()}:${score.getTeam2()}`, 50, 100);
    ctx.restore();
}

function drawFinalScore() {
    ctx.save();
    ctx.globalAlpha = scoreAlphaState.scoreAlpha;
    ctx.fillStyle = score.getColor();
    ctx.font = '700px Font Over';
    ctx.fillText(`${score.getTeam1()}:${score.getTeam1()}`, 270, 750);
    ctx.restore();
}

function fadeOutScore() {
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