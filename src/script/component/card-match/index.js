import css from "./style.css";
import html from "./template.html";
import componentTemplateFactory from "utils/componentTemplateFactory";

import ApiHelper from 'helper/api-helper.js';
import { setFavoriteMatch, getFavoriteMatchById } from 'helper/db-helper.js';
import { urlToHttps } from 'utils/converter.js';

const template = componentTemplateFactory(html, css);

class CardMatch extends HTMLElement {

    set matches(items) {
        this._items = items;
        this.render();
    }

    async render() {
        $('#content card-match').html(template.content.cloneNode(true));

        const loadImageTeams = async () => {
            try {
                let idLeague = $(".card-league-item.active").data('id');
                const results = await ApiHelper.getTeams(idLeague);

                results.forEach((item) => {
                    $(`#team-image-${item.id}`).attr("src", urlToHttps(item.crestUrl));
                });
            } catch (message) {
                console.log(message);
            }
        }

        for (const item of this._items) {
            const favorited = await getFavoriteMatchById(item.id);
            let content = `
            <div class="card s12">
                <div class="column action-favorite">
                    <button class="btn-flat btn-favorite-match" data-item="${encodeURIComponent(JSON.stringify(item))}"><i class="material-icons text-danger">${favorited ? 'favorite' : 'favorite_border'}</i></button>
                </div>
                <div class="card-content pt-0">
                    <div class="column">
                        <div class="team-image ${item.score.winner == 'HOME_TEAM' ? 'active' : ''}">
                            <img src="assets/images/logo/Default_Team_Logo.png" id="team-image-${item.homeTeam.id}" alt="${item.homeTeam.name}">
                        </div><span class="team-name">${item.homeTeam.name}</span>
                    </div>
                    <div class="column">
                        <div class="match-info">
                            <span class="match-date">${item.season.startDate}</span>
                            <span class="match-score">${item.score.fullTime.homeTeam} - ${item.score.fullTime.awayTeam}</span>
                            <span class="match-arena">${item.status}</span>
                        </div>
                    </div>
                    <div class="column">
                        <div class="team-image ${item.score.winner == 'AWAY_TEAM' ? 'active' : ''}">
                            <img src="assets/images/logo/Default_Team_Logo.png" id="team-image-${item.awayTeam.id}" alt="${item.awayTeam.name}">
                        </div><span class="team-name">${item.awayTeam.name}</span>
                    </div>
                </div>
            </div>`;

            $('#content card-match').append(content);
        };

        $('.btn-favorite-match').click(function () {
            const item = JSON.parse(decodeURIComponent($(this).data('item')));
            let data = {
                id: item.id,
                date: item.season.startDate,
                winner: item.score.winner,
                status: item.status,
                hometeam_id: item.homeTeam.id,
                hometeam_name: item.homeTeam.name,
                hometeam_score: item.score.fullTime.homeTeam,
                hometeam_image: $(`#team-image-${item.homeTeam.id}`).attr("src"),
                awayteam_id: item.awayTeam.id,
                awayteam_name: item.awayTeam.name,
                awayteam_score: item.score.fullTime.awayTeam,
                awayteam_image: $(`#team-image-${item.awayTeam.id}`).attr("src")
            }

            setFavoriteMatch(item.id, data);

            const btnFavorite = $(this).find('i');
            if (btnFavorite.html() == 'favorite') {
                btnFavorite.html('favorite_border');
            } else {
                btnFavorite.html('favorite');
            }
        });

        loadImageTeams();
    }
}

customElements.define("card-match", CardMatch);