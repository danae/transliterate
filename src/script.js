import Transliteration from './transliteration.js';


// Class that defines a script
export default class Script
{
  constructor(data)
  {
    Object.assign(this, data);
  }

  static from(json)
  {
    let data = json;

    // Apply transliteration
    data.transliterations = json.transliterations.map(t => new Transliteration(t));

    return new Script(data);
  }

  static async fromUrl(url)
  {
    let response = await fetch(url);
    let json = await response.json();
    return Script.from(json);
  }
}
