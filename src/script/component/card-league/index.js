import config from 'src/config.json';
import css from "./style.css";
import html from "./template.html";
import componentTemplateFactory from "utils/componentTemplateFactory";

import DataLeagues from 'data/data-leagues.json';

const template = componentTemplateFactory(html, css);

class CardLeague extends HTMLElement {

    connectedCallback() {
        $(this).html(template.content.cloneNode(true));

        this.render();
    }

    render() {
        DataLeagues.leagues.map((league) => {
            let content = `
            <div class="card card-league-item ${config.default_league == league.id ? 'active': ''}" data-id="${league.id}">
                <div class="card-content">
                    <span class="card-image">
                        <img src="assets/images/leagues/${league.image}" alt="${league.image}">
                    </span>
                    <span class="card-title">${league.name}</span>
                </div>
            </div>`;

            $('.card-league').append(content);
        });
    }
}

customElements.define("card-league", CardLeague);