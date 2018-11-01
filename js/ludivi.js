import {Mapping} from './transliterate.js';

export class LudiviMapping extends Mapping
{
  // Constructor
  constructor(env)
  {
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
    env.consonantPattern = env.consonants.map(tuple => tuple[0]).join("|");
    env.vowelPattern = env.vowels.map(tuple => tuple[0]).join("|");
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

    // Create the mapping
    super(tuples,true,false);
  }
};
