import Charmap from './charmap.js';
import Transliteration from './transliteration.js';
import LudiviTransliteration from './transliteration_ludivi.js';


// Constant that holds transliteration types mapped to their classes
const transliterations = {
  'default': Transliteration,
  'ludivi': LudiviTransliteration
};


// Class that defines a script
export default class Script
{
  // Constructor
  constructor(data, scripts)
  {
    this.id = data.id;
    this.name = data.name;
    this.visible = data.visible || true;
    this.category = data.category || "Geen";
    this.font = data.font;
    this.charmap = new Charmap(data.charmap || []);
    this.transliteration = Script.createTransliteration(this, data.type, data.content, scripts);
  }

  // Create a transliteration object
  static createTransliteration(script, type, content, scripts)
  {
    // Check if the type is a valid transliteration type
    if (!Object.keys(transliterations).includes(type))
      throw new Error(`The type ${type} is not a valid transliteration type`);

    // Create and return the transliteration
    return new transliterations[type](script, content, scripts);
  }

  // Load scripts from a URL
  static async load(url)
  {
    // Fetch the response
    let response = await fetch(url);

    // Fetch the JSON
    let datas = await response.json();

    // Iterate over the data in order to fill the scripts map
    let scripts = new Map();
    for (let data of datas)
    {
      let script = new Script(data, scripts);
      scripts.set(script.id, script);
    }

    // Return the scripts
    return scripts;
  }
}
