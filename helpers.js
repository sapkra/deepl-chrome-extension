const generateUrl = (selectedText) => {
  let url = 'http://www.deepl.com/';
  if (selectedText !== "") {
      url = "https://www.deepl.com/translator#en/de/" + selectedText;
  }
  return url;
};
