import css from "./style.css";
import html from "./template.html";
import componentTemplateFactory from "utils/componentTemplateFactory";

const template = componentTemplateFactory(html, css);

class TabBar extends HTMLElement {

    connectedCallback() {
        $(this).html(template.content.cloneNode(true));
    }
}

customElements.define("tab-bar", TabBar);