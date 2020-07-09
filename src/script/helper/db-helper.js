import { openDB } from 'idb';

let db;
const DATABASE_NAME = 'epsn-football';

export async function createIndexDB() {
    return db = await openDB(DATABASE_NAME, 1, {
        upgrade(db, oldVersion) {
            if (!db.objectStoreNames.contains('favoriteMatch')) {
                const favoriteMatch = db.createObjectStore('favoriteMatch', {
                    keyPath: 'id'
                })

                favoriteMatch.createIndex('id', 'id')
            }

            if (!db.objectStoreNames.contains('favoriteTeam')) {
                const favoriteTeam = db.createObjectStore('favoriteTeam', {
                    keyPath: 'id'
                })

                favoriteTeam.createIndex('id', 'id')
            }
        },
    });
}

// favorite match
export async function setFavoriteMatch(id, data) {
    const tx = db.transaction('favoriteMatch', 'readwrite')
    const store = tx.objectStore('favoriteMatch')

    let match = {
        id: id,
        date: data.date,
        winner: data.winner,
        status: data.status,
        hometeam_id: data.hometeam_id,
        hometeam_name: data.hometeam_name,
        hometeam_score: data.hometeam_score,
        hometeam_image: data.hometeam_image,
        awayteam_id: data.awayteam_id,
        awayteam_name: data.awayteam_name,
        awayteam_score: data.awayteam_score,
        awayteam_image: data.awayteam_image
    }

    const isExist = await store.get(id)

    if (isExist == undefined) {
        store.put(match)
        M.toast({
            html: `${data.hometeam_name} vs ${data.awayteam_name} has been favorited`,
            classes: 'bg-success'
        })
    } else {
        store.delete(id)
        M.toast({
            html: `${data.hometeam_name} vs ${data.awayteam_name} has been unfavorited`,
            classes: 'bg-success'
        })
    }

    return tx.complete;
}

export async function getFavoriteMatch() {
    const tx = db.transaction('favoriteMatch', 'readonly')
    const store = tx.objectStore('favoriteMatch')

    return await store.getAll()
}

export async function getFavoriteMatchById(id) {
    const tx = db.transaction('favoriteMatch', 'readonly')
    const store = tx.objectStore('favoriteMatch')

    return await store.get(id)
}

// favorite team
export async function setFavoriteTeam(id, data) {
    const tx = db.transaction('favoriteTeam', 'readwrite')
    const store = tx.objectStore('favoriteTeam')

    let team = {
        id: id,
        name: data.name,
        image: data.image,
        area_name: data.area_name
    }

    const isExist = await store.get(id)

    if (isExist == undefined) {
        store.put(team)
        M.toast({
            html: `${data.name} has been favorited`,
            classes: 'bg-success'
        })
    } else {
        store.delete(id)
        M.toast({
            html: `${data.name} has been unfavorited`,
            classes: 'bg-success'
        })
    }

    return tx.complete;
}

export async function getFavoriteTeam() {
    const tx = db.transaction('favoriteTeam', 'readonly')
    const store = tx.objectStore('favoriteTeam')

    return await store.getAll()
}

export async function getFavoriteTeamById(id) {
    const tx = db.transaction('favoriteTeam', 'readonly')
    const store = tx.objectStore('favoriteTeam')

    return await store.get(id)
}