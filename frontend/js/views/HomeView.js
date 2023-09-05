import AbstractView  from "./AbstractView";
import CustomDialog from "../components/Dialog";

export default class HomeView extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Home");
    }

    async getHtml() {
        return `
        <custom-dialog>Hello</custom-dialog>
        <article>
          <h2>
            My first post
          </h2>
          <p>
            Vivamus fermentum semper porta. Nunc diam velit, adipscing ut
            tristique vitae sagittis vel odio. Maecenas convallis ullamcorper
            ultricied. Curabitur ornare, ligula semper consectetur sagittis, nisi
            diam iaculis velit, is fringille sem nunc vet mi.
          </p>
        </article>

        <article>
          <h2>
            My second news
          </h2>
          <p>
            Vivamus fermentum semper porta. Nunc diam velit, adipscing ut
            tristique vitae sagittis vel odio. Maecenas convallis ullamcorper
            ultricied. Curabitur ornare, ligula semper consectetur sagittis, nisi
            diam iaculis velit, is fringille sem nunc vet mi.
          </p>
        </article>`
    }
}