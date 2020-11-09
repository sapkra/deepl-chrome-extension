'use strict';
(() => {
  const sourceSelectElement = document.getElementById("source-lang-select");
  const targetSelectElement = document.getElementById("target-lang-select");

  chrome.storage.sync.get(['sourceLang'], (result) => {
    if (typeof result.sourceLang !== "undefined") {
      sourceSelectElement.value = result.sourceLang;
    } else {
      sourceSelectElement.value = 'en';
    }
  });
  chrome.storage.sync.get(['targetLang'], (result) => {
    if (typeof result.targetLang !== "undefined"){
      targetSelectElement.value = result.targetLang;
    } else {
      targetSelectElement.value = 'de';
    }
  });
  sourceSelectElement.addEventListener('change', () => {
    const sourceLang = sourceSelectElement.value;
    chrome.storage.sync.set({ sourceLang }, () => {
      console.log('Source is ' + sourceLang);
    });
  });
  targetSelectElement.addEventListener('change', () => {
    const targetLang = targetSelectElement.value;
    chrome.storage.sync.set({ targetLang }, () => {
      console.log('Target is ' + targetLang);
    });
  });
})();