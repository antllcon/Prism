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
exports.InvisibleLaserBonus = void 0;
var BaseBonus_1 = require("./BaseBonus");
var player_1 = require("../player/player");
var script_js_1 = require("../../script.js");
var InvisibleLaserBonus = /** @class */ (function (_super) {
    __extends(InvisibleLaserBonus, _super);
    function InvisibleLaserBonus(x, y, size, color, team) {
        var _this = _super.call(this, x, y, size, color, team) || this;
        _this.type = 'invisibleLaser';
        return _this;
    }
    InvisibleLaserBonus.prototype.catch = function (entity) {
        _super.prototype.catch.call(this, entity);
        //время невидимости сделать
        //визуально затемнить
        var player = (0, player_1.getMyPlayer)(script_js_1.activePlayers);
        player.setInvisibleLasers(true);
        setTimeout(function () {
            player.setInvisibleLasers(false);
        }, 5000);
    };
    return InvisibleLaserBonus;
}(BaseBonus_1.BaseBonus));
exports.InvisibleLaserBonus = InvisibleLaserBonus;
