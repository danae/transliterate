import {Charmap, Transliteration} from '../../transliterate.js';

export default {
  name: "Cyleens",
  category: "Cylenië",
  font: "'Kylena Book', Geopoeia",
  charmap: new Charmap([
    "ð", "þ"
  ]),
  transliteration: new Transliteration([
    // Punctuation
    [".", "\uE1B0"], [",", "\uE1B1"],

    // Numerals
    ["0", "\uE1B8"], ["1", "\uE1B9"], ["2", "\uE1BA"], ["3", "\uE1BB"],
    ["4", "\uE1BC"], ["5", "\uE1BD"], ["q", "\uE1BE"],

    // Letters
    ["a", "\uE190"], ["ae", "\uE191"], ["b", "\uE192"], ["v", "\uE193"],
    ["d", "\uE194"], ["ð", "\uE195"], ["e", "\uE196"], ["ei", "\uE197"],
    ["g", "\uE198"], ["gh", "\uE199"], ["i", "\uE19A"], ["k", "\uE19B"],
    ["h", "\uE19C"], ["gv", "\uE19D"], ["'", "\uE19E"], ["y", "\uE19F"],
    ["l", "\uE1A0"], ["r", "\uE1A1"], ["o", "\uE1A2"], ["u", "\uE1A3"],
    ["p", "\uE1A4"], ["f", "\uE1A5"], ["s", "\uE1A6"], ["sh", "\uE1A7"],
    ["t", "\uE1A8"], ["þ", "\uE1A9"], ["w", "\uE1AA"], ["m", "\uE1AB"],
    ["n", "\uE1AC"], ["ng", "\uE1AD"], ["z", "\uE1AE"], ["zh", "\uE1BF"]
  ], true, false)
};
