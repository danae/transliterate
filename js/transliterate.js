// TUple array class
export class TupleArray extends Array
{
  // Constructor
  constructor(...elements)
  {
    super(...elements);
  }

  // Get a tuple value by key
  valueFor(key)
  {
    for (let tuple of this)
      if (tuple[0] === key)
        return tuple[1];
    return null;
  }

  // Get a tuple key by value
  keyFor(value)
  {
    for (let tuple of this)
      if (tuple[1] === value)
        return tuple[0];
    return null;
  }
}


// Charmap class
export class Charmap
{
  // Constructor
  constructor(chars)
  {
    this.chars = chars;
  }

  // Render the charmap
  render(elm)
  {
    if (this.chars.length === 0)
      return;

    for (const char of this.chars)
    {
      if (char === ' ')
        elm.append('<br>');
      else
      {
        let button = document.createElement("button");
        $(button).addClass("btn btn-sm btn-dark charmap-btn");
        $(button).css("width","2rem");
        $(button).css("margin","0.25rem");
        $(button).text(char);
        $(button).on('click',function()
        {
          $('#from').val($('#from').val() + $(this).text());
          $('#from').trigger('input');
          $('#from').focus();
        });

        elm.append(button);
      }
    }
  }
}

// Mapping class
export class Mapping
{
  // Constructor
  constructor(tuples, caseInsensitive = true, rightToLeft = false)
  {
    if (typeof tuples === "function")
      this.tuples = tuples();

    if (!(tuples instanceof TupleArray))
      this.tuples = new TupleArray(...tuples);
    else
      this.tuples = tuples;

    this.caseInsensitive = caseInsensitive;
    this.rightToLeft = rightToLeft;
  }

  // Extend the mapping
  extend(mapping)
  {
    let tuples = new TupleArray();
    for (let tuple of mapping.tuples)
      tuples.push(tuple);
    for (let tuple of this.tuples)
      tuples.push(tuple);
    return new Mapping(tuples,this.caseInsensitive);
  }

  // Reverse the mapping
  reverse()
  {
    let tuples = new TupleArray();
    for (let tuple of this.tuples)
      tuples.push(tuple.reverse());
    return new Mapping(tuples,this.caseInsensitive);
  }

  // Mapping function
  map(string)
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
            foundTuples.push([pattern, localReplacement, match.index, match[0].length])
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

    console.log(appliedTuples);

    // RTL mode
    if (this.rightToLeft)
      mappedString = Mapping.reverseString(mappedString);

    // Return the mapped string
    return mappedString;
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

// Transliteration class
export class Transliteration
{
  // Constructor
  constructor(env)
  {
    for (let key in env)
    {
      if (!env.hasOwnProperty(key))
        continue;
      this[key] = env[key];
    }
  }

  // Map function
  map(string, template)
  {
    string = this.mapping.map(string);
    return typeof(template) !== 'undefined' ? template.apply(string,this) : string;
  }
}

// Template class
export class Template
{
  // Constructor
  constructor(env)
  {
    for (let key in env)
    {
      if (!env.hasOwnProperty(key))
        continue;
      this[key] = env[key];
    }
  }

  // Apply the template
  apply(string, transliteration)
  {
    return this.func(string,transliteration);
  }
}
