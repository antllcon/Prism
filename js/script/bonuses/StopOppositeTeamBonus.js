"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.StopBonus = void 0;
var BaseBonus_1 = require("./BaseBonus");
var StopBonus = /** @class */ (function (_super) {
    __extends(StopBonus, _super);
    function StopBonus(x, y, size, color, team) {
        var _this = _super.call(this, x, y, size, color, team) || this;
        _this.type = 'stopBot';
        return _this;
    }
    StopBonus.prototype.catch = function (entity, activeBots, activePlayers) {
        _super.prototype.catch.call(this, entity);
        if (entity.team === 'purple') {
            activeBots.forEach(function (bot) {
                if (bot.getTeam() !== entity.team && bot.getTeam() !== 'purple') {
                    bot.makeStunned();
                }
            });
            activePlayers.forEach(function (player) {
                if (player.getTeam() !== entity.team) {
                    player.makeStunned();
                }
            });
        }
        else if (entity.team === 'yellow') {
            activeBots.forEach(function (bot) {
                if (bot.getTeam() !== entity.team && bot.getTeam() !== 'yellow') {
                    bot.makeStunned();
                }
            });
            activePlayers.forEach(function (player) {
                if (player.getTeam() !== entity.team) {
                    player.makeStunned();
                }
            });
        }
    };
    return StopBonus;
}(BaseBonus_1.BaseBonus));
exports.StopBonus = StopBonus;
