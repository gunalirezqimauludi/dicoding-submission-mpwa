importScripts("https://storage.googleapis.com/workbox-cdn/releases/5.1.3/workbox-sw.js");

import config from "./config.json";

import { registerRoute } from "workbox-routing";
import { CacheFirst, StaleWhileRevalidate } from "workbox-strategies";
import { precacheAndRoute } from "workbox-precaching";
import { ExpirationPlugin } from "workbox-expiration";
import { CacheableResponsePlugin } from "workbox-cacheable-response";

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

precacheAndRoute(
  [{
      url: "/",
      revision: "1",
    },
    {
      url: "/bundle.js",
      revision: "1",
    },
    {
      url: "/icon.png",
      revision: "1",
    },
    {
      url: "/index.css",
      revision: "1",
    },
    {
      url: "/index.html",
      revision: "1",
    },
    {
      url: "/manifest.json",
      revision: "1",
    },
    {
      url: "/assets/fonts/MaterialIcons-Regular.eot",
      revision: "1",
    },
    {
      url: "/assets/fonts/MaterialIcons-Regular.ttf",
      revision: "1",
    },
    {
      url: "/assets/fonts/MaterialIcons-Regular.woff",
      revision: "1",
    },
    {
      url: "/assets/fonts/MaterialIcons-Regular.woff2",
      revision: "1",
    },
    {
      url: "/assets/fonts/open-sans-v17-latin-regular.eot",
      revision: "1",
    },
    {
      url: "/assets/fonts/open-sans-v17-latin-regular.ttf",
      revision: "1",
    },
    {
      url: "/assets/fonts/open-sans-v17-latin-regular.woff",
      revision: "1",
    },
    {
      url: "/assets/fonts/open-sans-v17-latin-regular.woff2",
      revision: "1",
    },
    {
      url: "/assets/images/icons/icon_96x96.png",
      revision: "1",
    },
    {
      url: "/assets/images/icons/icon_128x128.png",
      revision: "1",
    },
    {
      url: "/assets/images/icons/icon_192x192.png",
      revision: "1",
    },
    {
      url: "/assets/images/icons/icon_256x256.png",
      revision: "1",
    },
    {
      url: "/assets/images/icons/icon_384x384.png",
      revision: "1",
    },
    {
      url: "/assets/images/icons/icon_512x512.png",
      revision: "1",
    },
    {
      url: "/assets/images/illustration/bad-gateway.png",
      revision: "1",
    },
    {
      url: "/assets/images/illustration/empty.png",
      revision: "1",
    },
    {
      url: "/assets/images/leagues/Bundesliga_Logo.png",
      revision: "1",
    },
    {
      url: "/assets/images/leagues/Eredivisie_Logo.png",
      revision: "1",
    },
    {
      url: "/assets/images/leagues/La_Liga_Logo.png",
      revision: "1",
    },
    {
      url: "/assets/images/leagues/Ligue1.png",
      revision: "1",
    },
    {
      url: "/assets/images/leagues/Premier_League_Logo.png",
      revision: "1",
    },
    {
      url: "/assets/images/leagues/UEFA_Champions_League.png",
      revision: "1",
    },
    {
      url: "/assets/images/logo/Default_Team_Logo.png",
      revision: "1",
    },
    {
      url: "/assets/images/logo/ESPN_Logo.png",
      revision: "1",
    },
  ], {
    ignoreURLParametersMatching: [/.*/],
  }
);

registerRoute(
  new RegExp(config.api_host),
  new StaleWhileRevalidate({
    cacheName: "api-cache",
  })
);

registerRoute(
  /.*(?:png|gif|jpg|jpeg|svg)$/,
  new CacheFirst({
    cacheName: "images-cache",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  })
);

self.addEventListener('push', event => {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  const options = {
    body: body,
    icon: 'assets/images/icon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('ESPN Notification', options)
  );
});

self.__WB_MANIFEST;