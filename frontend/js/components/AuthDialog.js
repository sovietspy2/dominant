import { loginApp, registerApp } from "../utils/http";

export default class AuthDialog extends HTMLElement {
  constructor() {
    super();

    const div = document.createElement("div");

    div.innerHTML = `
                  <dialog id="login-dialog">
                    <form>
                    <h2>${this.getAttribute("dialogTitle")}</h2>
                    <span id="error"></span>
                    <label for="username">Username:</label>
                    <input type="text" required id="username" required>
                    <label for="password">Password:</label>
                    <input type="password" required id="password" required>
                    <button id="close-button">Close</button>
                    <button type="submit" id="submit-button">${this.getButtonText()}</button>
                  </form>
                </dialog>`;

    this.attachShadow({ mode: "open" });

    this.shadowRoot.appendChild(div);

    // You can also style the elements within the shadow DOM
    const style = document.createElement("style");
    style.textContent = `
              #login-dialog {
                  width: 300px;
                  padding: 20px;
                  background-color: white;
                  border-radius: 5px;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                  text-align: center;
              }
              
              /* Style the dialog title */
              #login-dialog h2 {
                  font-size: 1.5rem;
                  margin-bottom: 20px;
              }
              
              /* Style the error message */
              #error {
                  color: red;
                  font-size: 14px;
                  margin-bottom: 10px;
              }
              
              /* Style labels for inputs */
              label {
                  display: block;
                  margin-top: 10px;
              }
              
              /* Style text inputs */
              input[type="text"],
              input[type="password"] {
                  width: 100%;
                  padding: 8px;
                  margin-top: 5px;
                  border: 1px solid #ccc;
                  border-radius: 3px;
              }
              
              /* Style buttons */
              button {
                  margin-top: 20px;
                  padding: 10px 20px;
                  background-color: #007bff;
                  color: white;
                  border: none;
                  border-radius: 3px;
                  cursor: pointer;
                  transition: background-color 0.3s ease;
              }
              
              button:hover {
                  background-color: #0056b3;
              }
              
              /* Style close button */
              #close-button {
                  background-color: #ccc;
                  color: black;
                  margin-right: 10px;
              }
              
              #close-button:hover {
                  background-color: #999;
              }
              
              /* Style submit button */
              #submit-button {
                  background-color: #007bff;
              }
              
              #submit-button:hover {
                  background-color: #0056b3;
              }
          `;
    this.shadowRoot.appendChild(style);
  }

  getButtonText() {
    const type = this.getAttribute("auth-event-type");
    if (type === "register") {
      return "Register";
    } else {
      return "Login";
    }
  }

  connectedCallback() {
    // Attach event listeners when the component is connected to the DOM
    const closeButton = this.shadowRoot.getElementById("close-button");
    const form = this.shadowRoot.querySelector("form");

    closeButton.addEventListener("click", (e) => {
      e.preventDefault();
      this.close();
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const type = this.getAttribute("auth-event-type");
      const usernameField = this.shadowRoot.querySelector('[type="text"]');
      const passwordField = this.shadowRoot.querySelector('[type="password"]');

      if (!usernameField.value || !passwordField.value) return;

      let response = null;

      if (type === "register") {
 
        response = await registerApp(
          usernameField.value,
          passwordField.value
        );
        console.log("user registered");
      } else if (type === "login") {
        response = await loginApp(usernameField.value, passwordField.value);

        this.fireLoginEvent();
        console.log("user authenticated");
      }

      if (!response.ok) {
        const data = await response.json();
        const error = this.shadowRoot.getElementById("error");
        error.innerText = data.message;

        console.warn(response);
      } else {
        this.close();
      }
    });
  }

  async fireLoginEvent() {
    const loginEvent = new CustomEvent("loginEvent", {
      detail: { message: "hello there, somebody logged in LoL" },
      bubbles: true, // Allow event to bubble up the DOM tree
    });

    this.dispatchEvent(loginEvent);
  }

  close() {
    const dialog = this.shadowRoot.querySelector("dialog");
    dialog.removeAttribute("open");
  }

  openDialog() {
    const dialog = this.shadowRoot.querySelector("dialog");
    dialog.setAttribute("open", true);
  }
}

customElements.define("custom-dialog", AuthDialog);
