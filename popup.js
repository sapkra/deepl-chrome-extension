'use strict';
(function () {
    chrome.cookies.get({
        url: 'https://www.deepl.com',
        name: 'privacySettings',
    },
    function (cookie) {
        console.log(cookie);
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
        var url = 'http://www.deepl.com/';
        if(selectedText != "") {
            url = "https://www.deepl.com/translator#en/de/" + selectedText;
            document.getElementsByTagName("iframe")[0].setAttribute('src', url);
            chrome.storage.sync.set({'lastText': selectedText}, function() {
                console.log('Saved:' + selectedText);
            });
        }else{
            chrome.storage.sync.get(['lastText'], function(result) {
                if (result.lastText != "") {
                    url = "https://www.deepl.com/translator#en/de/" + result.lastText;
                }
                document.getElementsByTagName("iframe")[0].setAttribute('src', url);
            });
        }
    });
})();
