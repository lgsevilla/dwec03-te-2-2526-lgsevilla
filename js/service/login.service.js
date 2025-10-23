import { ensureUsuarios, findByUsuario } from "../data/usuarios.data.js";

const PASSWORD_ALPHANUM = /^[A-Za-z0-9]+$/;

export async function initLoginData() {
    try { await ensureUsuarios(); }
    catch (e) { console.error(e); }
}

export function authenticate({ usuario, password }) {
    if (!usuario?.trim()) {
        return { success: false, message: "Introduce tu usuario." };
    }
    if (!password) {
        return { success: false, message: "Introduce tu contraseña." };
    }
    if (!PASSWORD_ALPHANUM.test(password)) {
        return { success: false, message: "La contraseña debe ser alfanumérica." };
    }

    const u = findByUsuario(usuario.trim());
    if (!u || u.password !== password) {
        return { success: false, message: "Usuario o contraseña incorrectos!" };
    }
    return { success: true, message: "Autorizado!", usuario: u };
}