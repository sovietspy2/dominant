

export default class CustomDialog extends HTMLElement {
    constructor() {
        super();
  
        //const template = document.getElementById('login-dialog-template');
        this.dialog = document.createElement(`dialog`);
        this.dialog.innerHTML = `
        <p>Please log in!</p>
        <form method="dialog">

        <slot></slot>
        
          <div>
            <button id="close-button" value="cancel" formmethod="dialog">Cancel</button>
            <button id="submit-button" value="register">Register</button>
          </div>
        </form>`;

        this.attachShadow({ mode: 'open' });

        this.shadowRoot.appendChild(this.dialog);

        // You can also style the elements within the shadow DOM
        const style = document.createElement('style');
        style.textContent = `
            p {
                color: blue;
                font-size: 18px;
            }
        `;
        this.shadowRoot.appendChild(style);

        }


        connectedCallback() {
            // Attach event listeners when the component is connected to the DOM
            const closeButton = this.shadowRoot.getElementById('close-button');
            const submitButton = this.shadowRoot.getElementById('submit-button');

            closeButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.close();
            });

            submitButton.addEventListener('click', () => {
                //this.dispatchEvent(new Event('submit'));
                this.close();
            });

            this.openDialog();
        }

        close() {
            this.dialog.removeAttribute('open');
        }

        openDialog() {
            this.dialog.setAttribute('open', true)
        }
}

customElements.define('custom-dialog', CustomDialog);

        