import Transliteration from './transliteration.js';
import TupleArray from './tuplearray.js';


// Class that defines a transliteration for Ludivi
export default class LudiviTransliteration extends Transliteration
{
  // Constructor
  constructor(data, scripts)
  {
    // Create tuple arrays if not yet
    data.punctuation = Transliteration.createTupleArray(data.punctuation, 'punctuation', scripts);
    data.numerals = Transliteration.createTupleArray(data.numerals, 'numerals', scripts);
    data.consonants = Transliteration.createTupleArray(data.consonants, 'consonants', scripts);
    data.vowels = Transliteration.createTupleArray(data.vowels, 'vowels', scripts);

    // Sort the consonants and vowels
    data.consonants.sort(function(a, b) {
      if (a[0].length != b[0].length)
        return b[0].length - a[0].length;
      else
        return a[0].localeCompare(b[0]);
    });
    data.vowels.sort(function(a, b) {
      if (a[0].length != b[0].length)
        return b[0].length - a[0].length;
      else
        return a[0].localeCompare(b[0]);
    });

    // Create patterns
    data.punctuationPattern = data.punctuation.map(tuple => escape(tuple[0])).join("|") + "|\\s+";
    data.numeralPattern = data.numerals.map(tuple => escape(tuple[0])).join("|");
    data.consonantPattern = data.consonants.map(tuple => escape(tuple[0])).join("|");
    data.vowelPattern = data.vowels.map(tuple => escape(tuple[0])).join("|");
    data.relat = "\u{F1001}";
    data.phujat = "\u{F102B}";

    // Create the tuple array
    let tuples = [];

    // Add extra rules
    if (typeof data.rules !== "undefined")
    {
      // Iterate over the rules
      for (let rule of data.rules)
      {
        // Get the pattern
        let pattern = undefined;
        if (typeof rule.string !== "undefined")
        {
          // Use the string as pattern
          pattern = rule.string;
        }
        else if (typeof rule.regex !== "undefined")
        {
          // Use the regex as pattern
          pattern = rule.regex;

          pattern = pattern.replaceAll("%punctuation%", data.punctuationPattern);
          pattern = pattern.replaceAll("%numeral%", data.numeralPattern);
          pattern = pattern.replaceAll("%consonant%", data.consonantPattern);
          pattern = pattern.replaceAll("%vowel%", data.vowelPattern);

          pattern = new RegExp(pattern);
        }
        else
          throw new Error(`In ${JSON.stringify(rule)}; Either a 'string' or 'regex' property must be defined`);

        // Create the tuple
        tuples.push([pattern, rule.replacement]);
      }
    }

    // Add punctuation
    for (let tuple of data.punctuation)
      tuples.push(tuple);

    // Add numerals
    for (let tuple of data.numerals)
      tuples.push(tuple);

    // Add all consonants (with phujat if abugida)
    for (let tuple of data.consonants)
      tuples.push([tuple[0], tuple[1] + (typeof data.abugida !== "undefined" ? data.phujat : "")]);

    // Add all vowels on top of a relat
    for (let tuple of data.vowels)
      tuples.push([tuple[0], data.relat + tuple[1]]);

    // Add consonant + vowel pattern
    tuples.push([new RegExp("(" + data.consonantPattern + ")(" + data.vowelPattern + ")"), match => data.consonants.valueFor(match[1]) + data.vowels.valueFor(match[2])]);

    // Add implicit vowel (if abugida)
    if (typeof data.abugida !== "undefined")
    {
      tuples.push([new RegExp("(" + data.consonantPattern + ")" + data.abugida), match => data.consonants.valueFor(match[1])]);
      tuples.push([data.abugida, data.relat]);
    }

    // Create the transliteration
    super({tuples: tuples, caseInsensitive: true, rightToLeft: false}, scripts);

    // Add Ludivi specific properties
    this.punctuation = data.punctuation;
    this.numerals = data.numerals;
    this.consonants = data.consonants;
    this.vowels = data.vowels;
  }
};
