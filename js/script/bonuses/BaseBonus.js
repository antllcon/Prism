"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseBonus = void 0;
var BaseBonus = /** @class */ (function () {
    function BaseBonus(x, y, size, color, team) {
        if (size === void 0) { size = 20; }
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.type = 'generic';
        this.teamActivated = team;
    }
    BaseBonus.prototype.getX = function () { return this.x; };
    BaseBonus.prototype.getY = function () { return this.y; };
    BaseBonus.prototype.getSize = function () { return this.size; };
    BaseBonus.prototype.getColor = function () { return this.color; };
    BaseBonus.prototype.getTeam = function () { return this.teamActivated; };
    BaseBonus.prototype.catch = function (entity) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
    };
    return BaseBonus;
}());
exports.BaseBonus = BaseBonus;
