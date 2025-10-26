const SS_ROUND_RESULT_KEY = "round_result";

export function saveRoundResult({ score, level, difficulty }) {
    const payload = { score, level, difficulty, finishedAt: Date.now() };
    sessionStorage.setItem(SS_ROUND_RESULT_KEY, JSON.stringify(payload));
}

export function loadRoundResult() {
    const raw = sessionStorage.getItem(SS_ROUND_RESULT_KEY);
    return raw ? JSON.parse(raw) : null;
}