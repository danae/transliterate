import Charmap from './charmap.js';
import TupleArray from './tuplearray.js';


// Class that defines a transliteration
export default class Transliteration
{
  // Constructor
  constructor(script, data, scripts)
  {
    this.script = script;
    this.caseInsensitive = data.caseInsensitive || true;
    this.rightToLeft = data.rightToLeft || false;
    this.tuples = Transliteration.createTupleArray(data.tuples, 'tuples', scripts);
    this.variables = data.variables || {};
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

  // Transliterate function
  transliterate(string)
  {
    // Check if the string is empty
    if (string === undefined || string === null || string === "")
      return "";

    // Check if the string case-insensitive
    if (this.caseInsensitive)
      string = string.toLowerCase();

    // Get all matching tuples
    let tuples = this._matchTuples(string);

    // Iterate over the string
    console.group(`Transliterating "${string}" using ${this.script.name}`);

    let position = 0, result = "";
    while (position < string.length)
    {
      // Remove all tuples that occur before this position
      while (tuples.length > 0 && tuples[0].index < position)
        tuples.shift();

      // Check if there are tuples left, otherwise break
      if (tuples.length === 0)
      {
        // Add the final portion of the string to the result
        result += string.slice(position);
        break;
      }

      // Replace the first tuple of the matched tuples at this position
      let tuple = tuples.shift();
      if (tuple.index > position)
        result += string.slice(position, tuple.index);
      result += tuple.replacement;

      let replacementCodepoints = "[" + [...tuple.replacement].map(s => "U+" + s.codePointAt(0).toString(16).toUpperCase()).join(" ") + "]";
      console.group(`At position ${position}, match "${string.substr(tuple.index, tuple.length)}"`);
      console.log("Pattern:", tuple.pattern);
      console.log("Replacement:", tuple.replacement, replacementCodepoints);
      console.groupEnd();

      // Move the position and shift
      position = tuple.index + tuple.length;
    }

    console.groupEnd();

    // Check if the transliteration is right-to-left
    if (this.rightToLeft)
      result = Transliteration.reverseString(result);

    // Return the result string
    return result;
  }

  // Find all matching tuples in a string
  _matchTuples(string)
  {
    let tuples = [];

    // Iterate over the tuples
    for (let tuple of this.tuples)
    {
      let [pattern, replacement] = tuple;

      // If the pattern is a regular expression
      if (pattern instanceof RegExp)
      {
        // Match the pattern
        for (let match of string.matchAll(pattern))
        {
          // If the replacement is a function, call it with the matches
          let localReplacement = replacement;
          if (typeof localReplacement === "function")
            localReplacement = localReplacement([...match]);

          // Apply replacement variables
          localReplacement = this._applyVariables(localReplacement, match);

          // Add to the found tuples
          tuples.push({index: match.index, length: match[0].length, pattern: pattern, replacement: localReplacement, match: match[0]});
        }
      }

      // If the pattern is a string
      else if (typeof pattern === "string")
      {
        // Find all indexes where the string occurs
        let start = 0, index = 0;
        while ((index = string.indexOf(pattern, start)) > -1)
        {
          // If the replacement is a function, call it with the pattern
          let localReplacement = replacement;
          if (typeof localReplacement === "function")
            localReplacement = localReplacement([pattern]);

          // Apply replacement variables
          localReplacement = this._applyVariables(localReplacement, [pattern]);

          // Add to the found tuples
          tuples.push({index: index, length: pattern.length, pattern: pattern, replacement: localReplacement});

          // Update the start position
          start = index + pattern.length;
        }
      }

      // If the pattern is something else
      else
        throw new Error("In tuple " + JSON.stringify(tuple) + ": pattern is not a string or regular expression");
    }

    // Sort the tuples
    if (tuples.length > 0)
      tuples.sort(this._compareTuples);

    // Return the tuples
    return tuples;
  }

  // Compare two matched tuples
  _compareTuples(a, b)
  {
    // Tuples with lower index go first
    if (a.index != b.index)
      return a.index - b.index;

    // Tuples with longer length go first
    else if (a.length != b.length)
      return b.length - a.length;

    // Regex tuples go first
    if (a.pattern instanceof RegExp)
      return -1;
    else if (b.pattern instanceof RegExp)
      return 1;

    // Longer string tuples go first
    else if (a.pattern.length !== b.pattern.length)
      return b.pattern.length - a.pattern.length;

    // Otherwist just sort by unicode point
    else
      return a.pattern.localeCompare(b.pattern);
  }

  // Apply the replacement variables
  _applyVariables(string, match)
  {
    // Replace total match
    string = string.replaceAll(/\$0/gi, match[0]);

    // Replace match patterns
    string = string.replaceAll(/\$([1-9][0-9]*)/gi, function(m, p1) {
      // Get the capture group with the specified index
      let index = parseInt(p1);
      if (isNaN(index) || match[index] === undefined)
        throw new Error("Variable $" + p1 + " is not a valid capture group")

      // Return the corresponding capture group
      return match[index];
    }.bind(this));

    // Replace variables
    string = string.replaceAll(/\$([a-z_][a-z0-9_]*)(?:\(([^)]*)\))?/gi, function(m, p1, p2) {
      // Get the variable with the given name
      let value = this.variables[p1];

      // If the value is a string
      if (typeof value === "string")
      {
        // Replace the variable with the value
        return value;
      }

      // If the value is a function
      else if (typeof value == "function")
      {
        // Split and parse the parameters
        let params = p2.split(",").map(s => JSON.parse(s.trim()));

        // Replace the variable with the called function result
        return value(...params);
      }

      // If the value is something else
      else
        throw new Error("Variable $" + p1 + " is not a string or function");
    }.bind(this));

    // Replace literal dollar signs
    string = string.replaceAll(/\$\$/g, "$$");

    // Return the string
    return string;
  }

  // Create a tuple array object
  static createTupleArray(data, key, scripts)
  {
    // Check if the data is already a tuple array
    if (data instanceof TupleArray)
      return data;

    // Iterate over the array in order to fill the tuple array
    let tuples = new TupleArray();
    for (let item of data)
    {
      // If it's an array, then add it to the tuples
      if (typeof item === "array" || item instanceof Array)
        tuples.push(item);

      // It it's a string starting with a colon, then import tuples from another script
      else if (typeof item === "string" || item instanceof String)
      {
        // Get the id of the script
        let id = item;

        // Check if there exists a script with the id
        if (!scripts.has(id))
          throw new Error(`In ${JSON.stringify(data)}: The script '${id}' does not exist`);

        // Get the transliteration of the script
        let script = scripts.get(id);
        let transliteration = script.transliteration;

        // Check if there exists a property with the key
        if (!Object.keys(transliteration).includes(key))
          throw new Error(`In ${JSON.stringify(data)}: The script '${id}' contains no property with the name '${key}'`);

        // Get the property
        let array = transliteration[key];

        // Check if the property is a tuple array
        if (!(array instanceof TupleArray))
          throw new Error(`In ${JSON.stringify(data)}: The script '${id}' contains no property with the name '${key}' that is a tuple array`);

        // Add all items in the tuple array to the tuples
        for (let tuple of array)
          tuples.push(tuple);
      }

      // Otherwise it's not a valid tuple array item
      else
        throw new Error(`In ${JSON.stringify(data)}: ${item} is not a valid tuple array item`);
    }

    // Return the tuples
    return tuples;
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
