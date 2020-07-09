import config from 'src/config.json';

import {
    pageMatch,
    pageStanding,
    pageTeam,
    pageFavoriteMatch,
    pageFavoriteTeam
} from 'src/pages.js';

// component
import 'component/card-match';
import 'component/card-standing';
import 'component/card-team';
import 'component/card-favorite-match';
import 'component/card-favorite-team';

const main = async () => {
    function tabSelected(page) {
        $(".tab-bar li").removeClass("active");
        $(`.tab-bar li a[href='${page}']`).closest("li").addClass("active");
    }

    function bottomNavigationSelected(page) {
        if (page == 'home') {
            $(".bottom-navigation-bar li a").removeClass("active");
            $(`.bottom-navigation-bar li a[href='#home&match`).addClass("active");
        } else if (page == 'favorite') {
            $(".bottom-navigation-bar li a").removeClass("active");
            $(`.bottom-navigation-bar li a[href='#favorite&match']`).addClass("active");
        }
    }

    function locationHashChanged() {
        const hash = location.hash.replace('#', '').split('&');
        const page = hash[0] || 'home';
        const content = hash[1] || 'match';
        const locationURL = `#${page}&${content}`;

        const idLeague = $(".card-league-item.active").data('id') || config.default_league;

        tabSelected(locationURL);
        bottomNavigationSelected(page);

        if (page == 'favorite') {
            switch (content) {
                case 'match':
                    pageFavoriteMatch();
                    break;
                case 'team':
                    pageFavoriteTeam();
                    break;
                default:
                    pageFavoriteMatch();
                    break;
            }

            $("#page_home").css('display', 'none')
            $("#page_favorite").css('display', 'block')
            $("card-league").css('display', 'none')
        } else {
            switch (content) {
                case 'match':
                    pageMatch(idLeague);
                    break;
                case 'standing':
                    pageStanding(idLeague);
                    break;
                case 'team':
                    pageTeam(idLeague);
                    break;
                default:
                    pageMatch(idLeague);
                    break;
            }

            $("#page_home").css('display', 'block')
            $("#page_favorite").css('display', 'none')
            $("card-league").css('display', 'block')
        }
    }

    $(document).ready(function () {
        locationHashChanged();

        $('.card-league-item').click(function () {
            $(".card-league-item").removeClass("active");
            $(this).addClass("active");

            locationHashChanged();
        });
    });

    $(window).bind('hashchange', function (e) {
        locationHashChanged();
    });
};

export default main;