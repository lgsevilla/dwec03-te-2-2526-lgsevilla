import { initBattle, getBattleState } from "../service/battle.service.js";
import {
    getRoundState,
    getBoardCells,
    handleCellClick,
    submitWord,
    finishPlayerActionPhase } from "../service/gameRound.service.js";

export function mountJuegoUI() {
    const playerNameEl = document.getElementById("playerName");
    const difficultyEl = document.getElementById("difficultyLabel");
    const levelEl = document.getElementById("levelLabel");
    const timerEl = document.getElementById("timerValue");
    const energyEl = document.getElementById("energyValue");

    const playerHpEl = document.getElementById("playerHp");
    const enemyHpEl = document.getElementById("enemyHp");
    const phaseEl = document.getElementById("phaseLabel");
    const boardEl = document.getElementById("board");
    const actionsEl = document.getElementById("actions");

    const wordInputEl = document.getElementById("wordInput");
    const sendWordBtn = document.getElementById("sendWordBtn");
    const wordFeedbackEl = document.getElementById("wordFeedback");
    const wordEntryEl = document.getElementById("wordEntry");

    wordInputEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            sendWordBtn.click();
        }
    });

    const user = JSON.parse(sessionStorage.getItem("usuarioLogeado"));
    if (!user) {
        window.location.replace("index.html");
        return;
    }
    playerNameEl.textContent = `Bienvenido ${user.nombre} ${user.apellido}!`;

    const settings = JSON.parse(sessionStorage.getItem("game_settings"));
    const battle = initBattle(settings);

    difficultyEl.textContent = String(battle.difficulty);
    levelEl.textContent = String(battle.level);

    // const rs = getRoundState();
    const cellsInit = getBoardCells();

    boardEl.innerHTML = "";
    cellsInit.forEach(cell => {
        const btn = document.createElement("button");
        btn.textContent = cell.letter;
        btn.classList.add("cell");
        btn.onclick = () => handleCellClick(cell);
        boardEl.appendChild(btn);
    });

    let lastRenderedRound = getBattleState().roundNumber;

    let pendingActions = { totalDamage: 0, totalHeal: 0 };

    actionsEl.innerHTML = `
    <button id="quickBtn">Ataque rápido (1 energía)</button>
    <button id="strongBtn">Ataque fuerte (3 energía)</button>
    <button id="healBtn">Curar (2 energía)</button>
    <button id="endTurnBtn">Terminar turno</button>
`;

    const quickBtn = document.getElementById("quickBtn");
    const strongBtn = document.getElementById("strongBtn");
    const healBtn = document.getElementById("healBtn");
    const endBtn = document.getElementById("endTurnBtn");

    quickBtn.onclick = () => {
        const rs = getRoundState();
        if (rs.energyThisRound >= 1) {
            rs.energyThisRound -= 1;
            pendingActions.totalDamage += 1;
        }
    };

    strongBtn.onclick = () => {
        const rs = getRoundState();
        if (rs.energyThisRound >= 3) {
            rs.energyThisRound -= 3;
            pendingActions.totalDamage += 5;
        }
    };

    healBtn.onclick = () => {
        const rs = getRoundState();
        if (rs.energyThisRound >= 2) {
            rs.energyThisRound -= 2;
            pendingActions.totalHeal += 4;
        }
    };

    endBtn.onclick = () => {
        finishPlayerActionPhase(pendingActions);
        pendingActions = { totalDamage: 0, totalHeal: 0 };

        wordFeedbackEl.textContent = "";
        wordInputEl.value = "";
    };

    sendWordBtn.onclick = () => {
        const typed = wordInputEl.value.trim();
        const result = submitWord(typed);

        if (result.ok) {
            wordFeedbackEl.textContent = "Correcto, +1 energía!";
            wordFeedbackEl.style.color = "green";
            wordInputEl.value = "";
        } else {
            let msg = "";
            switch (result.reason) {
                case "invalid":
                    msg = "No es una palabra válida en euskera";
                    break;
                case "letters":
                    msg = "No puedes formar esa palabra con estas letras";
                    break;
                case "duplicate":
                    msg = "Ya has usado esa palabra!";
                    break;
                case "phase":
                    msg = "Ahora no toca formar palabras!";
                    break;
                default:
                    msg = "Qué ha pasao? :(";
            }
            wordFeedbackEl.textContent = msg;
            wordFeedbackEl.style.color = "red";
        }
    };

    setInterval(() => {
        const rs = getRoundState();
        const bs = getBattleState();
        if (!rs || !bs) return;

        timerEl.textContent = rs.timeLeft;
        energyEl.textContent = rs.energyThisRound;
        playerHpEl.textContent = `${bs.playerHP} / ${bs.playerMaxHP}`;
        enemyHpEl.textContent = `${bs.enemyHP} / ${bs.enemyMaxHP}`;
        phaseEl.textContent = phaseLabel(rs.phase);

        if (rs.phase === "word") {
            wordEntryEl.style.display = "block";
            actionsEl.style.display = "none";
        } else if (rs.phase === "playerAction") {
            wordEntryEl.style.display = "none";
            actionsEl.style.display = "block";
        } else {
            wordEntryEl.style.display = "none";
            actionsEl.style.display = "none";
        }

        if (rs.phase === "word" && bs.roundNumber !== lastRenderedRound) {
            boardEl.innerHTML = "";
            const cells = getBoardCells();
            cells.forEach(cell => {
                const btn = document.createElement("button");
                btn.textContent = cell.letter;
                btn.classList.add("cell");
                btn.onclick = () => handleCellClick(cell);
                boardEl.appendChild(btn);
            });

            wordFeedbackEl.textContent = "";
            wordInputEl.value = "";

            lastRenderedRound = bs.roundNumber;
        }

        boardEl.style.pointerEvents = rs.phase === "word" ? "auto" : "none";

        if (rs.phase !== "word" && boardEl.children.length > 0 && rs.phase !== "playerAction") {
            boardEl.innerHTML = "";
        }
    }, 200);
}

function phaseLabel(phase) {
    switch (phase) {
        case "word": return "Forma palabras en euskera!";
        case "playerAction": return "Es tu turno de acción!";
        case "enemyAction": return "Es el turno del enemigo!";
        default: return "";
    }
}