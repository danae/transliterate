import {Charmap, Transliteration} from '../transliterate.js';

export default {
  id: 'holgun',
  name: "Holgun",
  category: "Taratai",
  charmap: new Charmap([
    "ã", "è", "é", "ë", "õ", "ö", "ú"
  ]),
  transliteration: new Transliteration([
    // Punctuation
    [".", "\uE38A"], [",", "\uE38B"],

    // Numerals
    ["0","\uE380"],  ["1","\uE381"],  ["2","\uE382"],  ["3","\uE383"],
    ["4","\uE384"],  ["5","\uE385"],  ["6","\uE386"],  ["7","\uE387"],
    ["8","\uE388"],  ["9","\uE389"],

    // Letters
    ["a", "\uE350"], ["ã", "\uE351"], ["b", "\uE352"], ["d", "\uE353"],
    ["e", "\uE354"], ["è", "\uE355"], ["é", "\uE356"], ["ë", "\uE357"],
    ["f", "\uE358"], ["g", "\uE359"], ["h", "\uE35A"], ["i", "\uE35B"],
    ["j", "\uE35C"], ["k", "\uE35D"], ["l", "\uE35E"], ["m", "\uE35F"],
    ["n", "\uE360"], ["ng", "\uE361"], ["o", "\uE362"], ["õ", "\uE353"],
    ["ö", "\uE364"], ["p", "\uE365"], ["r", "\uE366"], ["s", "\uE367"],
    ["sj", "\uE368"], ["t", "\uE369"], ["ú", "\uE36A"], ["u", "\uE36B"],
    ["v", "\uE36C"], ["w", "\uE36D"], ["z", "\uE36E"], ["zj", "\uE36F"]
  ], true, false)
};
