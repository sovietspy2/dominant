import { loadUserDataApp } from "../utils/http";
import AbstractView  from "./AbstractView";

export default class ProtectedView extends AbstractView {
    constructor(params) {
        super(params);
        this.postId = params.id;
        this.setTitle("Protected");
    }

    async getHtml() {
        return `<div><p>data from protected api: ${await this.loadUserData()}</p><chat-component></chat-component></div>`
    }

    async loadUserData() {
    
      const response = loadUserDataApp();
  
    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }
  
    const data = await response.json();
    console.log(data);
    return data.logged_in_as;
    }

  
}