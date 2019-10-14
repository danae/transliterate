// RegExp escape function
export function escape(s)
{
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

// Template class
export default class Template
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
  apply(string, transliteration, mode)
  {
    return this.func(string, transliteration, mode);
  }
}
