import AbstractView from "./AbstractView";

class LoginDialog extends HTMLElement {
  constructor() {
    super();

    //const template = document.getElementById('login-dialog-template');
    const div = document.createElement('div');
    div.innerHTML = `
        <dialog open id="login-dialog">
          <h2>Login</h2>
          <span id="error"></span>
          <label for="username">Username:</label>
          <input type="text" id="username" required>
          <label for="password">Password:</label>
          <input type="password" id="password" required>
          <button id="close-button">Close</button>
          <button id="submit-button">Log In</button>
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

  connectedCallback() {
    // Attach event listeners when the component is connected to the DOM
    const closeButton = this.shadowRoot.getElementById("close-button");
    const submitButton = this.shadowRoot.getElementById("submit-button");

    closeButton.addEventListener("click", (e) => {
      e.preventDefault();
      this.close();
    });

    submitButton.addEventListener("click", async () => {
      //this.dispatchEvent(new Event('submit'));

      const username = this.shadowRoot.getElementById("username").value;
      const password = this.shadowRoot.getElementById("password").value;

        const response = await this.loginLogic(username, password);

        if (true) {
            const error = this.shadowRoot.getElementById("error");
            error.innerText = "We have a problem, try again!"
        }


      this.close();
    });

    //this.openDialog();
  }

  close() {
    const dialog = this.shadowRoot.getElementById("login-dialog");
    dialog.removeAttribute("open");
  }

  openDialog() {
    this.dialog.setAttribute("open", true);
  }

  async loginLogic(username, password) {
    const response = await fetch('http://localhost:5000/login',  {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json', 
    },
    body: JSON.stringify({username, password})
    });
  
    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }
  
    const data = await response.json();
    console.log(data);
    return data;
  }
}

customElements.define("login-dialog", LoginDialog);

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Login");
  }

  async getHtml() {
    return `<login-dialog></login-dialog>`;
  }
}


