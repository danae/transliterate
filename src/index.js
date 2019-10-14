import './dropdown.js';

//import modes from './modes.js';
//import templates from './templates.js';

import Script from './script.js';
import Template from './template.js';


// Class for the user interface
class Transliterate
{
  constructor(data)
  {
    // Assign the data to this object
    let scripts = data.scripts || [];
    let scriptsDropdownElm = data.scriptsDropdownElm;

    let templates = data.templates || {};
    let templatesDropdownElm = data.templatesDropdownElm;

    let fromTextareaElm = data.fromTextareaElm;

    let toTextareaElm = data.toTextareaElm;

    let defaultScript = data.defaultScript || Cookies.get('transliterate.script');
    let defaultTemplate = data.defaultTemplate || Cookies.get('transliterate.template');

    // Create a map for scripts
    this.scripts = new Map();
    this.scriptsDropdownItems = this._createScripts(scripts);
    this.currentScript = undefined;

    // Create a map for templates
    this.templates = new Map();
    this.templatesDropdownItems = this._createTemplates(templates);
    this.currentTemplate = undefined;

    // Create the scripts dropdown
    $(scriptsDropdownElm).dropdownSelect(this.scriptsDropdownItems, defaultScript);
    this.scriptsDropdown = $(scriptsDropdownElm);
    this.scriptsDropdown.on('change', this._onScriptsDropdownChange.bind(this));

    // Create the templates dropdown
    $(templatesDropdownElm).dropdownSelect(this.templatesDropdownItems, defaultTemplate);
    this.templatesDropdown = $(templatesDropdownElm);
    this.templatesDropdown.on('change', this._onTemplatesDropdownChange.bind(this));

    // Create the source textarea
    this.fromTextarea = $(fromTextareaElm);
    this.fromTextarea.on('change input propertychange', this._onFromTextareaChange.bind(this));

    // Create the destination textarea
    this.toTextarea = $(toTextareaElm);
    this.toTextarea.on('focus', this._onToTextareaFocus.bind(this));

    // Trigger initial changes
    this.scriptsDropdown.trigger('change');
    this.templatesDropdown.trigger('change');
  }

  // Event handler when the scripts dropdown changes
  _onScriptsDropdownChange(e, value)
  {
    // Get the value from the element if it is undefined
    //if (typeof value === 'undefined')
    //  value = $(e.target).attr('data-value') || $(e.target).val();

    // Set the current script
    if (!this.scripts.has(value))
      throw new Error(`The script '${value}' does not exist`);

    this.currentScript = this.scripts.get(value);

    // Set a cookie with the last selected script
    Cookies.set('transliterate.script', value, {expires: 90});

    // Change the charmap
    /*let charmapElm = $('#charmap');
    charmapElm.empty();
    if (typeof script.charmap !== "undefined")
      script.charmap.render(charmapElm);*/

    // Change the RTL mode
    if (this.currentScript.transliteration.rightToLeft)
      this.toTextarea.addClass("text-right");
    else
      this.toTextarea.removeClass("text-right");

    // Trigger the from textarea
    //this.fromTextarea.trigger('change');
  }

  // Event handler when the templates dropdown changes
  _onTemplatesDropdownChange(e, value)
  {
    // Get the value from the element if it is undefined
    //if (typeof value === 'undefined')
    //  value = $(e.target).attr('data-value') || $(e.target).val();

    // Set the current template
    if (!this.templates.has(value))
      throw new Error(`The template '${value}' does not exist`);

    this.currentTemplate = this.templates.get(value);

    // Set a cookie with the last selected template
    Cookies.set('transliterate.template', value, {expires: 90});

    // Trigger the from textarea
    //this.fromTextarea.trigger('change');
  }

  // Event handler when the from textarea changes
  _onFromTextareaChange(e)
  {
    // Check the current script and template
    if (typeof this.currentScript === 'undefined')
      throw new Error(`No script is selected`);
    if (typeof this.currentTemplate === 'undefined')
      throw new Error(`No template is selected`);

    // Transliterate the source text
    let fromText = this.fromTextarea.val();
    let toText = this.currentScript.transliteration.transliterate(fromText, this.currentTemplate, this.currentScript);

    // Set the new text in the to textarea
    this.toTextarea.val(toText);
  }

  // Event handler when the to textarea is focused
  _onToTextareaFocus(e)
  {
    // Select the text in the textarea
    this.toTextarea.select();
  }

  // Fill the script map and return items to add to the scripts dropdown
  _createScripts(scripts)
  {
    let scriptsDropdownItems = [];

    // Clear the map
    if (this.scripts.size > 0)
      this.scripts.clear();

    // Iterate over the scripts
    for (let script of scripts)
    {
      // Create a dropdown item
      let item = {label: script.name, submenu: []};
      scriptsDropdownItems.push(item);

      // Iterate over separate transliterations
      for (let transliteration of script.transliterations)
      {
        // Add the transliteration to the map
        let id = `${script.id}_${transliteration.id}`;
        this.scripts.set(id, {id: id, script: script, transliteration: transliteration});

        // Add a dropdown item
        if (script.transliterations.length > 1)
          item.submenu.push({value: id, label: transliteration.name, buttonLabel: `${script.name} (${transliteration.name})`});
        else
          item.value = id;
      }
    }

    return scriptsDropdownItems;
  }

  // Fill the template map and return items to add to the templates dropdown
  _createTemplates(templates)
  {
    let templatesDropdownItems = [];

    // Clear the map
    if (this.templates.size > 0)
      this.templates.clear();

    // Iterate over the templates
    for (let template of templates)
    {
      // Add the template to the map
      this.templates.set(template.id, template);

      // Create a dropdown item
      let item = {value: template.id, label: template.name};
      templatesDropdownItems.push(item);
    }

    return templatesDropdownItems;
  }

  static sortByName(a, b)
  {
    if (a.name < b.name)
      return -1;
    else if (a.name > b.name)
      return 1;
    else
      return 0;
  }
}


// If the document is loaded
$(function()
{
  // Load the scripts
  Promise.all([
    Script.fromUrl('./data/scripts/cylenian.json'),
    Script.fromUrl('./data/scripts/syrrin.json'),
    Script.fromUrl('./data/scripts/daedian.json')

  ]).then(function(scripts) {
    // Create a new user interface instance
    let ui = new Transliterate({
      // Data
      scripts: scripts,
      templates: [new Template({id: 'none', name: "Geen sjabloon", func: (string, transliteration, mode) => `Test: ${string}`})],

      // UI selectors
      scriptsDropdownElm: '#script',
      templatesDropdownElm: '#template',
      fromTextareaElm: '#from',
      toTextareaElm: '#to'
    });
  });


});
4
