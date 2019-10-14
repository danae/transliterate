import Charmap from './charmap.js';
import TupleArray from './tuplearray.js';


// Class that defines a transliteration
export default class Transliteration
{
  // Constructor
  constructor(data)
  {
    Object.assign(this, data);

    // Apply charmap
    this.charmap = new Charmap(this.charmap);

    if (!(this.tuples instanceof TupleArray))
      this.tuples = TupleArray.fromArray(this.tuples);
  }

  // Extend the transliteration
  extend(transliteration)
  {
    let tuples = new TupleArray();
    for (let tuple of transliteration.tuples)
      tuples.push(tuple);
    for (let tuple of this.tuples)
      tuples.push(tuple);
    return new Transliteration(tuples, this.caseInsensitive, this.rightToLeft);
  }

  // Reverse the transliteration
  reverse()
  {
    let tuples = new TupleArray();
    for (let tuple of this.tuples)
      tuples.push(tuple.reverse());
    return new Transliteration(tuples, this.caseInsensitive, this.rightToLeft);
  }

  // Transliterate function
  transliterate(string, template, mode)
  {
    let mappedString = "";

    // Check if case-insensitive
    if (this.caseInsensitive)
      string = string.toLowerCase();

    let appliedTuples = [];

    // Iterate over the string
    while (string.length > 0)
    {
      // Found tuples array
      let foundTuples = [];

      // Iterate over the tuples
      for (let tuple of this.tuples)
      {
        let pattern = tuple[0];
        let replacement = tuple[1];

        // If the pattern is a regular expression
        if (pattern instanceof RegExp)
        {
          // Match the pattern
          let match = string.match(pattern);
          if (match !== null)
          {
            // If the replacement is a function, call it with the matches
            let localReplacement = replacement;
            if (typeof localReplacement === "function")
              localReplacement = localReplacement(match);

            // Add to the found tuples
            foundTuples.push([pattern, localReplacement, match.index, match[0].length, match[0]])
          }
        }

        // If the pattern is a string
        else if (typeof pattern === "string")
        {
          // Check the start of the string for the pattern
          let index = string.indexOf(pattern);
          if (index > -1)
          {
            // If the replacement is a function, call it with the pattern
            let localReplacement = replacement;
            if (typeof localReplacement === "function")
              localReplacement = localReplacement([pattern]);

            // Add to the found tuples
            foundTuples.push([pattern, localReplacement, index, pattern.length])
          }
        }

        // If the pattern is something else
        else
          throw "In tuple " + JSON.stringify(tuple) + ": pattern is not or cannot be converted to a string or regular expression";
      }

      // Check if any tuples were found
      if (foundTuples.length === 0)
      {
        // Increase the cursor and search again
        mappedString += string.substring(0,1);
        string = string.substring(1);
      }
      else
      {
        // Sort the found tuples
        foundTuples.sort(function(a, b) {
          // Tuples with lower index go first
          if (a[2] != b[2])
            return a[2] - b[2];

          // Tuples with longer length go first
          else if (a[3] != b[3])
            return b[3] - a[3];

          // Regex tuples go first
          if (a[0] instanceof RegExp)
            return -1;
          else if (b[0] instanceof RegExp)
            return 1;

          // Longer string tuples go first
          else if (a[0].length !== b[0].length)
            return b[0].length - a[0].length;

          // Otherwist just sort by unicode point
          else
            return a[0].localeCompare(b[0]);
        });

        // Select the first tuple and use that for replacement
        let tuple = foundTuples[0];
        appliedTuples.push(tuple);

        // Add the replacement
        if (tuple[2] > 0)
          mappedString += string.substring(0,tuple[2]);
        mappedString += tuple[1];

        // Move the cursor
        string = string.substring(tuple[2] + tuple[3]);
      }
    }

    // RTL mode
    if (this.rightToLeft)
      mappedString = Transliteration.reverseString(mappedString);

    // Return the mapped string
    return typeof(template) !== 'undefined' ? template.apply(mappedString, this, mode) : mappedString;
  }

  // Reverse a string
  static reverseString(string)
  {
    let lines = string.split("\n");
    let reversedLines = [];
    for (let line of lines)
      reversedLines.push(line.split("").reverse().join(""));
    return reversedLines.join("\n");
  }
}
