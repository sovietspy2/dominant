class UserEditor extends HTMLElement {

    constructor() {
        super();
        const form = document.createElement("form");
        form.id = "form";

        form.innerHTML = `
            <h3> User editor form</h3>

            <div class="row">
                <label for="username">username</label>
                <input type="text" id="username">
            </div>

            <div class="row">
                <label for="fullname"> Full name</label>
                <input type="text" id="fullaname">
            </div>

            <div class="row">
                <label for="email">Email</label>
                <input type="email" id="email">
            </div>

            <div class="control">
                <button>Save</button>
             </div>
        `;

        this.attachShadow({mode: "open"});

        this.shadowRoot.appendChild(form);

        //style

        const style = document.createElement("style");

        style.textContent = `
            form {
                max-width: 600px;
                width: 80%;
            }

            h1 {
                text-align: center;
            }

            .row {
                display: flex;
                margin: 0.4rem;
                border: 2px solid gray;
                border-radius: 4px;
                align-items: center;
            }

            .row > label {
                text-align: center;
                background-color: lavenderblush;
                border-right: 2px solid gray;
            }

            .row > input {
                border: 0;
                padding-left: 1rem;
            }

            .row > * {
                height: 100%;
                display: block;
                width: 50%;
                line-height: 2rem;
            }

            input[type=text]:focus {
                padding: 0.5rem;
                padding-left: 1rem;
            }

            .control {
                display: flex;
                justify-content: flex-end;
                padding-right: 0.4rem; 
            }

            .control > button {
                background-color: aliceblue;
                border: 2px solid gray;
                border-radius: 4px;
                line-height: 2rem;
                padding-left: 2rem;
                padding-right: 2rem;
            }

            .control > button:hover {
                cursor: pointer;
            }
        `;

        this.shadowRoot.appendChild(style);
    }

}

customElements.define("user-editor", UserEditor);