import AbstractView  from "./AbstractView";

import { getCookie } from "../utils/cookieUtils";
export default class ProtectedView extends AbstractView {
    constructor(params) {
        super(params);
        this.postId = params.id;
        this.setTitle("Protected");
    }

    async getHtml() {
        return `<div><p>data from protected api: ${await this.loadUserData()}</p></div>`
        
    }

    async loadUserData() {
    const response = await fetch('http://localhost:5000/protected',  {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json', 
        'X-CSRF-TOKEN': getCookie('csrf_access_token'),
    }});
  
    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }
  
    const data = await response.json();
    console.log(data);
    return data.logged_in_as;
    }

  
}