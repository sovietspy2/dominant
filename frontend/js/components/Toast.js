class ToastContainer extends HTMLElement {
    constructor() {
        super();

        
        const div = document.createElement("div");

        this.attachShadow({mode: "open"});

        div.innerHTML = `
            <div class="toasts">
                <div class="toasts-container">
                    <template id="toast">
                    <div class="toast">
                        <span tpl="message"></span>
                    </div>
                    </template>
                </div>
            </div>
                `;

        this.shadowRoot.appendChild(div);

        const style = document.createElement("style");
        style.textContent = `
            
        `;

    }

    connectedCallback() {
    }
}

customElements.define("dominant-toast", ToastContainer)