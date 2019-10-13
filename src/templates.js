import {Template} from './transliterate.js'

var templates = {};

templates.none = new Template({
  name: "Geen sjabloon",
  func: (string, transliteration, mode) => string
});

templates.font_html = new Template({
  name: "Lettertype (HTML)",
  func: (string, transliteration, mode) => '<span style="font-family: ' + mode.font + ';">' + string + '</span>'
});

templates.font_bbcode = new Template({
  name: "Lettertype (BBCode)",
  func: (string, transliteration, mode) => '[font=' + mode.font + ']' + string + '[/font]'
});

templates.geop = new Template({
  name: "Geopoeia",
  func: (string, transliteration, mode) => '{{geop|' + string + '}}'
});

templates.geopl = new Template({
  name: "Geopoeia (Groot)",
  func: (string, transliteration, mode) => '{{geopl|' + string + '}}'
});

templates.geopb = new Template({
  name: "Geopoeia (Uitgelicht wanneer bewogen)",
  func: (string, transliteration, mode) => '{{geopb|' + string + '}}'
});

export default templates;
