import { getUnlockedLevel } from "../service/playerProgress.service.js";
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
        const isLocked = lvl > unlocked;

        const btn = document.createElement("button");
        btn.textContent = `Nivel ${lvl}${isLocked ? " 🔒" : ""}`;
        btn.dataset.nivel = String(lvl);
        btn.classList.add("nivel-btn");

        if (lvl === selectedLevel) {
            btn.classList.add("selected");
        }

        if (isLocked) {
            btn.disabled = true;
            btn.classList.add("locked");
        } else {
            btn.addEventListener("click", () => {
                selectedLevel = lvl;
                [...nivelGrid.querySelectorAll(".nivel-btn")].forEach(b => b.classList.remove("selected"));
                btn.classList.add("selected");
                nivelMsg.textContent = `Nivel ${lvl} seleccionado.`;
            });
        }

        nivelGrid.appendChild(btn);
    }

    nivelMsg.textContent = `Nivel ${selectedLevel} seleccionado.`;

    startBtn.addEventListener("click", () => {
        const chosenDiff = diffInputs.find(r => r.checked)?.value || "easy";

        const result = prepareGameStart({
            chosenDifficulty: chosenDiff,
            chosenLevel: selectedLevel
        });

        if (!result.ok) {
            startMsg.textContent = result.error;
            startMsg.classList.remove("ok");
            startMsg.classList.add("err");
            return;
        }

        startMsg.textContent = "Cargando partida...";
        startMsg.classList.remove("err");
        startMsg.classList.add("ok");

        window.location.href = "juego.html";
    });
}