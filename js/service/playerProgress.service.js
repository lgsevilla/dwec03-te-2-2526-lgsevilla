const STORAGE_KEY = "playerProgress";

export function loadPlayerProgress() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
        return { maxLevelUnlocked: 1 };
    }
    try {
        return JSON.parse(raw);
    } catch {
        return { maxLevelUnlocked: 1 };
    }
}

export function savePlayerProgress(progress) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (err) {
        console.error("Failed to save player progress:", err);
    }
}

export function getUnlockedLevel() {
    const progress = loadPlayerProgress();
    return progress.maxLevelUnlocked || 1;
}

export function unlockNextLevel(currentLevel) {
    const progress = loadPlayerProgress();
    if (currentLevel + 1 > progress.maxLevelUnlocked) {
        progress.maxLevelUnlocked = currentLevel + 1;
        savePlayerProgress(progress);
    }
}