import { initBattle, getBattleState } from "../service/battle.service.js";
import { getRoundState, getBoardCells, handleCellClick, finishPlayerActionPhase } from "../service/round.service.js";

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

    const user = JSON.parse(sessionStorage.getItem("usuarioLogeado"));
    if (!user) {
        window.location.replace("index.html");
        return;
    }
    playerNameEl.textContent = `Bienvenido ${user.nombre} ${user.apellido}!`;

    const settings = JSON.parse(sessionStorage.getItem("game_settings"));
    const battle = initBattle(settings);

    difficultyEl.textContent = battle.difficulty;
    levelEl.textContent = battle.level;

    let pendingActions = { damage: 0, heal: 0 };

    actionsEl.innerHTML = `
    <button id="attackBtn">Atacar (-1 energía)</button>
    <button id="healBtn">Curar (-1 energía)</button>
    <button id="endTurnBtn">Terminar turno</button>
    `;

    const attackBtn = document.getElementById("attackBtn");
    const healBtn = document.getElementById("healBtn");
    const endBtn = document.getElementById("endTurnBtn");

    attackBtn.onclick = () => {
        const rs = getRoundState();
        if (rs.energyThisRound > 0) {
            rs.energyThisRound--;
            pendingActions.damage += 3;
        }
    };

    healBtn.onclick = () => {
        const rs = getRoundState();
        if (rs.energyThisRound > 0) {
            rs.energyThisRound--;
            pendingActions.heal += 2;
        }
    };

    endBtn.onclick = () => {
        finishPlayerActionPhase(pendingActions);
        pendingActions = { damage: 0, heal: 0 };
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

        if (rs.phase === "word" && boardEl.children.length === 0) {
            boardEl.innerHTML = "";
            const cells = getBoardCells();
            cells.forEach(cell => {
                const btn = document.createElement("button");
                btn.textContent = `*`;
                btn.classList.add("cell");
                btn.onclick = () => handleCellClick(cell);
                boardEl.appendChild(btn);
            });
        }

        actionsEl.style.display = rs.phase === "playerAction" ? "block" : "none";
        boardEl.style.pointerEvents = rs.phase === "word" ? "auto" : "none";

        if (rs.phase !== "word" && boardEl.children.length > 0 && rs.phase !== "playerAction") {
            boardEl.innerHTML = "";
        }
    }, 200);
}

function phaseLabel(phase) {
    switch (phase) {
        case "word": return "Forma palabras!";
        case "playerAction": return "Es tu turno de acción!";
        case "enemyAction": return "Es el turno del enemigo!";
        default: return "";
    }
}