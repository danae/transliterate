import {Charmap, Transliteration} from '../../transliterate.js';

export default {
  name: "Kuanga",
  category: "Taratai",
  font: "Geopoeia",
  transliteration: new Transliteration([
    // Punctuation
    [".", "\uE2D0"], [",", "\uE2D1"], ["?", "\uE2D2"], ["{", "\uE2D5"],
    ["}", "\uE2D6"],

    // Numerals
    ["0","\uE2DB"],  ["1","\uE2DC"],  ["2","\uE2DD"],  ["3","\uE2DE"],
    ["4","\uE2DF"],  ["5","\uE2E0"],  ["6","\uE2E1"],  ["7","\uE2E2"],
    ["8","\uE2E3"],  ["9","\uE2E4"],

    // Letters
    ["a", "\uE2E9"], ["e", "\uE2EA"], ["o", "\uE2EB"], ["ya", "\uE2EC"],
    ["ye", "\uE2ED"], ["yo", "\uE2EE"], ["wa", "\uE2EF"], ["we", "\uE2F0"],
    ["wo", "\uE2F1"], ["xha", "\uE2F2"], ["xhe", "\uE2F3"], ["xho", "\uE2F4"],
    ["ta", "\uE2F5"], ["te", "\uE2F6"], ["to", "\uE2F7"], ["qha", "\uE2F8"],
    ["qhe", "\uE2F9"], ["qho", "\uE2FA"], ["ka", "\uE2FB"], ["ke", "\uE2FC"],
    ["ko", "\uE2FD"], ["kua", "\uE2FE"], ["kue", "\uE2FF"], ["kuo", "\uE300"],
    ["gua", "\uE301"], ["gue", "\uE302"], ["guo", "\uE303"], ["ma", "\uE304"],
    ["me", "\uE305"], ["mo", "\uE306"], ["mba", "\uE307"], ["mbe", "\uE308"],
    ["mbo", "\uE309"], ["na", "\uE30A"], ["ne", "\uE30B"], ["no", "\uE30C"],
    ["nda", "\uE30D"], ["nde", "\uE30E"], ["ndo", "\uE30F"], ["nga", "\uE310"],
    ["nge", "\uE311"], ["ngo", "\uE312"], ["la", "\uE313"], ["le", "\uE314"],
    ["lo", "\uE315"], ["sa", "\uE316"], ["se", "\uE317"], ["so", "\uE318"],
    ["za", "\uE319"]
  ], true, false)
};
