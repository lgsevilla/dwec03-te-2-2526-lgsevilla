import { GameSettings } from '../model/gameSettings.model.js';

const LS_UNLOCK_KEY = "unlockedLevels";
const SS_SETTINGS_KEY = "game_settings";

export function getUnlockedLevel() {
    const raw = localStorage.getItem(LS_UNLOCK_KEY);
    const n = parseInt(raw, 10);
    return Number.isFinite(n) && n >= 1 ? n : 1;
}

export function setUnlockedLevel(newLevel) {
    const current = getUnlockedLevel();
    if (newLevel > current) {
        localStorage.setItem(LS_UNLOCK_KEY, String(newLevel));
    }
}

export function saveGameSettings(settingsObj) {
    const gs = new GameSettings(settingsObj);
    sessionStorage.setItem(SS_SETTINGS_KEY, JSON.stringify(gs));
}

export function loadGameSettings() {
    const raw = sessionStorage.getItem(SS_SETTINGS_KEY);
    return raw ? JSON.parse(raw) : null;
}