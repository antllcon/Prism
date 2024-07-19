export class StopBotBonus extends Bonus {
    constructor(x, y) {
        super(x, y);
        this.type = 'stopBot';
    }

    catch(entity, activeBots) {
        super.catch(entity);
        activeBots.forEach(bot => {
            bot.stop();
        });
        console.log("Все боты остановлены!");
    }
}