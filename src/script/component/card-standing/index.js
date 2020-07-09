import css from "./style.css";
import html from "./template.html";
import componentTemplateFactory from "utils/componentTemplateFactory";

import { urlToHttps } from 'utils/converter.js';

const template = componentTemplateFactory(html, css);

class CardStanding extends HTMLElement {

    set standings(items) {
        this._items = items;
        this.render();
    }

    render() {
        $('#content card-standing').html(template.content.cloneNode(true));

        this._items.forEach((item) => {
            if (item.type == "TOTAL") {
                const group = (item.group != null ? item.group.replace('_', ' ') : item.stage.replace('_', ' '));
                let content = `<tr><td class="group" colspan="8">${group}</td></tr>`;

                item.table.forEach((table) => {
                    content += `<tr>
                        <td>
                            <div class="team-image">
                                <img src="${urlToHttps(table.team.crestUrl)}" onerror="this.src='assets/images/logo/Default_Team_Logo.png'" alt="${table.team.name}">
                            </div>
                            <span class="team-name">${table.team.name}</span>
                        </td>
                        <td>${table.playedGames}</td>
                        <td>${table.won}</td>
                        <td>${table.draw}</td>
                        <td>${table.lost}</td>
                        <td>${table.goalsFor}</td>
                        <td>${table.goalsAgainst}</td>
                        <td>${table.points}</td>
                    </tr>`
                })

                $('#content card-standing table tbody').append(content);
            }
        });
    }
}

customElements.define("card-standing", CardStanding);