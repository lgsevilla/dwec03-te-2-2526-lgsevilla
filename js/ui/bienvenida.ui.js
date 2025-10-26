import { getUnlockedLevel } from "../data/gameSettings.data.js"
import { prepareGameStart } from "../service/gameSetup.service.js";

export function mountBienvenidaUI() {
    const nivelGrid = document.getElementById("nivelGrid");
    const nivelMsg = document.getElementById("nivelMsg");
    const startBtn = document.getElementById("btnStart");
    const startMsg = document.getElementById("startMsg");

    const diffInputs = [...document.querySelectorAll('input[name="dificultad"]')];

    let selectedLevel = 1;

    const unlocked = getUnlockedLevel();
    nivelGrid.innerHTML = "";

    for (let lvl = 1; lvl <= 5; lvl++) {
        const btn = document.createElement("button");
        btn.textContent = `Nivel ${lvl}${lvl > unlocked ? "🔒" : ""}`;
        btn.dataset.nivel = String(lvl);
        btn.classList.add("nivel-btn");
        if (lvl === selectedLevel) btn.classList.add("selected");

        if (lvl > unlocked) {
            btn.disabled = true;
            btn.classList.add("locked");
        }

        btn.addEventListener("click", () => {
            selectedLevel = lvl;
            [...nivelGrid.querySelectorAll(".nivel-btn")].forEach(b => b.classList.remove("selected"));
            nivelMsg.textContent = `Nivel ${lvl} seleccionado.`;
        });

        nivelGrid.appendChild(btn);
    }

    startBtn.addEventListener("click", () => {
        const chosenDiff = diffInputs.find(r => r.checked)?.value || "easy";

        const result = prepareGameStart({
            chosenDifficulty: chosenDiff,
            chosenLevel: selectedLevel
        });

        if (!result.ok) {
            startMsg.textContent = result.error;
            return;
        }

        window.location.href = "juego.html";
    });
}