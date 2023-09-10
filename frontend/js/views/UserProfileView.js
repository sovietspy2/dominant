import AbstractView  from "./AbstractView";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.postId = params.id;
        this.setTitle("User profile");
    }

    async getHtml() {
        return `<div>
            <user-editor></user-editor>
        </div>`
    }
}