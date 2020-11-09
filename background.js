chrome.contextMenus.onClicked.addListener(({ selectionText }) => {
  chrome.tabs.create({
    url: generateUrl(selectionText),
    selected: true,
  });
});

chrome.runtime.onInstalled.addListener(() => chrome.contextMenus.create({
  id: 'translate-selection',
  contexts: ['selection'],
  title: 'Translate with DeepL "%s"'
}));
