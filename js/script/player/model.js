"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
var const_1 = require("./const.mjs");
var progressBar_1 = require("./progressBar/progressBar.mjs");
var script_js_1 = require("../../script.mjs");
var Player = /** @class */ (function () {
    function Player(i, id, socket_id) {
        this.invisibleLasers = false;
        this.type = const_1.DEFAULT_PLAYERS.type;
        this.id = id;
        this.main = (socket_id === id);
        this.x = const_1.DEFAULT_PLAYERS.x[i];
        this.y = const_1.DEFAULT_PLAYERS.y[i];
        this.size = const_1.DEFAULT_PLAYERS.size;
        this.speed = const_1.DEFAULT_PLAYERS.speed;
        this.team = const_1.DEFAULT_PLAYERS.team[i];
        this.color = const_1.DEFAULT_PLAYERS.color[i];
        this.state = const_1.DEFAULT_PLAYERS.state;
        this.abilityScale = 0;
        this.abilityActive = false;
        this.progressBar = new progressBar_1.ProgressBar(this);
        this.progressBar.render();
        this.stunnedUntil = 0;
        this.image = new Image();
        this.load = const_1.DEFAULT_PLAYERS.load;
        this.count = const_1.DEFAULT_PLAYERS.count;
        this.tick = const_1.DEFAULT_PLAYERS.tick;
        this.direction = const_1.DEFAULT_PLAYERS.direction;
    }
    Player.prototype.getDirection = function () { return this.direction; };
    Player.prototype.getType = function () { return this.type; };
    Player.prototype.getId = function () { return this.id; };
    Player.prototype.getX = function () { return this.x; };
    Player.prototype.getY = function () { return this.y; };
    Player.prototype.getImage = function () { return this.image; };
    Player.prototype.getLoad = function () { return this.load; };
    Player.prototype.getSize = function () { return this.size; };
    Player.prototype.getSpeed = function () { return this.speed; };
    Player.prototype.getTeam = function () { return this.team; };
    Player.prototype.getTick = function () { return this.tick; };
    Player.prototype.getCount = function () { return this.count; };
    Player.prototype.getColor = function () { return this.color; };
    // @ts-ignore
    Player.prototype.getState = function () { return this.state; };
    Player.prototype.getAbilityScale = function () { return this.abilityScale; };
    Player.prototype.isMain = function () { return this.main; };
    Player.prototype.isAlive = function () { return this.state === const_1.PLAYER_STATES.ACTIVE; };
    Player.prototype.isDead = function () { return this.state === const_1.PLAYER_STATES.DEAD; };
    Player.prototype.isStunned = function () { return this.state === const_1.PLAYER_STATES.STUNNED; };
    Player.prototype.moveOn = function (x, y) {
        this.x += x;
        this.y += y;
        this.progressBar.updatePosition(x, y);
    };
    Player.prototype.die = function () { this.state = const_1.PLAYER_STATES.DEAD; };
    Player.prototype.setColor = function (color) { this.color = color; };
    Player.prototype.setX = function (x) { this.x = x; };
    Player.prototype.setY = function (y) { this.y = y; };
    Player.prototype.setSpeed = function (speed) { this.speed = speed; };
    // @ts-ignore
    Player.prototype.setState = function (state) { this.state = state; };
    Player.prototype.setImage = function (image) { this.image.src = image; };
    Player.prototype.setLoad = function (load) { this.load = load; };
    Player.prototype.setCount = function (count) { this.count = count; };
    Player.prototype.setTick = function (tick) { this.tick = tick; };
    Player.prototype.setDirection = function (direction) { this.direction = direction; };
    Player.prototype.renaissance = function () {
        this.state = const_1.PLAYER_STATES.ACTIVE;
    };
    Player.prototype.renderPB = function () { this.progressBar.render(); };
    Player.prototype.setAbilityScale = function (value) { this.abilityScale = value; };
    Player.prototype.updateAbilityScale = function (deltaTime) {
        this.abilityScale += const_1.ABILITY_SCALE_SPEED * deltaTime;
        this.progressBar.update(this.abilityScale);
        if (this.abilityScale >= const_1.ABILITY_SCALE_MAX) {
            this.abilityScale = const_1.ABILITY_SCALE_MAX;
        }
    };
    Player.prototype.resetAbilityScale = function () {
        if (this.abilityScale >= const_1.ABILITY_SCALE_MAX) {
            this.activateAbility();
            this.abilityScale = 0;
            this.progressBar.update(this.abilityScale);
        }
    };
    Player.prototype.activateAbility = function () {
        var _this = this;
        this.abilityActive = true;
        this.setSpeed(const_1.MAX_SPEED);
        setTimeout(function () {
            _this.abilityActive = false;
            _this.setSpeed(const_1.DEFAULT_PLAYERS.speed);
        }, const_1.ABILITY_DURATION);
    };
    Player.prototype.makeStunned = function () {
        this.stunnedUntil = Date.now() + const_1.DURATION_DISABILITY;
        this.setSpeed(0);
        this.setState(const_1.PLAYER_STATES.STUNNED);
    };
    Player.prototype.recoverFromStunned = function () {
        this.stunnedUntil = 0;
        this.setSpeed(const_1.DEFAULT_PLAYERS.speed);
        if (this.isDead() || this.isStunned()) {
            this.renaissance();
        }
    };
    Player.prototype.drawCountdown = function () {
        if (this.isStunned()) {
            var remainingTime = this.stunnedUntil - Date.now();
            var seconds = Math.floor(remainingTime / 1000);
            var milliseconds = Math.floor((remainingTime % 1000) / 10);
            var countdownText = "".concat(seconds, ".").concat(milliseconds.toString().padStart(2, '0'));
            script_js_1.ctx.fillStyle = 'white';
            script_js_1.ctx.font = '16px Arial';
            script_js_1.ctx.fillText(countdownText, this.x, this.y - 30);
        }
    };
    Player.prototype.setInvisibleLasers = function (state) {
        this.invisibleLasers = state;
    };
    Player.prototype.isInvisibleLasers = function () {
        return this.invisibleLasers;
    };
    return Player;
}());
exports.Player = Player;
