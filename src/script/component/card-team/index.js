import css from "./style.css";
import html from "./template.html";
import componentTemplateFactory from "utils/componentTemplateFactory";

import { setFavoriteTeam, getFavoriteTeamById } from 'helper/db-helper.js';
import { urlToHttps } from 'utils/converter.js';

const template = componentTemplateFactory(html, css);

class CardTeam extends HTMLElement {

    set teams(items) {
        this._items = items;
        this.render();
    }

    async render() {
        $('#content card-team').html(template.content.cloneNode(true));

        for (const item of this._items) {
            const favorited = await getFavoriteTeamById(item.id);
            let content = `<tr>
                <td width="10%">
                    <div class="team-image">
                        <img src="${urlToHttps(item.crestUrl)}" onerror="this.src='assets/images/logo/Default_Team_Logo.png'" alt="${item.name}">
                    </div>
                </td>
                <td>${item.name} <span>${item.area.name}</span></td>
                <td>
                    <button class="btn-flat btn-favorite-team" data-item="${encodeURIComponent(JSON.stringify(item))}"><i class="material-icons text-danger">${favorited ? 'favorite' : 'favorite_border'}</i></button>
                </td>
            </tr>`;

            $('#content card-team table tbody').append(content);
        };

        $('.btn-favorite-team').click(function () {
            const item = JSON.parse(decodeURIComponent($(this).data('item')));
            let data = {
                id: item.id,
                name: item.name,
                image: urlToHttps(item.crestUrl),
                area_name: item.area.name
            }

            setFavoriteTeam(item.id, data);

            const btnFavorite = $(this).find('i');
            if (btnFavorite.html() == 'favorite') {
                btnFavorite.html('favorite_border');
            } else {
                btnFavorite.html('favorite');
            }
        });
    }
}

customElements.define("card-team", CardTeam);