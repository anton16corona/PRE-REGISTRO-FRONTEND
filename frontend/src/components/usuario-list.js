import { LitElement, html, css } from "lit";
import { UsuarioService } from "../services/usuario-service.js";

class UsuarioList extends LitElement {

    static properties = {
        usuarios: { type: Array },
        cargando: { type: Boolean }
    };

    static styles = css`
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 8px; border: 1px solid #ddd; text-align: left; }
        th { background: #007bff; color: white; }
        button { background: red; color: white; border: none; padding: 4px 8px; cursor: pointer; border-radius: 4px; }
    `;

    constructor() {
        super();
        this.usuarios = [];
        this.cargando = false;
    }

    async connectedCallback() {
        super.connectedCallback();
        await this.cargarUsuarios();

        // Escucha cuando se crea un usuario nuevo
        window.addEventListener("usuario-creado", () => this.cargarUsuarios());
    }

    async cargarUsuarios() {
        this.cargando = true;
        this.usuarios = await UsuarioService.getAll();
        this.cargando = false;
    }

    async eliminar(id) {
        await UsuarioService.eliminar(id);
        await this.cargarUsuarios();
    }

    render() {
        if (this.cargando) return html`<p>Cargando...</p>`;

        return html`
            <h3>Lista de Usuarios</h3>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.usuarios.map(u => html`
                        <tr>
                            <td>${u.id}</td>
                            <td>${u.nombre}</td>
                            <td>${u.email}</td>
                            <td>
                                <button @click=${() => this.eliminar(u.id)}>Eliminar</button>
                            </td>
                        </tr>
                    `)}
                </tbody>
            </table>
        `;
    }
}

customElements.define("usuario-list", UsuarioList);