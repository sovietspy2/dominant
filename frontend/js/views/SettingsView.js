import AbstractView  from "./AbstractView";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.postId = params.id;
        this.setTitle("Home");
    }

    async getHtml() {
        return `<div><p>  this is settings and your param is ${this.postId}</p></div>`
    }
}