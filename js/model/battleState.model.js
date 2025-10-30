export class BattleState {
    constructor({
        playerHP = 30,
        playerMaxHP = 30,
        enemyHP = 20,
        enemyMaxHP = 20,
        roundNumber = 1,
        difficulty = "easy",
        level = 1,
        carryEnergy = 0
    }) {
        this.playerHP = playerHP;
        this.playerMaxHP = playerMaxHP;
        this.enemyHP = enemyHP;
        this.enemyMaxHP = enemyMaxHP;
        this.roundNumber = roundNumber;
        this.difficulty = difficulty;
        this.level = level;
        this.carryEnergy = carryEnergy;
    }
}