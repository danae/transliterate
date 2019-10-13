import {Charmap, Transliteration} from '../transliterate.js';

export default {
  id: 'syhhttipp',
  name: "Syhh Ttipp",
  category: "Taratai",
  font: "'Syhh Ttipp Book', Geopoeia",
  transliteration: new Transliteration([
    // Punctuation
    [".", "\uE34A"], [",", "\uE34B"],

    // Numerals
    ["0","\uE340"],  ["1","\uE341"],  ["2","\uE342"],  ["3","\uE343"],
    ["4","\uE344"],  ["5","\uE345"],  ["6","\uE346"],  ["7","\uE347"],
    ["8","\uE348"],  ["9","\uE349"],

    // Letters
    ["a", "\uE320"], ["e", "\uE321"], ["v", "\uE322"], ["h", "\uE323"],
    ["i", "\uE324"], ["k", "\uE325"], ["g", "\uE326"], ["m", "\uE327"],
    ["n", "\uE328"], ["o", "\uE329"], ["p", "\uE32A"], ["b", "\uE32B"],
    ["r", "\uE32C"], ["s", "\uE32D"], ["z", "\uE32E"], ["t", "\uE32F"],
    ["d", "\uE330"], ["u", "\uE331"], ["y", "\uE332"], ["hh", "\uE333"],
    ["pp", "\uE334"], ["tt", "\uE335"]
  ], true, true)
};
