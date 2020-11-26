import './dropdown.js';

import Script from '../src/script.js';
import Template from '../src/template.js';


// Function for sorting an array by a key or a function
Array.prototype.sortBy = function(key) {
  return this.sort(function(a, b) {
    var aValue = key instanceof Function ? key(a) : a[key];
    var bValue = key instanceof Function ? key(b) : b[key];
    return ((aValue < bValue) ? -1 : ((aValue > bValue) ? 1 : 0));
  });
};

// Function for grouping an array by a key or function
Array.prototype.groupBy = function(key) {
  return this.reduce(function(hash, item) {
    var value = key instanceof Function ? key(item) : item[key];
    (hash[value] = hash[value] || []).push(item);
    return hash;
  }, {});
};

// Class for the user interface
class Transliterate
{
  constructor(data)
  {
    // Create a map for scripts
    this.scripts = data.scripts;
    this.scriptsDropdownItems = Transliterate.createScriptsDropdown(this.scripts);
    this.scriptsDropdownElm = data.scriptsDropdownElm;
    this.defaultScript = data.defaultScript || Cookies.get('transliterate.script');
    this.currentScript = undefined;

    // Create a map for templates
    this.templates = data.templates
    this.templatesDropdownItems = Transliterate.createTemplatesDropdown(this.templates);
    this.templatesDropdownElm = data.templatesDropdownElm;
    this.defaultTemplate = data.defaultTemplate || Cookies.get('transliterate.template');

    // Create the scripts dropdown
    $(this.scriptsDropdownElm).dropdownSelect(this.scriptsDropdownItems, this.defaultScript);
    this.scriptsDropdown = $(data.scriptsDropdownElm);
    this.scriptsDropdown.on('change', this.onScriptsDropdownChange.bind(this));

    // Create the templates dropdown
    $(this.templatesDropdownElm).dropdownSelect(this.templatesDropdownItems, this.defaultTemplate, true);
    this.templatesDropdown = $(data.templatesDropdownElm);
    this.templatesDropdown.on('change', this.onTemplatesDropdownChange.bind(this));

    // Create the source textarea
    this.fromTextarea = $(data.fromTextareaElm);
    this.fromTextarea.on('change input propertychange', this.onFromTextareaChange.bind(this));

    // Create the destination textarea
    this.toTextarea = $(data.toTextareaElm);

    // Trigger initial changes
    this.scriptsDropdown.trigger('change', this.defaultScript);
  }

  // Event handler when the scripts dropdown changes
  onScriptsDropdownChange(e, value)
  {
    // Get the value from the element if it is undefined
    if (typeof value === "undefined")
      value = $(e.target).attr('data-value') || $(e.target).val();

    // Check if the script exists
    if (!this.scripts.has(value))
      throw new Error(`The script '${value}' does not exist`);

    // Set a cookie with the last selected script
    Cookies.set('transliterate.script', value, {expires: 90});

    // Set the current script
    this.currentScript = this.scripts.get(value);

    // Change the RTL mode
    if (this.currentScript.transliteration.rightToLeft)
      this.toTextarea.addClass("has-text-right");
    else
      this.toTextarea.removeClass("has-text-right");

    // Trigger the from textarea
    this.fromTextarea.trigger('change');
  }

  // Event handler when the templates dropdown changes
  onTemplatesDropdownChange(e, value)
  {
    // Get the value from the element if it is undefined
    if (typeof value === 'undefined')
      value = $(e.target).attr('data-value') || $(e.target).val();

    // Check if the template exists
    if (value !== 'none' && !this.templates.has(value))
      throw new Error(`The template '${value}' does not exist`);

    // Set a cookie with the last selected template
    Cookies.set('transliterate.template', value, {expires: 90});

    // Copy the text with the template applied
    let text = this.toTextarea.val();
    if (value !== 'none')
      text = this.templates.get(value).apply(text, this.currentScript);

    // Copy the text to the clipboard
    navigator.clipboard.writeText(text).then(function() {
      console.log("Copied!");
    });
  }

  // Event handler when the from textarea changes
  onFromTextareaChange(e)
  {
    // Check the current script and template
    if (typeof this.currentScript === 'undefined')
      throw new Error(`No script is selected`);

    // Transliterate the source text
    let fromText = this.fromTextarea.val();
    let toText = this.currentScript.transliteration.transliterate(fromText);

    // Set the new text in the to textarea
    this.toTextarea.val(toText);
  }

  // Return items to add to the scripts dropdown
  static createScriptsDropdown(scriptsMap)
  {
    let scripts = Array.from(scriptsMap.values());
    let scriptsDropdownItems = [];

    // Sort the scripts alphabetically by name
    scripts.sortBy('name');

    // Iterate over the scripts by category
    let categories = scripts.groupBy('category');
    let categoriesNames = Object.keys(categories).sort();
    let firstCategory = true;
    for (let category of categoriesNames)
    {
      // Add the category divider
      if (!firstCategory)
        scriptsDropdownItems.push({type: 'divider'});
      else
        firstCategory = false;

      // Add the category header
      scriptsDropdownItems.push({type: 'header', label: category});

      // Iterate over the scripts
      let scripts = categories[category];
      for (let script of scripts)
      {
        // Add the transliteration to the items
        scriptsDropdownItems.push({type: 'item', value: script.id, label: script.name});
      }
    }

    // Return the scripts dropdown items
    return scriptsDropdownItems;
  }

  // Return items to add to the templates dropdown
  static createTemplatesDropdown(templatesMap)
  {
    let templates = Array.from(templatesMap.values());
    let templatesDropdownItems = [];

    // Add the empty template
    templatesDropdownItems.push({type: 'item', value: 'none', label: `Kopiëren`, html: template.name});

    // Iterate over the templates
    for (let template of templates)
    {
      // Add the template to the items
      templatesDropdownItems.push({type: 'item', value: template.id, label: `Kopiëren als ${template.name}`});
    }

    // Return the templates dropdown items
    return templatesDropdownItems;
  }
}


// If the document is loaded
$(function()
{
  // Load the scripts
  Promise.all([
    Script.load('./data/scripts.json'),
    Template.load('./data/templates.json')
  ]).then(function(data) {
    // Split the data
    let [scripts, templates] = data;

    // Create a new user interface instance
    let ui = new Transliterate({
      // Data
      scripts: scripts,
      templates: templates,

      // UI selectors
      scriptsDropdownElm: '#script',
      templatesDropdownElm: '#template',
      fromTextareaElm: '#from',
      toTextareaElm: '#to'
    });
  });
});
