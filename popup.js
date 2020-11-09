'use strict';
(() => {
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
    chrome.tabs.executeScript( {
        code: "window.getSelection().toString();"
    }, function(selection) {
        var selectedText = selection[0];
        generateUrl(selectedText);
        var url = generateUrl(selectedText);
        if (selectedText !== "") {
            document.getElementsByTagName("iframe")[0].setAttribute('src', url);
            chrome.storage.sync.set({'lastText': selectedText}, function() {
                console.log('Saved:' + selectedText);
            });
        } else {
            chrome.storage.sync.get(['lastText'], function(result) {
                if (result.lastText !== "") {
                    url = generateUrl(result.lastText);
                }
                document.getElementsByTagName("iframe")[0].setAttribute('src', url);
            });
        }
    });
})();
