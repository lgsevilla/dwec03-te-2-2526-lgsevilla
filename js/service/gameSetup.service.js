import {getUnlockedLevel, saveGameSettings} from "../data/gameSettings.data.js";

function mapDifficultyToSeconds(diff) {
    switch (diff) {
        case "easy":        return 12;
        case "normal":      return 9;
        case "hard":        return 6;
        default:            return 12;
    }
}

export function isUserLoggedIn() {
    return !!sessionStorage.getItem("usuarioLogeado");
}

export function prepareGameStart({ chosenDifficulty, chosenLevel }) {
    if (!isUserLoggedIn()) {
        return { ok: false, error: "Debes iniciar sesión." };
    }

    const maxUnlocked = getUnlockedLevel();
    if (chosenLevel > maxUnlocked) {
        return { ok: false, error: "Ese nivel aún está bloqueado!" };
    }

    const roundTime = mapDifficultyToSeconds(chosenDifficulty);

    saveGameSettings({
        difficulty: chosenDifficulty,
        roundTime,
        level: chosenLevel,
        unlockedLevels: maxUnlocked,
    });

    return { ok: true };
}