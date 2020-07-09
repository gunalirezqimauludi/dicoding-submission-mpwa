import css from "./style.css";
import html from "./template.html";
import componentTemplateFactory from "utils/componentTemplateFactory";

import { setFavoriteTeam } from 'helper/db-helper.js';

const template = componentTemplateFactory(html, css);

class CardFavoriteTeam extends HTMLElement {

    set teams(items) {
        this._items = items;

        this.render();
    }

    async render() {
        $('#content card-favorite-team').html(template.content.cloneNode(true));

        for (const item of this._items) {
            let content = `<tr>
                <td width="10%">
                    <div class="team-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                </td>
                <td>${item.name} <span>${item.area_name}</span></td>
                <td>
                    <button class="btn-flat btn-favorite-team" data-item="${encodeURIComponent(JSON.stringify(item))}"><i class="material-icons text-danger">favorite</i></button>
                </td>
            </tr>`;

            $('#content card-favorite-team table tbody').append(content);
        };

        $('.btn-favorite-team').click(function () {
            const item = JSON.parse(decodeURIComponent($(this).data('item')));
            let data = {
                id: item.id,
                name: item.name,
                image: item.image,
                area_name: item.area_name
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

customElements.define("card-favorite-team", CardFavoriteTeam);