'use strict';
(() => {
  // Make privacy cookie available in iframe
  chrome.cookies.get({
    url: 'https://www.deepl.com',
    name: 'privacySettings',
  },
  (cookie) => {
    chrome.cookies.set({
      url: 'https://www.deepl.com',
      name: cookie.name,
      value: cookie.value,
      domain: cookie.domain,
      path: cookie.path,
      secure: cookie.secure,
      httpOnly: cookie.httpOnly,
      sameSite: 'no_restriction',
      expirationDate: cookie.expirationDate,
      storeId: cookie.storeId,
    });
  });

  // Get selected text and open deepl.com
  chrome.tabs.executeScript({
    code: "window.getSelection().toString();"
  }, async (selection) => {
    const selectedText = selection[0];
    let url = await generateUrl(selectedText);
    if (selectedText !== "") {
      document.getElementsByTagName("iframe")[0].setAttribute('src', url);
      chrome.storage.sync.set({'lastText': selectedText }, () => {
        console.log('Saved:' + selectedText);
      });
    } else {
      chrome.storage.sync.get(['lastText'], async (result) => {
        if (result.lastText !== "") {
          url = await generateUrl(result.lastText);
        }
        document.getElementsByTagName("iframe")[0].setAttribute('src', url);
      });
    }
  });
})();
