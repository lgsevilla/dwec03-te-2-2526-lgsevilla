import { BattleState } from "../model/battleState.model.js";
import { startNewWordPhase } from "./round.service.js";
import { saveRoundResult } from "../data/roundState.data.js";

let battleState = null;

export function initBattle(settings) {
    const enemyBaseHP = 20 + (settings.level -1) * 5;
    battleState = new BattleState({
        playerHP: 30,
        playerMaxHP: 30,
        enemyHP: enemyBaseHP,
        enemyMaxHP: enemyBaseHP,
        difficulty: settings.difficulty,
        level: settings.level,
    });

    startNewWordPhase(settings.roundTime, settings.level);
    return battleState;
}

export function getBattleState() {
    return battleState;
}

export function applyPlayerActionsAndAdvance(playerActions) {
    if (!battleState) return;

    const { damage = 0, heal = 0 } = playerActions;
    battleState.enemyHP -= damage;
    battleState.playerHP = Math.min(
        battleState.playerMaxHP,
        battleState.playerHP + heal
    );

    if (battleState.enemyHP < 0) battleState.enemyHP = 0;

    if (battleState.enemyHP <= 0) {
        saveRoundResult({
            outcome: "win",
            level: battleState.level,
            difficulty: battleState.difficulty,
        });
        window.location.href = "resultados.html";
        return;
    }

    enemyTakesTurnAndAdvance();
}

export function enemyTakesTurnAndAdvance() {
    if (!battleState) return;

    let enemyDamage = 3;
    if (battleState.difficulty === "normal") enemyDamage = 4;
    if (battleState.difficulty === "hard") enemyDamage = 5;

    battleState.playerHP -= enemyDamage;
    if (battleState.playerHP < 0) battleState.playerHP = 0;

    if (battleState.playerHP <= 0) {
        saveRoundResult({
            outcome: "lose",
            level: battleState.level,
            difficulty: battleState.difficulty,
        });
        window.location.href = "resultados.html";
        return;
    }

    battleState.roundNumber += 1;
    startNewWordPhaseFromBattle();
}

function startNewWordPhaseFromBattle() {
    const settings = JSON.parse(sessionStorage.getItem("game_settings"));
    if (!settings) return;
    startNewWordPhase(settings.roundTime, battleState.level);
}