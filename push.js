const webpush = require('web-push');

const vapidKeys = {
    "publicKey": "BIytVcteKBwrgWdQHlXQMRNi6_he_SJI2HRkNY6RWz-VKJr7n_MtPZubvzbJyLmGYMYMPoVYH2DGLcnrCKdJMXU",
    "privateKey": "Cb2QZgT0MEameU4oUi9Pj3z4bZ9pLm79pdSXb1LngvU"
};

webpush.setVapidDetails(
    'mailto:hello.gunalirezqi@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

const pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/ebRyEaS3-UM:APA91bHgyhQllqwH2HTSQkdS-Hm2qPkyTWfgPqDogiY94S5RWmtJtR-EKewSaD8OgZT6P-QCxnjVj48VF6UJyRQgyUq4GoE-Lgfq_ri5nNfwEjTXhyXya781DSMAWyXIoh7L-YmVrLyw",
    "keys": {
        "p256dh": "BCyUXQFJ00slHQ/JOzDeuJ/bGie1l/FNXhgYcycWdByZpiDpAnOlL9fpwKrURvDrbpoa88TXeTNbo3HPHw+Kn6o=",
        "auth": "ub61GLbUVN8d5pEb9O95KA"
    }
};

const payload = 'Congratulations! Your application can already receive push notifications!';

const options = {
    gcmAPIKey: '408843223007',
    TTL: 60
};

webpush.sendNotification(
    pushSubscription,
    payload,
    options
).catch(function (err) {
    console.log(err);
});