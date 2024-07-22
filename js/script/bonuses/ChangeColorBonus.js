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
exports.ChangeColorBonus = void 0;
var BaseBonus_1 = require("./BaseBonus");
var script_js_1 = require("../../script.js");
var ChangeColorBonus = /** @class */ (function (_super) {
    __extends(ChangeColorBonus, _super);
    function ChangeColorBonus(x, y, size, color, team) {
        var _this = _super.call(this, x, y, size, color, team) || this;
        _this.type = 'changeColor';
        return _this;
    }
    ChangeColorBonus.prototype.catch = function (entity) {
        _super.prototype.catch.call(this, entity);
        script_js_1.points.forEach(function (point) {
            if (point.getColor() === 'yellow') {
                point.setColor('purple');
                point.setTeam('purple');
            }
            else if (point.getColor() === 'purple') {
                point.setColor('yellow');
                point.setTeam('yellow');
            }
        });
    };
    return ChangeColorBonus;
}(BaseBonus_1.BaseBonus));
exports.ChangeColorBonus = ChangeColorBonus;
