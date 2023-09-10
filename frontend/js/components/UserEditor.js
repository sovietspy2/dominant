class UserEditor extends HTMLElement {

    constructor() {
        super();
        const form = document.createElement("form");

        form.innerHTML = `
            <h3> User editor form</h3>

            <div>
                <label for="username">Full name</label>
                <input type="text" id="fullaname">
            </div>

            <div>
                <label for="fullname">Full name</label>
                <input type="text" id="fullaname">
            </div>

            <div>
                <label for="email">Email</label>
                <input type="email" id="fullaname">
            </div>
        `;

        this.attachShadow({mode: "open"});

        this.shadowRoot.appendChild(form);

        this.shadowRoot.appendChild(p);

        //style

        const style = document.createElement("style");

        style.textContent = `
            h1 {
                text-align: center;
            }
        `;

        this.shadowRoot.appendChild(style);
    }

}

customElements.define("user-editor", UserEditor);