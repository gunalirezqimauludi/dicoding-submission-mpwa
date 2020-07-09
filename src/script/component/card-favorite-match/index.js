import css from "./style.css";
import html from "./template.html";
import componentTemplateFactory from "utils/componentTemplateFactory";

import { setFavoriteMatch } from 'helper/db-helper.js';

const template = componentTemplateFactory(html, css);

class CardFavoriteMatch extends HTMLElement {

    set matches(items) {
        this._items = items;

        this.render();
    }

    async render() {
        $('#content card-favorite-match').html(template.content.cloneNode(true));

        for (const item of this._items) {
            let content = `
            <div class="card s12">
                <div class="column action-favorite">
                    <button class="btn-flat btn-favorite-match" data-item="${encodeURIComponent(JSON.stringify(item))}"><i class="material-icons text-danger">favorite</i></button>
                </div>
                <div class="card-content pt-0">
                    <div class="column">
                        <div class="team-image ${item.winner == 'HOME_TEAM' ? 'active' : ''}">
                            <img src="${item.hometeam_image}" alt="${item.hometeam_name}">
                        </div><span class="team-name">${item.hometeam_name}</span>
                    </div>
                    <div class="column">
                        <div class="match-info">
                            <span class="match-date">${item.date}</span>
                            <span class="match-score">${item.hometeam_score} - ${item.awayteam_score}</span>
                            <span class="match-arena">${item.status}</span>
                        </div>
                    </div>
                    <div class="column">
                        <div class="team-image ${item.winner == 'AWAY_TEAM' ? 'active' : ''}">
                            <img src="${item.awayteam_image}" alt="${item.awayteam_name}">
                        </div><span class="team-name">${item.awayteam_name}</span>
                    </div>
                </div>
            </div>`;

            $('#content card-favorite-match').append(content);
        };

        $('.btn-favorite-match').click(function () {
            const item = JSON.parse(decodeURIComponent($(this).data('item')));
            let data = {
                id: item.id,
                date: item.date,
                winner: item.winner,
                status: item.status,
                hometeam_id: item.hometeam_id,
                hometeam_name: item.hometeam_name,
                hometeam_score: item.hometeam_score,
                hometeam_image: item.hometeam_image,
                awayteam_id: item.awayteam_id,
                awayteam_name: item.awayteam_name,
                awayteam_score: item.awayteam_score,
                awayteam_image: item.awayteam_image
            }

            setFavoriteMatch(item.id, data);

            const state = $(this).find('i');
            if (state.html() == 'favorite') {
                state.html('favorite_border');
            } else {
                state.html('favorite');
            }
        });
    }
}

customElements.define("card-favorite-match", CardFavoriteMatch);