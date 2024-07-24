const StopBonus = require("./StopOppositeTeamBonus");
const DeactivatePointsBonus = require("./DeactivatePointsBonus");
const ChangeColorBonus = require("./ChangeColorBonus");
const InvisibleLaserBonus = require("./InvisibleLaserBonus");
const GAME_CONSTS = require("../consts")


const bonuses = {
    BonusType: {
        type: String,
        class: Function,
        size: Number,
        color: String,
        team: String
    },
    AvailableBonus: {
        type: String,
        count: Number
    },
    BONUS_TYPES: [
        // { type: 'base', class: BaseBonus, size: 20, color: '#FFFF00', team: 'neutral' },
        { type: 'stopBot', class: StopBonus, size: 30, color: '#FF0000', team: 'neutral' },
        { type: 'deactivatePoints', class: DeactivatePointsBonus, size: 30, color: '#05bbf4', team: 'neutral' },
        { type: 'changeColor', class: ChangeColorBonus, size: 30, color: '#00FF00', team: 'neutral' },
        { type: 'invisibleLaser', class: InvisibleLaserBonus, size: 30, color: '#ff7300', team: 'neutral' },
    ],
    AVAILABLE_BONUSES: [
        { type: 'base', count: 5 },
        { type: 'stopBot', count: 2 },
        { type: 'deactivatePoints', count: 2 },
        { type: 'changeColor', count: 2 },
        { type: 'invisibleLaser', count: 2 }
    ]
};


function createBonuses()    {
    const bonusesForRound = [];
    bonuses.AVAILABLE_BONUSES.forEach((bonusInfo)=> {
        for (let i = 0; i < bonusInfo.count; i++) {
            const bonusType = bonuses.BONUS_TYPES.find(
                (b)  => b.type === bonusInfo.type
        );
            if (bonusType) {
                const x = Math.floor(Math.random() * (GAME_CONSTS.canvasWidth - 40)) + 20;
                const y = Math.floor(Math.random() * (GAME_CONSTS.canvasHeight - 40)) + 20;
                const bonus = new bonusType.class(
                    x,
                    y,
                    bonusType.size,
                    bonusType.color,
                    bonusType.team
                );
                bonusesForRound.push(bonus);
            }
        }
    });
    return bonusesForRound;
}

module.exports = createBonuses;



