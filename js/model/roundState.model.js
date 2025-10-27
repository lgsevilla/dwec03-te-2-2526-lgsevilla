export class RoundState {
    constructor({ timeLeft, energyThisRound = 0, phase = "word", usedWords = [] }) {
        this.timeLeft = timeLeft;
        this.energyThisRound = energyThisRound;
        this.phase = phase;
        this.usedWords = usedWords;
    }
}