import AbstractView  from "./AbstractView";
export default class HomeView extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Home");
    }

    async getHtml() {
        return `
        <h1>${process.env.API}</h1>
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