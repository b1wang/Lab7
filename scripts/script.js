// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too
var body = document.querySelector('body');

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      router.setEntries(entries);
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        newPost.addEventListener('click', () => {
          router.setState(newPost);
        });
        document.querySelector('main').appendChild(newPost);
        history.pushState("home", "Journal Entries", "");
      });
    });
});

let settings = document.querySelector('img[alt="settings"]');
settings.addEventListener('click', () => {
    if (body.className != "settings") {
      router.setState('settings');
    }
});

let title = document.querySelector('h1');
title.addEventListener('click', () => {
    if (body.className != "home") {
      router.setState('home');
    }
});


window.onpopstate = function(event) {
  console.log(document.location);
  console.log(JSON.stringify(event.state));
  router.setState(event.state);
}; 