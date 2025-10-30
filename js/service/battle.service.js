import { BattleState } from "../model/battleState.model.js";
import { startNewWordPhase } from "./gameRound.service.js";
import { saveRoundResult } from "../data/roundState.data.js";

let battleState = null;

export function initBattle(settings) {
    const enemyBaseHP = 10 + (settings.level - 1) * 5;
    battleState = new BattleState({
        playerHP: 30,
        playerMaxHP: 30,
        enemyHP: enemyBaseHP,
        enemyMaxHP: enemyBaseHP,
        roundNumber: 1,
        difficulty: settings.difficulty,
        level: settings.level,
        carryEnergy: 0,
    });

    startNewWordPhase(settings.roundTime, settings.level, battleState.carryEnergy);
    return battleState;
}

export function getBattleState() {
    return battleState;
}

export function applyPlayerActionsAndAdvance(playerActions) {
    if (!battleState) return;

    const dmg = playerActions.totalDamage || 0;
    const heal = playerActions.totalHeal || 0;

    battleState.enemyHP -= dmg;
    if (battleState.enemyHP < 0) {
        battleState.enemyHP = 0;
    }

    battleState.playerHP += heal;
    if (battleState.playerHP > battleState.playerMaxHP) {
        battleState.playerHP = battleState.playerMaxHP;
    }

    if (battleState.enemyHP <= 0) {
        saveRoundResult({
            outcome: "win",
            level: battleState.level,
            difficulty: battleState.difficulty,
        });

        sessionStorage.setItem("battleResult", JSON.stringify({
            outcome: "win",
            level: battleState.level,
            difficulty: battleState.difficulty,
            playerHP: battleState.playerHP,
            enemyHP: battleState.enemyHP,
            roundNumber: battleState.roundNumber,
        }));

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
    if (battleState.playerHP < 0) {
        battleState.playerHP = 0;
    }

    if (battleState.playerHP <= 0) {
        saveRoundResult({
            outcome: "lose",
            level: battleState.level,
            difficulty: battleState.difficulty,
        });

        sessionStorage.setItem("battleResult", JSON.stringify({
            outcome: "lose",
            level: battleState.level,
            difficulty: battleState.difficulty,
            playerHP: battleState.playerHP,
            enemyHP: battleState.enemyHP,
            roundNumber: battleState.roundNumber,
        }));

        window.location.href = "resultados.html";
        return;
    }

    battleState.roundNumber += 1;
    startNewWordPhaseFromBattle();
}

function startNewWordPhaseFromBattle() {
    const settings = JSON.parse(sessionStorage.getItem("game_settings"));
    if (!settings) return;

    startNewWordPhase(settings.roundTime, battleState.level, battleState.carryEnergy);
}