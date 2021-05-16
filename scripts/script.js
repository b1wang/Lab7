// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/Lab7/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}


var body = document.querySelector('body');

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      let num = 1;
      router.setEntries(entries);
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;

        newPost.id = num;
        num++;
        
        newPost.addEventListener('click', () => {
          router.setState(newPost.id);
        });
        document.querySelector('main').appendChild(newPost);
        router.setState("home");
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
  console.log("Loading from history");
  console.log(history.state);
  console.log(event.state);
  router.setState(event.state);
}; 