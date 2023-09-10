class TextField extends HTMLElement {
    constructor() {
        super();

        const div = document.createElement("div");
        div.className = "row";

        const label = this.getAttribute("label");
        const id = this.getAttribute("input-id");

        div.innerHTML = `

                <label for="username">${label}</label>
                <input type="text" id="${id}">

        `;

        this.attachShadow({mode: "open"});

        this.shadowRoot.appendChild(div);

        const style = document.createElement("style");

        style.textContent = `
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

customElements.define("dominant-textfield", TextField);