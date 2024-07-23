"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AVAILABLE_BONUSES = exports.BONUS_TYPES = void 0;
var StopOppositeTeamBonus_1 = require("./StopOppositeTeamBonus");
var DeactivatePointsBonus_1 = require("./DeactivatePointsBonus");
var ChangeColorBonus_1 = require("./ChangeColorBonus");
var InvisibleLaserBonus_1 = require("./InvisibleLaserBonus");
exports.BONUS_TYPES = [
    //{ type: 'base', class: BaseBonus, size: 20, color: '#FFFF00', team: 'neutral' },
    { type: 'stopBot', class: StopOppositeTeamBonus_1.StopBonus, size: 30, color: '#FF0000', team: 'neutral' },
    { type: 'deactivatePoints', class: DeactivatePointsBonus_1.DeactivatePointsBonus, size: 30, color: '#05bbf4', team: 'neutral' },
    { type: 'changeColor', class: ChangeColorBonus_1.ChangeColorBonus, size: 30, color: '#00FF00', team: 'neutral' },
    { type: 'invisibleLaser', class: InvisibleLaserBonus_1.InvisibleLaserBonus, size: 30, color: '#ff7300', team: 'neutral' },
];
// появление каждые 30 секунд
// а еще нужно поправить движение бота, сначала убегание, потом захват бонуса
exports.AVAILABLE_BONUSES = [
    { type: 'base', count: 5 },
    { type: 'stopBot', count: 2 },
    { type: 'deactivatePoints', count: 2 },
    { type: 'changeColor', count: 2 },
    { type: 'invisibleLaser', count: 2 }
];
