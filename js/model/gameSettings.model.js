export class GameSettings {
    constructor({ difficulty, roundTime, level, unlockedLevels }) {
        this.difficulty = difficulty;
        this.roundTime = roundTime;
        this.level = level;
        this.unlockedLevels = unlockedLevels;
    }
}