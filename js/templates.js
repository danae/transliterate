import {Template} from './transliterate.js'

var templates = {};

templates.none = new Template({
  name: "Geen sjabloon",
  category: "@",
  func: (string, transliteration) => string
});

templates.font_html = new Template({
  name: "Lettertype (HTML)",
  category: "@",
  func: (string, transliteration) => '<span style="font-family: ' + transliteration.font + ';">' + string + '</span>'
});

templates.font_bbcode = new Template({
  name: "Lettertype (BBCode)",
  category: "@",
  func: (string, transliteration) => '[font=' + transliteration.font + ']' + string + '[/font]'
});

templates.geop = new Template({
  name: "Standaard",
  category: "Geopoeia",
  func: (string, transliteration) => '{{geop|' + string + '}}'
});

templates.geopl = new Template({
  name: "Groot",
  category: "Geopoeia",
  func: (string, transliteration) => '{{geopl|' + string + '}}'
});

templates.geopb = new Template({
  name: "Uitgelicht wanneer bewogen",
  category: "Geopoeia",
  func: (string, transliteration) => '{{geopb|' + string + '}}'
});

export default templates;
