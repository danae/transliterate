import {Charmap, Transliteration} from '../transliterate.js';

let standard = {
  id: 'hongo_standard',
  name: "Standaard",
  charmap: new Charmap([
    "ā", "ã", "ą", "ä", "ē", "ẽ", "ę", "ī",
    "ō", "õ", "ǫ", "ö", "ū", "ũ", "ų", "з"
  ]),
  transliteration: new Transliteration([
    // Punctuation
    [".", "\uE420"], [",", "\uE421"], ["!", "\uE422"], ["?", "\uE423"],
    ["(", "\uE424"], [")", "\uE425"],

    // Consonants
    ["a", "\uE200"], ["ā", "\uE201"], ["ä", "\uE202"], ["b", "\uE203"],
    ["c", "\uE204"], ["ch", "\uE205"], ["d", "\uE206"], ["dh", "\uE207"],
    ["e", "\uE208"], ["ē", "\uE209"], ["f", "\uE20A"], ["g", "\uE20B"],
    ["gh", "\uE20C"], ["'", "\uE20D"], ["h", "\uE20E"], ["i", "\uE20F"],
    ["ī", "\uE210"], ["j", "\uE211"], ["l", "\uE212"], ["lh", "\uE213"],
    ["m", "\uE214"], ["n", "\uE215"], ["gn", "\uE216"], ["ng", "\uE217"],
    ["o", "\uE218"], ["ō", "\uE219"], ["ö", "\uE21A"], ["p", "\uE21B"],
    ["k", "\uE21C"], ["kh", "\uE21D"], ["r", "\uE21E"], ["rh", "\uE21F"],
    ["s", "\uE220"], ["t", "\uE221"], ["th", "\uE222"], ["u", "\uE223"],
    ["ū", "\uE224"], ["v", "\uE225"], ["w", "\uE226"], ["x", "\uE227"],
    ["y", "\uE228"], ["z", "\uE229"], ["з", "\uE22A"],

    // Combining marks
    ["!", "\uE238"], ["@", "\uE239"], ["#", "\uE23A"], ["$", "\uE23B"],
    ["%", "\uE23C"], ["^", "\uE23D"], ["&", "\uE23E"], ["*", "\uE23F"],
    ["(", "\uE237"],

    // Letters with combining marks
    ["ã", "\uE23B\uE200"],
    ["ą", "\uE23E\uE200"],
    ["ẽ", "\uE23B\uE208"],
    ["ę", "\uE23E\uE208"],
    ["õ", "\uE23B\uE218"],
    ["ǫ", "\uE23E\uE218"],
    ["ũ", "\uE23B\uE223"],
    ["ų", "\uE23E\uE223"]
  ], true, false)
};

let ctepic = {
  id: 'hongo_ctepic',
  name: "Ctepisch",
  charmap: standard.charmap,
  transliteration: standard.transliteration.extend(new Transliteration([
    // Letters with combining marks
    ["ai", "\uE239\uE200"],
    ["au", "\uE23A\uE200"],
    ["äi", "\uE239\uE202"],
    ["äu", "\uE23A\uE202"]
  ], true, false))
};

export default {
  id: 'hongo',
  name: "Hongo",
  category: "Atlantis",
  font: "'Hongo Book', Geopoeia",
  transliterations: [standard, ctepic]
};
