import { mountLoginUI } from "./ui/login.ui.js";
import { mountBienvenidaUI } from "./ui/bienvenida.ui.js";
import { mountJuegoUI } from "./ui/juego.ui.js";

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("loginForm")) {
        mountLoginUI();
    }

    if (document.getElementById("nivelGrid")) {
        mountBienvenidaUI();
    }

    if (document.getElementById("board")) {
        mountJuegoUI();
    }
});