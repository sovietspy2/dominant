class UserEditor extends HTMLElement {

    constructor() {
        super();
        const form = document.createElement("form");
        form.id = "form";

        form.innerHTML = `
            <h3> User editor form</h3>

            <dominant-textfield label="Username"></dominant-textfield>
            <dominant-textfield label="Full name"></dominant-textfield>
            <dominant-textfield label="Email"></dominant-textfield>

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