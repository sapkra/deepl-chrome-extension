// Register context menu
chrome.contextMenus.onClicked.addListener(async ({ selectionText }) => {
  chrome.tabs.create({
    url: await generateUrl(selectionText),
    selected: true,
  });
});

chrome.runtime.onInstalled.addListener(() => chrome.contextMenus.create({
  id: 'translate-selection',
  contexts: ['selection'],
  title: 'Translate with DeepL "%s"'
}));

// Activate popup
chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {
            hostContains: '.'
          }
        })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
