export default class {
    constructor(params) {
        this.params = params;
    }

    setTitle(title) {
        this.title = title;
    }

    async getHtml() {
        return '<p>default content</p>'
    }
}