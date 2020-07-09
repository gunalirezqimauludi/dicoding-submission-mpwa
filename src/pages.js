import ApiHelper from 'helper/api-helper.js';
import { getFavoriteMatch, getFavoriteTeam } from 'helper/db-helper.js';

const loaderPage = document.querySelector("loader-page");

export const pageMatch = async (idLeague) => {
    loaderPage.display = true;

    $("#content").html('<card-match></card-match>');
    const cardMatch = document.querySelector("card-match");

    try {
        const results = await ApiHelper.getMatches(idLeague);
        cardMatch.matches = results;
    } catch (message) {
        renderError(message);
    } finally {
        loaderPage.display = false;
    }
}

export const pageStanding = async (idLeague) => {
    loaderPage.display = true;

    $("#content").html('<card-standing></card-standing>');
    const cardStanding = document.querySelector("card-standing");

    try {
        const results = await ApiHelper.getStandings(idLeague);
        cardStanding.standings = results;
    } catch (message) {
        renderError(message);
    } finally {
        loaderPage.display = false;
    }
}

export const pageTeam = async (idLeague) => {
    loaderPage.display = true;

    $("#content").html('<card-team></card-team>');
    const cardTeam = document.querySelector("card-team");

    try {
        const results = await ApiHelper.getTeams(idLeague);
        cardTeam.teams = results;
    } catch (message) {
        renderError(message);
    } finally {
        loaderPage.display = false;
    }
}

export const pageFavoriteMatch = async () => {
    loaderPage.display = true;
    $("#content").html('<card-favorite-match></card-favorite-match>');
    const cardFavoriteMatch = document.querySelector("card-favorite-match");

    try {
        await getDelay()
        const results = await getFavoriteMatch();
        if (results.length > 0) {
            cardFavoriteMatch.teams = results;
        } else {
            renderEmpty('No Match Favorited', 'You haven\'t favorited any matchs yet, so we don\'t have anything to show you! Go favorit some!');
        }
        cardFavoriteMatch.matches = results;
    } catch (message) {
        renderError(message);
    } finally {
        loaderPage.display = false;
    }
}

export const pageFavoriteTeam = async () => {
    loaderPage.display = true;

    $("#content").html('<card-favorite-team></card-favorite-team>');
    const cardFavoriteTeam = document.querySelector("card-favorite-team");

    try {
        await getDelay()
        const results = await getFavoriteTeam();
        if (results.length > 0) {
            cardFavoriteTeam.teams = results;
        } else {
            renderEmpty('No Team Favorited', 'You haven\'t favorited any teams yet, so we don\'t have anything to show you! Go favorit some!');
        }
    } catch (message) {
        renderError(message);
    } finally {
        loaderPage.display = false;
    }
}

async function getDelay() {
    const message = 'waiting';
    return new Promise((resolve) => {
        setTimeout(() => resolve(message), 1000)
    })
}

function renderEmpty(title, message) {
    let content = `<div class="empty-state">
        <img src="assets/images/illustration/empty.png" alt="Empty Content">
        <h5>${title}</h5>
        <span>${message}</span>
    </div>`;

    $("#content").html(content);
}

function renderError(message) {
    const DEBUG = false;
    let content = `<div class="empty-state">
        <img src="assets/images/illustration/bad-gateway.png" alt="Failed To Retrieve Data">
        <h5>Failed To Retrieve Data</h5>
        <span>${DEBUG ? message : 'Data cannot be displayed due to an error on the server or because it is not connected to the internet and data is not available in the cache'}</span>
    </div>`;

    $("#content").html(content);
}