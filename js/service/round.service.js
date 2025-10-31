import { RoundState } from "../model/roundState.model.js";
import { getBattleState } from "./battle.service.js";

let roundState = null;
let roundTimerId = null;
let boardCells = [];

export function startNewWordPhase(roundTime, level) {
    roundState = new RoundState({ timeLeft: roundTime, phase: "word" });
    boardCells = generateBoardCells(level);

    roundTimerId = setInterval(() => {
        roundState.timeLeft--;
        if (roundState.timeLeft <= 0) {
            clearInterval(roundTimerId);
            roundTimerId = null;
            roundState.phase = "playerAction";
        }
    }, 1000)
}

export function generateBoardCells(level) {
    const base = 9;
    const extra = (level -1) * 3;
    const total = base + extra;
    return Array.from({ length: total }, (_, i) => ({ id: i, selected: false}));
}

// TODO: Unused old functions - non disruptive, but should probably delete so round and gameRound can be merged into single service
export function handleCellClick(cellObj) {
    if (!roundState || roundState.phase !== "word") return;

    if (!cellObj.selected) {
        cellObj.selected = true;
        roundState.energyThisRound++;
    } else {
        cellObj.selected = false;
        roundState.energyThisRound = Math.max(0, roundState.energyThisRound -1);
    }
}

export function getRoundState() {
    return roundState;
}
export function getBoardCells() {
    return boardCells;
}

export function finishPlayerActionPhase(playerActions) {
    const battle = getBattleState();
    if (!battle) return;
    roundState.phase = "enemyAction";

    import("./battle.service.js").then(module => {
        module.applyPlayerActionsAndAdvance(playerActions);
    });
}