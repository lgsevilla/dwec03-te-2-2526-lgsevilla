import { RoundState } from "../model/roundState.model.js";
import { saveGameSettings, loadGameSettings } from "../data/gameSettings.data.js";
import { saveRoundResult } from "../data/roundState.data.js";
import { isWordValidBasque } from "../data/words.data.js";

let roundState = null;
let boardCells = [];
let timerId = null;

function buildInitialRoundState() {
    const settings = loadGameSettings();
    if (!settings) {
        window.location.href = "bienvenida.html";
        return null;
    }

    return new RoundState({
        timeLeft: settings.roundTime,
        energyThisRound: 0,
        phase: "word",
        usedWords: []
    });
}

function randomLetter() {
    const LETTER_POOL = [
        // a: ~17%
        "a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a",
        // i: ~11%
        "i","i","i","i","i","i","i","i","i","i","i",
        // r: ~10%
        "r","r","r","r","r","r","r","r","r","r",
        // e: ~9%
        "e","e","e","e","e","e","e","e","e",
        // u: ~6%
        "u","u","u","u","u","u",
        // o: ~6%
        "o","o","o","o","o","o",
        // t: ~6%
        "t","t","t","t","t","t",
        // k: ~4%
        "k","k","k","k",
        // s: ~4%
        "s","s","s","s",
        // n: ~4%
        "n","n","n","n",
        // b: ~4%
        "b","b","b","b",
        // l: ~3%
        "l","l","l",
        // z: ~3%
        "z","z","z",
        // d: ~3%
        "d","d","d",
        // g: ~3%
        "g","g","g",
        // h: ~2%
        "h","h",
        // m: ~2%
        "m","m",
        // x: ~1%
        "x",
        // p: ~1%
        "p",
        // j: ~0.1%, but still needed for words like "joan"
        "j"
    ];

    const i = Math.floor(Math.random() * LETTER_POOL.length);
    return LETTER_POOL[i];
}

export function generateBoardCells(level) {
    const totalCells = 8 + (level - 1);

    const cells = Array.from({ length: totalCells}, (_, i) => ({
        id: i,
        letter: randomLetter(),
        selected: false,
    }));

    return cells;
}

export function startRound() {
    const settings = loadGameSettings();
    if (!settings) {
        window.location.href = "bienvenida.html";
        return { error: "no settings"};
    }

    roundState = buildInitialRoundState();
    if (!roundState) return { error: "no state" };

    boardCells = generateBoardCells(settings.level);

    if (timerId) {
        clearInterval(timerId);
        timerId = null;
    }

    timerId = setInterval(() => {
        if (!roundState) return;

        roundState.timeLeft--;

        if (roundState.timeLeft <= 0) {
            clearInterval(timerId);
            timerId = null;

            roundState.phase = "playerAction";
        }
    }, 1000);

    return {
        level: settings.level,
        difficulty: settings.difficulty,
        timeLeft: roundState.timeLeft,
        phase: roundState.phase,
        energyThisRound: roundState.energyThisRound,
        boardCells: boardCells
    };
}

export function getRoundState() {
    return roundState;
}

export function getBoardCells() {
    return boardCells;
}

export function handleCellClick(cellObj) {
    if (!roundState) return;

    cellObj.selected = !cellObj.selected;
}

function canBuildWordFromBoard(word, cells) {
    const w = word.toLowerCase().trim();
    const have = {};

    cells.forEach(cell => {
        const L = cell.letter.toLowerCase();
        have[L] = (have[L] || 0) + 1;
    });

    for (const ch of w) {
        if (!have[ch]) return false;
        have[ch]--;
    }
    return true;
}

export function submitWord(rawWord) {
    if (!roundState || roundState.phase !== "word") {
        return { ok: false, reason: "phase" };
    }

    const word = rawWord.toLowerCase().trim();

    if (!isWordValidBasque(word)) {
        return { ok: false, reason: "invalid" };
    }

    if (!canBuildWordFromBoard(word, boardCells)) {
        return { ok: false, reason: "letters" };
    }

    if (roundState.usedWords.includes(word)) {
        return { ok: false, reason: "duplicate" };
    }

    roundState.usedWords.push(word);
    roundState.energyThisRound += 1;
    return { ok: true };
}

export function finishPlayerActionPhase(pendingActions) {
    if (!roundState || roundState.phase !== "playerAction") return;
    // TODO: battle states to tie in to battle.service.js
    roundState.phase = "enemyAction";
}