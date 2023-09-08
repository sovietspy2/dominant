import AbstractView  from "./AbstractView";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.postId = params.id;
        this.setTitle("Logout");
    }

    async getHtml() {
        return `<div><p>you logged out</p></div>`
    }
}