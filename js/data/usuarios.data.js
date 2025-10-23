import { Usuario } from '../model/usuario.model.js';

const LS_KEY = "usuarios";

export async function ensureUsuarios() {
    const cached = localStorage.getItem(LS_KEY);
    if (cached) return JSON.parse(cached);

    const response = await fetch("recursos/usuarios.json", { cache: "no-store"});
    if (!response.ok) throw new Error("No se ha podido cargar usuarios.json");
    const raw = await response.json();

    const usuarios = raw.map(u => new Usuario({
        id: u.id,
        nombre: u.nombre,
        apellido: u.apellido,
        usuario: u.usuario,
        password: u.password,
    }));

    localStorage.setItem(LS_KEY, JSON.stringify(usuarios));
    return usuarios;
}

export function findByUsuario(usuario) {
    const lista = JSON.parse(localStorage.getItem(LS_KEY) || "[]");
    return lista.find(u => u.usuario === usuario);
}