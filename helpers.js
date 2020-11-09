const getFromStorage = keys => new Promise((resolve) =>
  chrome.storage.sync.get(keys, result => resolve(result)));

const generateUrl = async (selectedText) => {
  const {
    sourceLang = 'en',
    targetLang = 'de',
  } = await getFromStorage(['sourceLang', 'targetLang']);

  return selectedText === ""
    ? `https://www.deepl.com/translator#${sourceLang}/${targetLang}`
    : `https://www.deepl.com/translator#${sourceLang}/${targetLang}/${selectedText}`;
};
