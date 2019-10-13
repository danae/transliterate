import {Charmap, Transliteration} from '../transliterate.js';

export default {
  id: 'tatsuric',
  name: "Tatsurisch",
  category: "Taratai",
  font: "Geopoeia",
  transliteration: new Transliteration([
    // Punctuation
    [".", "\uE390"], [",", "\uE391"], [";", "\uE392"],

    // Diacritics
    ["~", "\uE399"], [":", "\uE39A"],

    // Syllabic letters
    ["pa", "\uE39B"], ["pi", "\uE39C"], ["pu", "\uE39D"], ["ta", "\uE39F"],
    ["ti", "\uE3A0"], ["tu", "\uE3A1"], ["ka", "\uE3A3"], ["ki", "\uE3A4"],
    ["ku", "\uE3A5"], ["fa", "\uE3A7"], ["fi", "\uE3A8"], ["fu", "\uE3A9"],
    ["sa", "\uE3AB"], ["si", "\uE3AC"], ["su", "\uE3AD"], ["tsa", "\uE3AF"],
    ["tsi", "\uE3B0"], ["tsu", "\uE3B1"], ["za", "\uE3B3"], ["zi", "\uE3B4"],
    ["zu", "\uE3B5"], ["ma", "\uE3B7"], ["mi", "\uE3B8"], ["mu", "\uE3B9"],
    ["na", "\uE3BB"], ["ni", "\uE3BC"], ["nu", "\uE3BD"], ["ba", "\uE3BF"],
    ["bi", "\uE3C0"], ["bu", "\uE3C1"], ["da", "\uE3C3"], ["di", "\uE3C4"],
    ["du", "\uE3C5"], ["ga", "\uE3C7"], ["gi", "\uE3C8"], ["gu", "\uE309"],
    ["tha", "\uE3CB"], ["thi", "\uE3CC"], ["thu", "\uE3CD"], ["ha", "\uE3D2"],
    ["hi", "\uE3D3"], ["hu", "\uE3D4"], ["ra", "\uE3D6"], ["ri", "\uE3D7"],
    ["ru", "\uE3D8"],

    // Vowel letters
    ["a", "\uE3CF"], ["i", "\uE3D0"], ["u", "\uE3D1"],

    // Syllabic letters with diacritics
    ["pe", "\uE39B\uE39A"], ["py", "\uE39C\uE39A"], ["po", "\uE39D\uE39A"], ["te", "\uE39F\uE39A"],
    ["ty", "\uE3A0\uE39A"], ["to", "\uE3A1\uE39A"], ["ke", "\uE3A3\uE39A"], ["ky", "\uE3A4\uE39A"],
    ["ko", "\uE3A5\uE39A"], ["fe", "\uE3A7\uE39A"], ["fy", "\uE3A8\uE39A"], ["fo", "\uE3A9\uE39A"],
    ["se", "\uE3AB\uE39A"], ["sy", "\uE3AC\uE39A"], ["so", "\uE3AD\uE39A"], ["tse", "\uE3AF\uE39A"],
    ["tsy", "\uE3B0\uE39A"], ["tso", "\uE3B1\uE39A"], ["ze", "\uE3B3\uE39A"], ["zy", "\uE3B4\uE39A"],
    ["zo", "\uE3B5\uE39A"], ["me", "\uE3B7\uE39A"], ["my", "\uE3B8\uE39A"], ["mo", "\uE3B9\uE39A"],
    ["ne", "\uE3BB\uE39A"], ["ny", "\uE3BC\uE39A"], ["no", "\uE3BD\uE39A"], ["be", "\uE3BF\uE39A"],
    ["by", "\uE3C0\uE39A"], ["bo", "\uE3C1\uE39A"], ["de", "\uE3C3\uE39A"], ["dy", "\uE3C4\uE39A"],
    ["do", "\uE3C5\uE39A"], ["ge", "\uE3C7\uE39A"], ["gy", "\uE3C8\uE39A"], ["go", "\uE309\uE39A"],
    ["the", "\uE3CB\uE39A"], ["thy", "\uE3CC\uE39A"], ["tho", "\uE3CD\uE39A"], ["he", "\uE3D2\uE39A"],
    ["hy", "\uE3D3\uE39A"], ["ho", "\uE3D4\uE39A"], ["re", "\uE3D6\uE39A"], ["ry", "\uE3D7\uE39A"],
    ["ro", "\uE3D8\uE39A"],

    // Vowel letters with diacritics
    ["e", "\uE3CF\uE39A"], ["y", "\uE3D0\uE39A"], ["o", "\uE3D1\uE39A"],

    // Consonant letters
    ["p", "\uE39E"], ["t", "\uE3A2"], ["k", "\uE3A6"], ["f", "\uE3AA"],
    ["s", "\uE3AE"], ["ts", "\uE3B2"], ["z", "\uE3B6"], ["m", "\uE3BA"],
    ["n", "\uE3BE"], ["b", "\uE3C2"], ["d", "\uE3C6"], ["g", "\uE3CA"],
    ["th", "\uE3CE"], ["h", "\uE3D5"], ["r", "\uE3D9"]
  ], true, false)
};
