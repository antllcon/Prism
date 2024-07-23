"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initBonuses = initBonuses;
exports.drawBonuses = drawBonuses;
exports.getBonuses = getBonuses;
var BaseBonus_1 = require("./BaseBonus");
var model_1 = require("../game/model");
var script_1 = require("../../script");
var bonusTypes_1 = require("./bonusTypes");
function initBonuses() {
    var bonusesForRound = [];
    bonusTypes_1.AVAILABLE_BONUSES.forEach(function (bonusInfo) {
        for (var i = 0; i < bonusInfo.count; i++) {
            var bonusType = bonusTypes_1.BONUS_TYPES.find(function (b) { return b.type === bonusInfo.type; });
            if (bonusType) {
                var x = Math.floor(Math.random() * (model_1.GAME.width - 40)) + 20;
                var y = Math.floor(Math.random() * (model_1.GAME.height - 40)) + 20;
                var bonus = new bonusType.class(x, y, bonusType.size, bonusType.color, bonusType.team);
                bonusesForRound.push(bonus);
            }
        }
    });
    return bonusesForRound;
}
function drawBonuses() {
    script_1.readyBonuses.forEach(function (bonus) {
        script_1.ctx.beginPath();
        script_1.ctx.arc(bonus.getX(), bonus.getY(), bonus.getSize(), 0, 2 * Math.PI);
        script_1.ctx.fillStyle = bonus.getColor();
        script_1.ctx.fill();
        script_1.ctx.closePath();
    });
}
function getBonuses(bonuses) {
    return bonuses.filter(function (bonus) { return bonus instanceof BaseBonus_1.BaseBonus; });
}
