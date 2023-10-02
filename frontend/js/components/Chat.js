import { loadUsernameApp } from "../utils/http";

class Chat extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
            <style>

            /* Basic styling for the chat container */
            .chat-container {
                width: 95%;
                margin: 0 auto;
                margin-top: 2rem;
                background-color: #f7f7f7;
                border: 1px solid #e0e0e0;
                border-radius: 5px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
                font-family: Arial, sans-serif;
            }

            /* Styling for chat messages */
            .chat-messages {
                padding: 10px;
                max-height: 300px;
                overflow-y: auto;
            }

            /* Styling for individual chat messages */
            .message {
                margin-bottom: 10px;
            }

            /* Styling for message username */
            .username {
                color: #6441a4;
                font-weight: bold;
            }

            /* Styling for message content */
            .message-content {
                margin-left: 5px;
            }

            /* Styling for the input container */
            .input-container {
                display: flex;
                align-items: center;
                padding: 10px;
                background-color: #fff;
            }

            /* Styling for the chat input field */
            .chat-input {
                flex-grow: 1;
                padding: 8px;
                border: 1px solid #ccc;
                border-radius: 5px;
                outline: none;
            }

            /* Styling for the send button */
            .send-button {
                margin-left: 10px;
                padding: 8px 16px;
                background-color: #6441a4;
                color: #fff;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            }
        </style>
        <template id="message-template">
            <div class="message">
                <span class="username">User1:</span>
                <span class="message-content">Hello there!</span>
            </div>
        </template>
        <div class="chat-container">
                    <div class="chat-messages" id="message-container">
                        <div class="message">
                            <span class="username">User2:</span>
                            <span class="message-content">Hi, how are you?</span>
                        </div>
                        <!-- Add more chat messages here -->
                    </div>
                    <div class="input-container">
                        <input type="text" placeholder="Type your message" class="chat-input" />
                        <button class="send-button">Send</button>
                    </div>
        </div>
        `;

    // WEBSOCKET

    this.socket = new WebSocket("ws://localhost:8888");

    this.socket.onmessage = (event) => {
      console.log(event);
      const packet = JSON.parse(event.data);
      //console.log(msg.message)

      const template = this.shadowRoot.getElementById("message-template");

      // Clone the template's content
      const clone = document.importNode(template.content, true);

      const messageContainer =
        this.shadowRoot.getElementById("message-container");

      //const messageElement = document.createElement("div");

      const usernameSpan = clone.querySelector(".username");
      const messageContentSpan = clone.querySelector(".message-content");

      // Set text content
      usernameSpan.textContent = packet.user;
      messageContentSpan.textContent = packet.message;

      //messageElement.textContent = packet.message;
      if (messageContainer != null) {
        messageContainer.appendChild(clone);
      } else {
        console.warn("message container was null");
      }
    };

    // Initialize variables for message input and chat box
    this.inputElement = this.shadowRoot.querySelector("input");
    this.chatBox = this.shadowRoot.querySelector(".chat-box");

    // Add an event listener for the "Send" button
    const sendButton = this.shadowRoot.querySelector("button");
    sendButton.addEventListener("click", this.sendMessage.bind(this));

    // const socket = new WebSocket("ws://localhost:5000"); // Replace with your WebSocket server URL
    // this.socket = socket;

    //     // Handle connection open event
    //     socket.addEventListener("open", (event) => {
    //         console.log("WebSocket connection opened.");
    //     });

    //     // Handle connection close event
    //     socket.addEventListener("close", (event) => {
    //         console.log("WebSocket connection closed.");
    //     });

    //     // Handle incoming messages from the server
    //     socket.addEventListener("message", (event) => {
    //         const messageContainer = document.getElementById("message-container");
    //         const messageElement = document.createElement("div");
    //         messageElement.textContent = event.data;
    //         messageContainer.appendChild(messageElement);
    //     });
  }

  async sendMessage() {
    const messageText = this.inputElement.value;
    if (messageText.trim() === "") return;

    // Create a new message element
    //const messageElement = document.createElement("div");
    // const usernameElement = document.createElement("div");

    // messageElement.className = "message user-message";
    // usernameElement.className = "message-username";
    // usernameElement.textContent = "You:";

    //messageElement.textContent = messageText;

    // Append the username and message to the chat box
    // messageElement.appendChild(usernameElement);
    // this.chatBox.appendChild(messageElement);

    const packet = {
      message: messageText,
      user: await this.loadUsername(),
    };

    const template = this.shadowRoot.getElementById("message-template");

    const clone = document.importNode(template.content, true);

    const messageContainer =
      this.shadowRoot.getElementById("message-container");

    //const messageElement = document.createElement("div");

    const usernameSpan = clone.querySelector(".username");
    const messageContentSpan = clone.querySelector(".message-content");

    // Set text content
    usernameSpan.textContent = packet.user;
    messageContentSpan.textContent = packet.message;

    messageContainer.appendChild(clone);

    this.socket.send(JSON.stringify(packet));

    // Clear the input field
    this.inputElement.value = "";

    // Scroll to the latest message
    //messageElement.scrollIntoView({ behavior: "smooth" });
  }

  async loadUsername() {
    const response = await loadUsernameApp();
    const data = await response.json();

    return data.username;
  }
}

customElements.define("chat-component", Chat);

// TODO: refactor this file