import css from "./style.css";
import html from "./template.html";
import componentTemplateFactory from "utils/componentTemplateFactory";

const template = componentTemplateFactory(html, css);

class AppBar extends HTMLElement {

    connectedCallback() {
        $(this).html(template.content.cloneNode(true));

        this.brandLogo = this.getAttribute("brandLogo") || null;
        this.render();
    }

    render() {
        $(".brand-logo img").attr("src", this.brandLogo);
    }
}

customElements.define("app-bar", AppBar);