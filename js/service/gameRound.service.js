import { RoundState } from "../model/roundState.model.js";
import { saveGameSettings, loadGameSettings } from "../data/gameSettings.data.js";
import { saveRoundResult } from "../data/roundState.data.js";

let roundState = null;
let timerId = null;

function buildInitialRoundState() {
    const settings = loadGameSettings();
    if (!settings) {
        window.location.href = "bienvenida.html";
        return null;
    }

    return new RoundState({
        timeLeft: settings.roundTime,
        score: 0,
        level: settings.level,
        difficulty: settings.difficulty,
    });
}

export function generateBoardCells(level) {
    const base = 9;
    const extra = (level - 1) * 3;
    const totalCells = base + extra;

    return Array.from({ length: totalCells }, (_, i) => ({
        id: i,
        selected: false,
    }));
}

export function startRound() {
    roundState = buildInitialRoundState();
    if (!roundState) return { error: "no settings" };

    timerId = setInterval(() => {
        roundState.timeLeft--;

        if (roundState.timeLeft <= 0) {
            clearInterval(timerId);
            timerId = null;

            saveRoundResult({
                score: roundState.score,
                level: roundState.level,
                difficulty: roundState.difficulty,
            });

            window.location.href = "resultados.html";
        }
    }, 1000);

    return {
        level: roundState.level,
        difficulty: roundState.difficulty,
        timeLeft: roundState.timeLeft,
        boardCells: generateBoardCells(roundState.level),
    };
}

export function getRoundState() {
    return roundState;
}

export function handleCellClick(cellObj) {
    if (!roundState) return;

    if (!cellObj.selected) {
        cellObj.selected = true;
        roundState.score += 1;
    } else {
        cellObj.selected = false;
        roundState.score = Math.max(0, roundState.score - 1);
    }
}