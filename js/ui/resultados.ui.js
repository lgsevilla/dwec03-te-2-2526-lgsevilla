function getBattleResult() {
    const raw = sessionStorage.getItem("battleResult");
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

function getGameSettings() {
    const raw = sessionStorage.getItem("game_settings");
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

function saveGameSettings(obj) {
    sessionStorage.setItem("game_settings", JSON.stringify(obj));
}

function loadPlayerProgress() {
    const raw = localStorage.getItem("playerProgress");
    if (!raw) {
        return { maxLevelUnlocked: 1 };
    }
    try {
        return JSON.parse(raw);
    } catch {
        return { maxLevelUnlocked: 1 };
    }
}

function savePlayerProgress(progressObj) {
    localStorage.setItem("playerProgress", JSON.stringify(progressObj));
}

function buildButton(label, className, onClick) {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.className = className;
    btn.onclick = onClick;
    return btn;
}

function renderNoDataState() {
    const titleEl = document.getElementById("title");
    const subtitleEl = document.getElementById("subtitle");
    const statsBox = document.getElementById("statsBox");
    const group = document.getElementById("buttonGroup");

    titleEl.textContent = "Sin datos";
    titleEl.classList.add("resultado-title-generic");

    subtitleEl.textContent = "No hay combate receiente.";

    statsBox.style.display = "none";

    const menuBtn = buildButton(
        "Volver al menú principal",
        "resultado-btn resultado-btn-neutral",
        () => {
            window.location.href = "bienvenida.html";
        }
    );
    group.appendChild(menuBtn);
}

function renderResultState(data) {
    const { outcome, level, difficulty, playerHP, enemyHP, roundNumber } = data;

    const titleEl = document.getElementById("title");
    const subtitleEl = document.getElementById("subtitle");
    const statsBox = document.getElementById("statsBox");
    const group = document.getElementById("buttonGroup");

    document.getElementById("statLevel").textContent = level;
    document.getElementById("statDiff").textContent = difficulty;
    document.getElementById("statRound").textContent = roundNumber;
    document.getElementById("statPHP").textContent = playerHP;
    document.getElementById("statEHP").textContent = enemyHP;

    group.innerHTML = "";

    if (outcome === "win") {
        titleEl.textContent = "Victooooooooria!!!";
        titleEl.classList.add("resultado-title-win");

        subtitleEl.textContent = "Has derrotado al enemigo!";
        subtitleEl.classList.add("resultado-subtitle-win");

        const progress = loadPlayerProgress();
        const nextLevel = level + 1;

        if (nextLevel > progress.maxLevelUnlocked) {
            progress.maxLevelUnlocked = nextLevel;
            savePlayerProgress(progress);
        }

        const gs = getGameSettings();
        if (gs) {
            gs.level = nextLevel;
            saveGameSettings(gs);
        }

        const nextBtn = buildButton(
            "Siguiente nivel!",
            "resultado-btn resultado-btn-primary",
            () => {
                window.location.href = "juego.html";
            }
        );
        group.appendChild(nextBtn);

        const menuBtn = buildButton(
            "Menú principal",
            "resultado-btn resultado-btn-neutral",
            () => {
                window.location.href = "bienvenida.html";
            }
        );
        group.appendChild(menuBtn);

    } else {
        titleEl.textContent = "Has caído... :(";
        titleEl.classList.add("resultado-title-lose");

        subtitleEl.textContent = "Levántate, lucha otra vez!";
        subtitleEl.classList.add("resultado-subtitle-lose");

        const retryBtn = buildButton(
            "Intentar otra vez",
            "resultado-btn resultado-btn-danger",
            () => {
                window.location.href = "juego.html";
            }
        );
        group.appendChild(retryBtn);

        const menuBtn = buildButton(
            "Menú principal",
            "resultado-btn resultado-btn-neutral",
            () => {
                window.location.href = "bienvenida.html";
            }
        );
        group.appendChild(menuBtn);
    }

    sessionStorage.removeItem("battleResult");
}

(function initResultadosPage() {
    const data = getBattleResult();
    if (!data) {
        renderNoDataState();
    } else {
        renderResultState(data);
    }
})();