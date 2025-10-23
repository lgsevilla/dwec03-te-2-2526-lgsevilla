import { initLoginData, authenticate } from "../service/login.service.js";

export async function mountLoginUI() {
    await initLoginData();

    const form = document.getElementById("loginForm");
    const usuario = document.getElementById("usuario");
    const password = document.getElementById("password");
    const message = document.getElementById("msg");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        message.textContent = "";

        const res = authenticate({
            usuario: usuario.value,
            password: password.value,
        });

        if (!res.success) {
            message.textContent = res.message;
            return;
        }

        sessionStorage.setItem("usuarioLogeado", JSON.stringify({
            id: res.usuario.id,
            usuario: res.usuario.usuario,
            nombre: res.usuario.nombre,
            apellido: res.usuario.apellido,
            loginDate: new Date().toISOString()
        }));

        window.location.href = "juego.html"
    });
}