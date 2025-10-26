import { mountLoginUI } from "./ui/login.ui.js";
import { mountBienvenidaUI } from "./ui/bienvenida.ui.js";

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("loginForm")) {
        mountLoginUI();
    }

    if (document.getElementById("nivelGrid")) {
        mountBienvenidaUI();
    }
});