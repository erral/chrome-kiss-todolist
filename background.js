"use strict";

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ todos: Array() }, (e) => {
    console.log("Todo list initialized");
  });
});
