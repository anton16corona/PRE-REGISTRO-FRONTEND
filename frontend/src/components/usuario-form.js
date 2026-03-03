import { LitElement, html, css } from "lit";
import { UsuarioService } from "../services/usuario-service.js";

class UsuarioForm extends LitElement {

    static styles = css`
        form { display: flex; flex-direction: column; gap: 8px; max-width: 300px; }
        input { padding: 8px; border: 1px solid #ccc; border-radius: 4px; }
        button { padding: 8px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; }
    `;

    async guardar(e) {
        e.preventDefault();
        const form = e.target;

        const usuario = {
            nombre: form.nombre.value,
            email: form.email.value,
            password: form.password.value
        };

        await UsuarioService.crear(usuario);
        form.reset();

        this.dispatchEvent(new CustomEvent("usuario-creado", { bubbles: true, composed: true }));
    }

    render() {
        return html`
            <h3>Nuevo Usuario</h3>
            <form @submit=${this.guardar}>
                <input name="nombre" placeholder="Nombre" required />
                <input name="email" type="email" placeholder="Email" required />
                <input name="password" type="password" placeholder="Password" required />
                <button type="submit">Guardar</button>
            </form>
        `;
    }
}

customElements.define("usuario-form", UsuarioForm);