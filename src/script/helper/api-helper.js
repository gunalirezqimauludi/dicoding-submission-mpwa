import config from 'src/config.json';

const options = {
    method: 'GET',
    headers: {
        "X-Auth-Token": config.api_key
    }
};

class ApiHelper {
    static getMatches(idLeague) {
        const API_URL_MATCH = `${config.api_host}v2/competitions/${idLeague}/matches?matchday=1`;
        if ('caches' in window) {
            caches.match(API_URL_MATCH).then(function (response) {
                if (response) {
                    response.json().then(function (responseJson) {
                        if (responseJson.matches) {
                            return Promise.resolve(responseJson.matches);
                        } else {
                            return Promise.reject(`${id} is not found`)
                        }
                    });
                }
            });
        }

        return fetch(API_URL_MATCH, options)
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.matches) {
                    return Promise.resolve(responseJson.matches);
                } else {
                    return Promise.reject(`${keyword} is not found`)
                }
            })
    };

    static getStandings(idLeague) {
        const API_URL_STANDING = `${config.api_host}v2/competitions/${idLeague}/standings`;
        if ('caches' in window) {
            caches.match(API_URL_STANDING).then(function (response) {
                if (response) {
                    response.json().then(function (responseJson) {
                        if (responseJson.standings) {
                            return Promise.resolve(responseJson.standings);
                        } else {
                            return Promise.reject(`${id} is not found`)
                        }
                    });
                }
            });
        }

        return fetch(API_URL_STANDING, options)
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.standings) {
                    return Promise.resolve(responseJson.standings);
                } else {
                    return Promise.reject(`${id} is not found`)
                }
            })
    }

    static getTeams(idLeague) {
        const API_URL_TEAM = `${config.api_host}v2/competitions/${idLeague}/teams`;
        if ('caches' in window) {
            caches.match(API_URL_TEAM).then(function (response) {
                if (response) {
                    response.json().then(function (responseJson) {
                        if (responseJson.teams) {
                            return Promise.resolve(responseJson.teams);
                        } else {
                            return Promise.reject(`${id} is not found`)
                        }
                    });
                }
            });
        }

        return fetch(API_URL_TEAM, options)
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.teams) {
                    return Promise.resolve(responseJson.teams);
                } else {
                    return Promise.reject(`${id} is not found`)
                }
            })
    }

    static getDetailTeam(idTeam) {
        const API_URL_DETAIL_TEAM = `${config.api_host}v2/teams/${idTeam}`;
        if ('caches' in window) {
            caches.match(API_URL_DETAIL_TEAM).then(function (response) {
                if (response) {
                    response.json().then(function (responseJson) {
                        if (responseJson) {
                            return Promise.resolve(responseJson);
                        } else {
                            return Promise.reject(`${id} is not found`)
                        }
                    });
                }
            });
        }

        return fetch(API_URL_DETAIL_TEAM, options)
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject(`${id} is not found`)
                }
            })
    }
}

export default ApiHelper;