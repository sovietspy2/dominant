import { getCookie } from "../utils/cookieUtils";

export default class UserInfo extends HTMLElement {
  constructor() {
    super();
    const style = document.createElement("style");
    style.textContent = `
            user-info {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            user-info p {
                padding-left: 0.5rem;
                padding-right: 1rem;
            }
        `;

    this.appendChild(style);
  }

  connectedCallback() {
    const element = this;
    document.addEventListener("loginEvent", async (e) => {
      console.log("handling user login event");
      console.log(e.message);

      element.innerHTML += `
            <svg class="svg-icon" viewBox="0 0 20 20">
                    <path d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"></path>
            </svg>
            <p>${await this.loadUsername()}</p>
            `;
    });
  }

  async loadUsername() {
    const response = await fetch("http://localhost:5000/user", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        'X-CSRF-TOKEN': getCookie('csrf_access_token'),
      }
    });

    const data = await response.json();

    return data.username;
  }
}

customElements.define("user-info", UserInfo);
