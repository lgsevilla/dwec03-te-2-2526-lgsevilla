import { mountLoginUI } from "./ui/login.ui.js";

document.addEventListener("DOMContentLoaded", () => {
    // aquí podrías enrutar si luego hay más pantallas
    const form = document.getElementById("loginForm");
    if (form) mountLoginUI();
});