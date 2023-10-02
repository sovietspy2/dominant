import AbstractView  from "./AbstractView";

export default class ChatView extends AbstractView {
    constructor(params) {
        super(params);
        this.postId = params.id;
        this.setTitle("Chat");
    }


    async getHtml() {

        return `<div>
            <chat-component></chat-component>
        </div>`
    }
}