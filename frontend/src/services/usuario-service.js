const BASE_URL = "http://localhost:8080/tu-proyecto/api";

export const UsuarioService = {

    async getAll() {
        const res = await fetch('${BASE_URL}/usuarios');
        return res.json();
    },

    async getById(id) {
        const res = await fetch('${BASE_URL}/usuarios/${id}');
        return res.json();
    },

    async crear(usuario) {
        const res = await fetch('${BASE_URL}/usuarios', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario)
        });
        return res.json();
    },

    async actualizar(id, usuario) {
        const res = await fetch('${BASE_URL}/usuarios/${id}', {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario)
        });
        return res.json();
    },

    async eliminar(id) {
        await fetch('${BASE_URL}/usuarios/${id}', {
            method: "DELETE"
        });
    }
};