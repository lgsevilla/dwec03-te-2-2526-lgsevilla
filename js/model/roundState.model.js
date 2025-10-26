export class RoundState {
    constructor({ timeLeft, energyThisRound = 0, phase = "word" }) {
        this.timeLeft = timeLeft;
        this.energyThisRound = energyThisRound;
        this.phase = phase;
    }
}