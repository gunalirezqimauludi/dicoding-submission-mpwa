import "regenerator-runtime";
import 'materialize-css/dist/js/materialize.js';
import "scss/style.scss";

// component
import "component/app-bar";
import "component/tab-bar";
import "component/bottom-navigation";
import "component/card-league";
import "component/loader-page";

import main from "view/main.js";

import { createIndexDB } from 'helper/db-helper.js';
import { urlBase64ToUint8Array } from 'utils/converter.js';

window.addEventListener('load', async () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
            .then(() => {
                console.log('Service worker registration successful.');
            })
            .catch((err) => {
                console.error('Service worker registration failed.', err);
            });

        Notification.requestPermission().then((result) => {
            if (result == 'denied') {
                console.log("Notification feature not permitted.");
            } else if (result == 'default') {
                console.error("The user closes the permission request dialog box.");
                return;
            }

            navigator.serviceWorker.ready.then(() => {
                if ('PushManager' in window) {
                    navigator.serviceWorker.getRegistration().then((reg) => {
                        reg.pushManager
                            .subscribe({
                                userVisibleOnly: true,
                                applicationServerKey: urlBase64ToUint8Array("BIytVcteKBwrgWdQHlXQMRNi6_he_SJI2HRkNY6RWz-VKJr7n_MtPZubvzbJyLmGYMYMPoVYH2DGLcnrCKdJMXU"),
                            })
                            .then((subscribe) => {
                                console.log('Successfully subscribed');
                                console.log('endpoint: ', subscribe.endpoint);
                                console.log('p256dh key: ', btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey('p256dh')))));
                                console.log('auth key: ', btoa(String.fromCharCode.apply(null, new Uint8Array(subscribe.getKey('auth')))));
                            })
                            .catch((e) => {
                                console.error('Unable to subscribe ', e.message);
                            });
                    });
                }
            });
        });
    }

    if ('indexedDB' in window) {
        await createIndexDB();
    } else {
        console.log('Indexed DB not supported by browser.');
    }
});

document.addEventListener("DOMContentLoaded", main);