module.exports = class Player {
    constructor(socketId, userId)  {
        this.socketId = socketId;
        this.userId = userId;
        this.x = null;
        this.y = null;
        this.team = null;
        this.color = null;
        this.state = null;
    }

    getSocketId() {
        return this.socketId;
    }
    getUserId() {
        return this.userId;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    getTeam() {
        return this.team;
    }
    getColor() {
        return this.color;
    }
    getState() {
        return this.state;
    }
    
    setSocketId(socketId) {
        this.socketId = socketId;
    }
    setUserId(userId) {
        this.userId = userId;
    }
    setX(x) {
        this.x = x;
    }
    setY(y) {
        this.y = y;
    }
    setTeam(team) {
        this.team = team;
    }
    setColor(color) {
        this.color = color;
    }
    setState(state) {
        this.state = state;
    }
};

