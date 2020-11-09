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
