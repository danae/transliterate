import {TupleArray, Charmap, Mapping, Transliteration} from './transliterate.js';
import {LudiviMapping} from './ludivi.js';

var modes = {};

modes.daedian = new Transliteration({
  name: "Daedisch",
  category: "Taratai",
  font: "'Daedian Book', Geopoeia",
  charmap: new Charmap([
    "ā", "ã", "ą", "ä", "ē", "ẽ", "ę", "ī",
    "ō", "õ", "ǫ", "ö", "ū", "ũ", "ų", "з"
  ]),
  mapping: new Mapping([
    // Punctuation
    [".", "\uE24A"], [";", "\uE24B"], [",", "\uE24C"], ["{", "\uE24E"],
    ["}", "\uE24F"],

    // Numerals
    ["0","\uE240"],  ["1","\uE241"],  ["2","\uE242"],  ["3","\uE243"],
    ["4","\uE244"],  ["5","\uE245"],  ["6","\uE246"],  ["7","\uE247"],
    ["8","\uE248"],  ["9","\uE249"],

    // Letters
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
  ],true,false)
});

modes.daedian_cila = new Transliteration({
  name: "Daedisch (Cila)",
  category: "Taratai",
  font: "'Daedian Book', Geopoeia",
  charmap: modes.daedian.charmap,
  mapping: modes.daedian.mapping.extend(new Mapping([
    // Letters with combining marks
    ["ai", "\uE239\uE200"],
    ["au", "\uE23A\uE200"],
    ["äi", "\uE239\uE202"],
    ["äu", "\uE23A\uE202"]
  ],true,false))
});

modes.ulughese = new Transliteration({
  name: "Ulughees",
  category: "Taratai",
  font: "Geopoeia",
  charmap: new Charmap([
    "Ă", "ă", "Ä", "ä", "Ã", "ã", "Á", "á",
    "Č", "č", "Ð", "ð", "Ĕ", "ĕ", "Ë", "ë",
    "Ẽ", "ẽ", "É", "é", "Ǝ", "ǝ", "Ǧ", "ǧ",
    "Ğ", "ğ", "Ĭ", "ĭ", "Ï", "ï", "Ĩ", "ĩ",
    "Í", "í", "Ɩ", "ɩ", "K̊", "k̊", "Ł", "ł",
    "Ŋ", "ŋ", "Ñ", "ñ", "Ŏ", "ŏ", "Ö", "ö",
    "Õ", "õ", "Ó", "ó", "P̊", "p̊", "Q̊", "q̊",
    "Ś", "ś", "Š", "š", "Ş", "ş", "T̊", "t̊",
    "Ç", "ç", "Þ", "þ", "Ŭ", "ŭ", "Ü", "ü",
    "Ũ", "ũ", "Ú", "ú", "Ỹ", "ỹ", "Ý", "ý",
    "Ź", "ź", "Ž", "ž", "Ɂ", "ɂ"
  ]),
  mapping: new Mapping([
    // Punctuation
    [".", "\uE250"], [",", "\uE251"], ["!", "\uE252"], ["?", "\uE253"],
    [":", "\uE254"], ["{", "\uE257"], ["}", "\uE258"],

    // Numerals
    ["0","\uE25D"],  ["1","\uE25E"],  ["2","\uE25F"],  ["3","\uE260"],
    ["4","\uE261"],  ["5","\uE262"],  ["6","\uE263"],  ["7","\uE264"],
    ["8","\uE265"],  ["9","\uE266"],

    // Letters
    ["e", "\uE26B"], ["ĕ", "\uE26C"], ["ë", "\uE26D"], ["ẽ", "\uE26E"],
    ["é", "\uE26F"], ["p", "\uE271"], ["p̊", "\uE272"], ["b", "\uE273"],
    ["f", "\uE274"], ["v", "\uE275"], ["u", "\uE276"], ["ŭ", "\uE277"],
    ["ü", "\uE278"], ["ũ", "\uE279"], ["ú", "\uE27A"], ["w", "\uE27C"],
    ["m", "\uE27E"], ["t", "\uE27F"], ["t̊", "\uE280"], ["Ç", "\uE281"],
    ["d", "\uE282"], ["s", "\uE283"], ["ś", "\uE284"], ["š", "\uE285"],
    ["ş", "\uE286"], ["z", "\uE287"], ["ź", "\uE288"], ["ž", "\uE289"],
    ["a", "\uE28A"], ["ă", "\uE28B"], ["ä", "\uE28C"], ["ã", "\uE28D"],
    ["á", "\uE28E"], ["r", "\uE290"], ["l", "\uE292"], ["n", "\uE294"],
    ["ŋ", "\uE295"], ["ñ", "\uE296"], ["i", "\uE297"], ["ĭ", "\uE298"],
    ["ï", "\uE299"], ["ĩ", "\uE29A"], ["í", "\uE29B"], ["j", "\uE29D"],
    ["J", "\uE29E"], ["\\", "\uE29F"], ["Y", "\uE2A0"], ["C", "\uE2A1"],
    ["Č", "\uE2A2"], ["g", "\uE2A3"], ["G", "\uE2A4"], ["ǧ", "\uE2A5"],
    ["ğ", "\uE2A6"], ["o", "\uE2A7"], ["ŏ", "\uE2A8"], ["ö", "\uE2A9"],
    ["õ", "\uE2AA"], ["ó", "\uE2AB"], ["h", "\uE2AD"], ["'", "\uE2AF"],
    ["ɂ", "\uE2B0"], ["y", "\uE2B1"], ["ỹ", "\uE2B2"], ["ý", "\uE2B3"],
    ["k", "\uE2B5"], ["k̊", "\uE2B6"], ["q", "\uE2B7"], ["q̊", "\uE2B8"],
    ["þ", "\uE2B9"], ["ð", "\uE2BA"], ["x", "\uE2BB"], ["c", "\uE2BD"],
    ["ć", "\uE2BE"], ["č", "\uE2BF"], ["ç", "\uE2C0"], ["Q", "\uE2C1"],
    ["ǝ", "\uE2C2"], ["ɩ", "\uE2C3"], ["ł", "\uE2C5"]
  ],false,false)
});

modes.kuanga = new Transliteration({
  name: "Kuanga",
  category: "Taratai",
  font: "Geopoeia",
  charmap: new Charmap([]),
  mapping: new Mapping([
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
  ],true,false)
});

modes.syhh_ttipp = new Transliteration({
  name: "Syhh Ttipp",
  category: "Taratai",
  font: "'Syhh Ttipp Book', Geopoeia",
  charmap: new Charmap([]),
  mapping: new Mapping([
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
  ],true,true)
});

/*modes.holgun = new Transliteration({
  name: "Holgun",
  category: "Taratai",
  charmap: new Charmap([
    "ã", "è", "é", "ë", "õ", "ö", "ú"
  ]),
  mapping: new Mapping([
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
  ],true,false)
});*/

modes.tatsuric = new Transliteration({
  name: "Tatsurisch",
  category: "Taratai",
  font: "Geopoeia",
  charmap: new Charmap([]),
  mapping: new Mapping([
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
  ],true,false)
});

modes.cylenian = new Transliteration({
  name: "Cyleens",
  category: "Cylenië",
  font: "'Kylena Book', Geopoeia",
  charmap: new Charmap(["ð"]),
  mapping: new Mapping([
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
  ],true,false)
});

modes.syrrin = new Transliteration({
  name: "Syrrin",
  category: "Cylenië",
  font: "'Syrrin Book', Geopoeia",
  charmap: new Charmap(["ː"]),
  mapping: new Mapping([
    // Punctuation
    [".", "\uE1F0"], [",", "\uE1F1"],

    // Numerals
    ["0", "\uE1F8"], ["1", "\uE1F9"], ["2", "\uE1FA"], ["3", "\uE1FB"],
    ["4", "\uE1FC"], ["5", "\uE1FD"], ["@", "\uE1FE"],

    // Letters
    ["a", "\uE1C0"], ["aː", "\uE1C1"], ["ae", "\uE1C2"], ["aeː", "\uE1C3"],
    ["b", "\uE1C4"], ["v", "\uE1C5"], ["d", "\uE1C6"], ["dh", "\uE1C7"],
    ["e", "\uE1C8"], ["eː", "\uE1C9"], ["g", "\uE1CA"], ["gh", "\uE1CB"],
    ["gw", "\uE1CC"], ["ghw", "\uE1CD"], ["i", "\uE1CE"], ["iː", "\uE1CF"],
    ["k", "\uE1D0"], ["kh", "\uE1D1"],["kw", "\uE1D2"], ["khw", "\uE1D3"],
    ["'", "\uE1D4"], ["y", "\uE1D5"], ["l", "\uE1D6"], ["r", "\uE1D7"],
    ["o", "\uE1D8"], ["oː", "\uE1D9"], ["u", "\uE1DA"], ["p", "\uE1DB"],
    ["f", "\uE1DC"], ["s", "\uE1DD"], ["sh", "\uE1DE"], ["t", "\uE1DF"],
    ["th", "\uE1E0"], ["w", "\uE1E1"], ["wː", "\uE1E2"], ["m", "\uE1E3"],
    ["n", "\uE1E4"], ["ng", "\uE1E5"], ["z", "\uE1E6"], ["zh", "\uE1E7"]
  ],true,false)
});

modes.ludivi = new Transliteration({
  name: "Ludivi",
  category: "Garah",
  font: "Garahcode",
  charmap: new Charmap([
    "á", "é", "í", "ó", "ú", "ə", "„", "¡", "¿"
  ]),
  mapping: new LudiviMapping({
    punctuation: new TupleArray(
      [".", "\u{F1040}"], [",", "\u{F1041}"], ["-", "\u{F1042}"], ["\"", "\u{F1043}"],
      ["„", "\u{F1044}"], ["!", "\u{F1045}"], ["¡", "\u{F1046}"], ["?", "\u{F1047}"],
      ["¿", "\u{F1048}"]
    ),
    consonants: new TupleArray(
      ["n", "\u{F1002}"], ["rt", "\u{F1003}"], ["s", "\u{F1004}"], ["z", "\u{F1005}"],
      ["l", "\u{F1006}"], ["r", "\u{F1007}"], ["t", "\u{F1008}"], ["th", "\u{F1009}"],
      ["d", "\u{F100A}"], ["dh", "\u{F100B}"], ["ng", "\u{F100C}"], ["j", "\u{F100D}"],
      ["ll", "\u{F100E}"], ["k", "\u{F100F}"], ["kh", "\u{F1010}"], ["g", "\u{F1011}"],
      ["gh", "\u{F1012}"], ["'", "\u{F1013}"], ["h", "\u{F1014}"], ["m", "\u{F1015}"],
      ["w", "\u{F1016}"], ["p", "\u{F1017}"], ["f", "\u{F1018}"], ["b", "\u{F1019}"],
      ["v", "\u{F101A}"], ["nj", "\u{F101B}"], ["tj", "\u{F101C}"], ["sj", "\u{F101D}"],
      ["dj", "\u{F101E}"], ["zj", "\u{F101F}"]
    ),
    vowels: new TupleArray(
      ["a", "\u{F1020}"], ["á", "\u{F1021}"], ["e", "\u{F1022}"], ["é", "\u{F1023}"],
      ["i", "\u{F1024}"], ["í", "\u{F1025}"], ["y", "\u{F1026}"], ["o", "\u{F1027}"],
      ["ó", "\u{F1028}"], ["u", "\u{F1029}"], ["ú", "\u{F102A}"]
    ),
    abugida: "ə"
  })
});

modes.ludivi_finxi = new Transliteration({
  name: "Ludivi (Finxi)",
  category: "Garah",
  font: "Garahcode",
  charmap: new Charmap(["ə", "„", "¡", "¿"]),
  mapping: new LudiviMapping({
    punctuation: new TupleArray(
      [".", "\u{F1040}"], [",", "\u{F1041}"], ["-", "\u{F1042}"], ["\"", "\u{F1043}"],
      ["„", "\u{F1044}"], ["!", "\u{F1045}"], ["¡", "\u{F1046}"], ["?", "\u{F1047}"],
      ["¿", "\u{F1048}"]
    ),
    consonants: new TupleArray(
      ["n", "\u{F1002}"], ["s", "\u{F1004}"], ["l", "\u{F1006}"], ["r", "\u{F1007}"],
      ["t", "\u{F1008}"], ["th", "\u{F1009}"], ["d", "\u{F100A}"], ["dh", "\u{F100B}"],
      ["ll", "\u{F100E}"], ["k", "\u{F100F}"], ["kh", "\u{F1010}"], ["g", "\u{F1011}"],
      ["gh", "\u{F1012}"], ["w", "\u{F1016}"], ["p", "\u{F1017}"], ["f", "\u{F1018}"],
      ["b", "\u{F1019}"]
    ),
    vowels: new TupleArray(
      ["a", "\u{F1020}"], ["e", "\u{F1022}"], ["i", "\u{F1024}"], ["o", "\u{F1027}"],
      ["u", "\u{F1029}"]
    ),
    abugida: "ə"
  })
});

modes.ludivi_imirtaane = new Transliteration({
  name: "Ludivi (Imirtaane)",
  category: "Garah",
  font: "Garahcode",
  charmap: new Charmap(["„", "¡", "¿"]),
  mapping: new LudiviMapping({
    punctuation: new TupleArray(
      [".", "\u{F1040}"], [",", "\u{F1041}"], ["-", "\u{F1042}"], ["\"", "\u{F1043}"],
      ["„", "\u{F1044}"], ["!", "\u{F1045}"], ["¡", "\u{F1046}"], ["?", "\u{F1047}"],
      ["¿", "\u{F1048}"]
    ),
    consonants: new TupleArray(
      ["n", "\u{F1002}"], ["rt", "\u{F1003}"], ["s", "\u{F1004}"], ["z", "\u{F1005}"],
      ["l", "\u{F1006}"], ["r", "\u{F1007}"], ["t", "\u{F1008}"], ["d", "\u{F100A}"],
      ["ng", "\u{F100C}"], ["j", "\u{F100D}"], ["k", "\u{F100F}"], ["g", "\u{F1011}"],
      ["'", "\u{F1013}"], ["h", "\u{F1014}"], ["m", "\u{F1015}"], ["w", "\u{F1016}"],
      ["p", "\u{F1017}"], ["f", "\u{F1018}"], ["b", "\u{F1019}"], ["v", "\u{F101A}"],
    ),
    vowels: new TupleArray(
      ["a", "\u{F1020}"], ["aa", "\u{F1021}"], ["e", "\u{F1022}"], ["ee", "\u{F1023}"],
      ["i", "\u{F1024}"], ["ii", "\u{F1025}"], ["y", "\u{F1026}"], ["o", "\u{F1027}"],
      ["oo", "\u{F1028}"]
    ),
    abugida: "u"
  })
});

modes.ludivi_naoric = new Transliteration({
  name: "Ludivi (Naorisch)",
  category: "Garah",
  font: "Garahcode",
  charmap: new Charmap([
    "á", "ḍ", "é", "ġ", "ḥ", "í", "ḳ", "ḷ",
    "ṅ", "ó", "ṗ", "ṙ", "ṡ", "ṭ", "ú", "ż",
    "„", "¡", "¿"
  ]),
  mapping: new LudiviMapping({
    punctuation: new TupleArray(
      [".", "\u{F1040}"], [",", "\u{F1041}"], ["-", "\u{F1042}"], ["\"", "\u{F1043}"],
      ["„", "\u{F1044}"], ["!", "\u{F1045}"], ["¡", "\u{F1046}"], ["?", "\u{F1047}"],
      ["¿", "\u{F1048}"]
    ),
    consonants: new TupleArray(
      ["n", "\u{F1002}"], ["ṙ", "\u{F1003}"], ["s", "\u{F1004}"], ["z", "\u{F1005}"],
      ["l", "\u{F1006}"], ["r", "\u{F1007}"], ["t", "\u{F1008}"], ["ṭ", "\u{F1009}"],
      ["d", "\u{F100A}"], ["ḍ", "\u{F100B}"], ["j", "\u{F100D}"], ["ḷ", "\u{F100E}"],
      ["k", "\u{F100F}"], ["ġ", "\u{F1010}"], ["g", "\u{F1011}"], ["ḥ", "\u{F1012}"],
      ["'", "\u{F1013}"], ["h", "\u{F1014}"], ["m", "\u{F1015}"], ["ṗ", "\u{F1016}"],
      ["p", "\u{F1017}"], ["f", "\u{F1018}"], ["b", "\u{F1019}"], ["v", "\u{F101A}"],
      ["ṅ", "\u{F101B}"], ["ṡ", "\u{F101D}"], ["ḳ", "\u{F101E}"], ["ż", "\u{F101F}"]
    ),
    vowels: new TupleArray(
      ["a", "\u{F1020}"], ["á", "\u{F1021}"], ["e", "\u{F1022}"], ["é", "\u{F1023}"],
      ["i", "\u{F1024}"], ["í", "\u{F1025}"], ["o", "\u{F1027}"], ["ó", "\u{F1028}"],
      ["u", "\u{F1029}"], ["ú", "\u{F102A}"]
    )
  })
});

modes.ludivi_garaman = new Transliteration({
  name: "Ludivi (Garaman)",
  category: "Garah",
  font: "Garahcode",
  charmap: new Charmap(["à", "è", "ó", "„", "¡", "¿"]),
  mapping: new LudiviMapping({
    punctuation: new TupleArray(
      [".", "\u{F1040}"], [",", "\u{F1041}"], ["-", "\u{F1042}"], ["\"", "\u{F1043}"],
      ["„", "\u{F1044}"], ["!", "\u{F1045}"], ["¡", "\u{F1046}"], ["?", "\u{F1047}"],
      ["¿", "\u{F1048}"]
    ),
    consonants: new TupleArray(
      ["n", "\u{F1002}"], ["r", "\u{F1003}"], ["s", "\u{F1004}"], ["z", "\u{F1005}"],
      ["l", "\u{F1006}"], ["rh", "\u{F1007}"], ["t", "\u{F1008}"], ["d", "\u{F100A}"],
      ["ng", "\u{F100C}"], ["j", "\u{F100D}"], ["k", "\u{F100F}"], ["g", "\u{F1011}"],
      ["h", "\u{F1014}"], ["m", "\u{F1015}"], ["w", "\u{F1016}"], ["p", "\u{F1017}"],
      ["f", "\u{F1018}"], ["b", "\u{F1019}"], ["v", "\u{F101A}"]
    ),
    vowels: new TupleArray(
      ["a", "\u{F1020}"], ["à", "\u{F1021}"], ["e", "\u{F1022}"], ["è", "\u{F1023}"],
      ["i", "\u{F1024}"], ["o", "\u{F1027}"], ["ó", "\u{F1028}"], ["u", "\u{F1029}"]
    )
  })
});

export default modes;
