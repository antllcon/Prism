module.exports = class Client {
    constructor(socketId, userId)  {
        this.socketId = socketId;
        this.userId = userId;
        this.lastSeen = Date.now();
        this.isReady = false;
        this.inGame = false;
        this.needForPlayer = false;
        this.needForBot = false;
        this.team = '';
        this.color = '';
        this.name = 0;
        this.position = null;
    }

    getSocketId() {
        return this.socketId;
    }
    getUserId() {
        return this.userId;
    }
    getLastSeen() {
        return this.lastSeen;
    }
    getIsReady() {
        return this.isReady;
    }
    getInGame() {
        return this.inGame;
    }
    neadForPlayer() {
        return this.needForPlayer;
    }
    neadForBot() {
        return this.needForBot;
    }

    setSocketId(socketId) {
        this.socketId = socketId;
    }
    setUserId(userId) {
        this.userId = userId;
    }
    setLastSeen(date) {
        this.lastSeen = date;
    }
    setReady() {
        this.isReady = true;
    }
    setNotReady() {
        this.isReady = false;
    }
    setInGame(value) {
        this.inGame = value;
    }
    setNeedForPlayer() {
        this.needForPlayer = true;
    }
    setNeedForBot() {
        this.needForBot = true;
    }
};

