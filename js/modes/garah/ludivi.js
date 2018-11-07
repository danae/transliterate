import {TupleArray, Charmap, Transliteration, escape} from '../../transliterate.js';

class LudiviTransliteration extends Transliteration
{
  // Constructor
  constructor(env)
  {
    // Create tuple arrays if not yet
    if (!(env.punctuation instanceof TupleArray))
      env.punctuation = TupleArray.fromArray(env.punctuation);
    if (!(env.consonants instanceof TupleArray))
      env.consonants = TupleArray.fromArray(env.consonants);
    if (!(env.vowels instanceof TupleArray))
      env.vowels = TupleArray.fromArray(env.vowels);

    // Sort the consonants and vowels
    env.consonants.sort(function(a, b) {
      if (a[0].length != b[0].length)
        return b[0].length - a[0].length;
      else
        return a[0].localeCompare(b[0]);
    });
    env.vowels.sort(function(a, b) {
      if (a[0].length != b[0].length)
        return b[0].length - a[0].length;
      else
        return a[0].localeCompare(b[0]);
    });

    // Create patterns
    env.punctuationPattern = env.punctuation.map(tuple => escape(tuple[0])).join("|") + "|\\s+";
    env.consonantPattern = env.consonants.map(tuple => escape(tuple[0])).join("|");
    env.vowelPattern = env.vowels.map(tuple => escape(tuple[0])).join("|");
    env.relat = "\u{F1001}";
    env.phujat = "\u{F102B}";

    // Create the tuple array
    let tuples = [];

    // Add extra rules
    if (typeof env.rules !== "undefined")
      for (let rule of env.rules)
        tuples.push(rule(env));

    // Add punctuation
    for (let tuple of env.punctuation)
      tuples.push(tuple);

    // Add all consonants (with phujat if abugida)
    for (let tuple of env.consonants)
      tuples.push([tuple[0], tuple[1] + (typeof env.abugida !== "undefined" ? env.phujat : "")]);

    // Add all vowels on top of a relat
    for (let tuple of env.vowels)
      tuples.push([tuple[0], env.relat + tuple[1]]);

    // Add consonant + vowel pattern
    tuples.push([new RegExp("(" + env.consonantPattern + ")(" + env.vowelPattern + ")"), match => env.consonants.valueFor(match[1]) + env.vowels.valueFor(match[2])]);

    // Add implicit vowel (if abugida)
    if (typeof env.abugida !== "undefined")
    {
      tuples.push([new RegExp("(" + env.consonantPattern + ")" + env.abugida), match => env.consonants.valueFor(match[1])]);
      tuples.push([env.abugida, env.relat])
    }

    // Create the transliteration
    super(tuples, true, false);
  }
};

let standard = {
  name: "Standaard",
  charmap: new Charmap([
    "á", "é", "í", "ó", "ú", "ə", "„", "¡", "¿"
  ]),
  transliteration: new LudiviTransliteration({
    punctuation: [
      [".", "\u{F1040}"], [",", "\u{F1041}"], ["-", "\u{F1042}"], ["\"", "\u{F1043}"],
      ["„", "\u{F1044}"], ["!", "\u{F1045}"], ["¡", "\u{F1046}"], ["?", "\u{F1047}"],
      ["¿", "\u{F1048}"]
    ],
    consonants: [
      ["n", "\u{F1002}"], ["rt", "\u{F1003}"], ["s", "\u{F1004}"], ["z", "\u{F1005}"],
      ["l", "\u{F1006}"], ["r", "\u{F1007}"], ["t", "\u{F1008}"], ["th", "\u{F1009}"],
      ["d", "\u{F100A}"], ["dh", "\u{F100B}"], ["ng", "\u{F100C}"], ["j", "\u{F100D}"],
      ["ll", "\u{F100E}"], ["k", "\u{F100F}"], ["kh", "\u{F1010}"], ["g", "\u{F1011}"],
      ["gh", "\u{F1012}"], ["'", "\u{F1013}"], ["h", "\u{F1014}"], ["m", "\u{F1015}"],
      ["w", "\u{F1016}"], ["p", "\u{F1017}"], ["f", "\u{F1018}"], ["b", "\u{F1019}"],
      ["v", "\u{F101A}"], ["nj", "\u{F101B}"], ["tj", "\u{F101C}"], ["sj", "\u{F101D}"],
      ["dj", "\u{F101E}"], ["zj", "\u{F101F}"]
    ],
    vowels: [
      ["a", "\u{F1020}"], ["á", "\u{F1021}"], ["e", "\u{F1022}"], ["é", "\u{F1023}"],
      ["i", "\u{F1024}"], ["í", "\u{F1025}"], ["y", "\u{F1026}"], ["o", "\u{F1027}"],
      ["ó", "\u{F1028}"], ["u", "\u{F1029}"], ["ú", "\u{F102A}"]
    ],
    abugida: "ə"
  })
};

let nirinvi = {
  name: "Nirinvi",
  charmap: new Charmap(["ë", "„", "¡", "¿"]),
  transliteration: new LudiviTransliteration({
    punctuation: [
      [".", "\u{F1040}"], [",", "\u{F1041}"], ["-", "\u{F1042}"], ["\"", "\u{F1043}"],
      ["„", "\u{F1044}"], ["!", "\u{F1045}"], ["¡", "\u{F1046}"], ["?", "\u{F1047}"],
      ["¿", "\u{F1048}"]
    ],
    consonants: [
      ["n", "\u{F1002}"], ["s", "\u{F1004}"], ["l", "\u{F1006}"], ["r", "\u{F1007}"],
      ["t", "\u{F1008}"], ["th", "\u{F1009}"], ["d", "\u{F100A}"], ["dh", "\u{F100B}"],
      ["ll", "\u{F100E}"], ["k", "\u{F100F}"], ["kh", "\u{F1010}"], ["g", "\u{F1011}"],
      ["gh", "\u{F1012}"], ["w", "\u{F1016}"], ["p", "\u{F1017}"], ["f", "\u{F1018}"],
      ["b", "\u{F1019}"]
    ],
    vowels: [
      ["a", "\u{F1020}"], ["e", "\u{F1022}"], ["i", "\u{F1024}"], ["o", "\u{F1027}"],
      ["u", "\u{F1029}"]
    ],
    abugida: "ë"
  })
};

let imirtaane = {
  name: "Imirtaane",
  charmap: new Charmap(["„", "¡", "¿"]),
  transliteration: new LudiviTransliteration({
    punctuation: [
      [".", "\u{F1040}"], [",", "\u{F1041}"], ["-", "\u{F1042}"], ["\"", "\u{F1043}"],
      ["„", "\u{F1044}"], ["!", "\u{F1045}"], ["¡", "\u{F1046}"], ["?", "\u{F1047}"],
      ["¿", "\u{F1048}"]
    ],
    consonants: [
      ["n", "\u{F1002}"], ["rt", "\u{F1003}"], ["s", "\u{F1004}"], ["z", "\u{F1005}"],
      ["l", "\u{F1006}"], ["r", "\u{F1007}"], ["t", "\u{F1008}"], ["d", "\u{F100A}"],
      ["ng", "\u{F100C}"], ["j", "\u{F100D}"], ["k", "\u{F100F}"], ["g", "\u{F1011}"],
      ["'", "\u{F1013}"], ["h", "\u{F1014}"], ["m", "\u{F1015}"], ["w", "\u{F1016}"],
      ["p", "\u{F1017}"], ["f", "\u{F1018}"], ["b", "\u{F1019}"], ["v", "\u{F101A}"],
    ],
    vowels: [
      ["a", "\u{F1020}"], ["aa", "\u{F1021}"], ["e", "\u{F1022}"], ["ee", "\u{F1023}"],
      ["i", "\u{F1024}"], ["ii", "\u{F1025}"], ["y", "\u{F1026}"], ["o", "\u{F1027}"],
      ["oo", "\u{F1028}"]
    ],
    abugida: "u"
  })
};

let naori = {
  name: "Naori",
  charmap: new Charmap([
    "á", "ḍ", "é", "ġ", "ḥ", "í", "ḳ", "ḷ",
    "ṅ", "ó", "ṗ", "ṙ", "ṡ", "ṭ", "ú", "ż",
    "„", "¡", "¿"
  ]),
  transliteration: new LudiviTransliteration({
    punctuation: [
      [".", "\u{F1040}"], [",", "\u{F1041}"], ["-", "\u{F1042}"], ["\"", "\u{F1043}"],
      ["„", "\u{F1044}"], ["!", "\u{F1045}"], ["¡", "\u{F1046}"], ["?", "\u{F1047}"],
      ["¿", "\u{F1048}"]
    ],
    consonants: [
      ["n", "\u{F1002}"], ["ṙ", "\u{F1003}"], ["s", "\u{F1004}"], ["z", "\u{F1005}"],
      ["l", "\u{F1006}"], ["r", "\u{F1007}"], ["t", "\u{F1008}"], ["ṭ", "\u{F1009}"],
      ["d", "\u{F100A}"], ["ḍ", "\u{F100B}"], ["j", "\u{F100D}"], ["ḷ", "\u{F100E}"],
      ["k", "\u{F100F}"], ["ġ", "\u{F1010}"], ["g", "\u{F1011}"], ["ḥ", "\u{F1012}"],
      ["'", "\u{F1013}"], ["h", "\u{F1014}"], ["m", "\u{F1015}"], ["ṗ", "\u{F1016}"],
      ["p", "\u{F1017}"], ["f", "\u{F1018}"], ["b", "\u{F1019}"], ["v", "\u{F101A}"],
      ["ṅ", "\u{F101B}"], ["ṡ", "\u{F101D}"], ["ḳ", "\u{F101E}"], ["ż", "\u{F101F}"]
    ],
    vowels: [
      ["a", "\u{F1020}"], ["á", "\u{F1021}"], ["e", "\u{F1022}"], ["é", "\u{F1023}"],
      ["i", "\u{F1024}"], ["í", "\u{F1025}"], ["o", "\u{F1027}"], ["ó", "\u{F1028}"],
      ["u", "\u{F1029}"], ["ú", "\u{F102A}"]
    ],
    rules: [
      // at > ḥa at end of words
      env => [new RegExp("(" + env.consonantPattern + ")(?:at(?=" + env.punctuationPattern + ")|at$)"), match => env.consonants.valueFor(match[1]) + "\u{F1012}\u{F1020}"],

      // Interved articles
      env => ['an-', "\u{F1002}\u{F1020}\u{F1042}"], env => ['aṙ-', "\u{F1003}\u{F1020}\u{F1042}"],
      env => ['as-', "\u{F1004}\u{F1020}\u{F1042}"], env => ['az-', "\u{F1005}\u{F1020}\u{F1042}"],
      env => ['al-', "\u{F1006}\u{F1020}\u{F1042}"], env => ['ar-', "\u{F1007}\u{F1020}\u{F1042}"],
      env => ['aṗ-', "\u{F1018}\u{F1020}\u{F1042}"], env => ['af-', "\u{F1018}\u{F1020}\u{F1042}"],
      env => ['aṅ-', "\u{F101B}\u{F1020}\u{F1042}"], env => ['aṡ-', "\u{F101D}\u{F1020}\u{F1042}"],
      env => ['aż-', "\u{F101F}\u{F1020}\u{F1042}"],
    ]
  })
};

let garaman = {
  name: "Garaman",
  charmap: new Charmap(["à", "è", "ó", "„", "¡", "¿"]),
  transliteration: new LudiviTransliteration({
    punctuation: [
      [".", "\u{F1040}"], [",", "\u{F1041}"], ["-", "\u{F1042}"], ["\"", "\u{F1043}"],
      ["„", "\u{F1044}"], ["!", "\u{F1045}"], ["¡", "\u{F1046}"], ["?", "\u{F1047}"],
      ["¿", "\u{F1048}"]
    ],
    consonants: [
      ["n", "\u{F1002}"], ["r", "\u{F1003}"], ["s", "\u{F1004}"], ["z", "\u{F1005}"],
      ["l", "\u{F1006}"], ["rh", "\u{F1007}"], ["t", "\u{F1008}"], ["d", "\u{F100A}"],
      ["ng", "\u{F100C}"], ["j", "\u{F100D}"], ["k", "\u{F100F}"], ["g", "\u{F1011}"],
      ["h", "\u{F1014}"], ["m", "\u{F1015}"], ["w", "\u{F1016}"], ["p", "\u{F1017}"],
      ["f", "\u{F1018}"], ["b", "\u{F1019}"], ["v", "\u{F101A}"]
    ],
    vowels: [
      ["a", "\u{F1020}"], ["à", "\u{F1021}"], ["e", "\u{F1022}"], ["è", "\u{F1023}"],
      ["i", "\u{F1024}"], ["o", "\u{F1027}"], ["ó", "\u{F1028}"], ["u", "\u{F1029}"]
    ]
  })
};

export default {
  name: "Ludivi",
  category: "Garah",
  font: "Garahcode",
  transliterations: {
    standard: standard,
    nirinvi: nirinvi,
    imirtaane: imirtaane,
    naori: naori,
    garaman: garaman
  }
};
