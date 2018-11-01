import modes from './modes.js';
import templates from './templates.js';

// Categorize a dict object
let categorize = function(dict)
{
  let categories = {};

  // Categorize the children
  for (let id in dict)
  {
    let child = dict[id];

    if (typeof categories[child.category] === "undefined")
      categories[child.category] = {};
    categories[child.category][id] = child;
  }

  // Sort the categories
  let orderedCategories = {};
  Object.keys(categories).sort().forEach(function(key) {
    orderedCategories[key] = categories[key];
  });
  return orderedCategories;
};

// Add modes to the dropdown
let initModeDropdown = function(modes)
{
  let categorizedModes = categorize(modes);

  let first = true;
  for (let category in categorizedModes)
  {
    // Add separator
    if (first)
      first = false;
    else
    {
      let separator = document.createElement('div');
      $(separator).addClass('dropdown-divider');
      $('#toScript .dropdown-menu').append(separator);
    }

    // Add category name
    let header = document.createElement('h6');
    $(header).addClass('dropdown-header');
    $(header).text(category);
    $('#toScript .dropdown-menu').append(header);

    // Sort the modes
    let modes = categorizedModes[category];
    let orderedModes = {};
    Object.keys(modes).sort().forEach(function(key) {
      orderedModes[key] = modes[key];
    });

    // Add modes
    for (let id in orderedModes)
    {
      let mode = orderedModes[id];

      let option = document.createElement('button');
      $(option).addClass('dropdown-item btn-sm');
      $(option).attr('data-value',id);
      $(option).text(mode.name);
      $('#toScript .dropdown-menu').append(option);
    }
  }
};

// Add templates to the dropdown
let initTemplateDropdown = function(templates)
{
  let categorizedTemplates = categorize(templates);

  let first = true;
  for (let category in categorizedTemplates)
  {
    // Add separator
    if (first)
      first = false;
    else
    {
      let separator = document.createElement('div');
      $(separator).addClass('dropdown-divider');
      $('#template .dropdown-menu').append(separator);
    }

    // Add category name
    if (category !== "@")
    {
      let header = document.createElement('h6');
      $(header).addClass('dropdown-header');
      $(header).text(category);
      $('#template .dropdown-menu').append(header);
    }

    // Get the templates
    let templates = categorizedTemplates[category];

    // Add templates
    for (let id in templates)
    {
      let template = templates[id];

      let option = document.createElement('button');
      $(option).addClass('dropdown-item btn-sm');
      $(option).attr('data-value',id);
      $(option).text(template.name);
      $('#template .dropdown-menu').append(option);
    }
  }
};

// If the document is loaded
$(function()
{
  let template;

  initModeDropdown(modes);
  initTemplateDropdown(templates);

  // Clear all button events
  $('button').click(function(e) {
    e.preventDefault();
  });

  // Dropdown menu acting as select
  $('.dropdown .dropdown-item').click(function() {
    let dropdown = $(this).parents('.dropdown');
    dropdown.trigger('change',[dropdown.get(0),this,true]);
  });

  // If the dropdown menu changes
  $('.dropdown').change(function(e, dropdownElm, selectedElm, triggerTranslation)
  {
    // Change the value and button text
    let prefix = $(dropdownElm).attr('data-prefix');
    if (typeof prefix === "undefined")
      prefix = "";

    let value = $(selectedElm).attr('data-value');
    $(dropdownElm).attr('data-value',value);
    $(dropdownElm).find('.dropdown-toggle').html(prefix + $(selectedElm).text());

    // Trigger the transliteration
    if (triggerTranslation)
      $('#from').trigger('change');
  });

  // If the toScript dropdown chages
  $('#toScript').change(function(e, dropdownElm, selectedElm, triggerTranslation)
  {
    let toScript = $('#toScript').attr('data-value');
    let toMode = modes[toScript];

    // Set a cookie with the last selected toScript
    Cookies.set('transliterate.toScript',toScript);

    // Change the charmap
    let charmapElm = $('#charmap');
    charmapElm.html('');
    toMode.charmap.render(charmapElm);

    // Change the RTL mode
    if (toMode.mapping.rightToLeft)
      $('#to').addClass("text-right");
    else
      $('#to').removeClass("text-right");
  });

  // If the template dropdown chages
  $('#template').change(function(e, dropdownElm, selectedElm, triggerTranslation)
  {
    let templateValue = $('#template').attr('data-value');
    template = templates[templateValue];

    // Set a cookie with the last selected template
    Cookies.set('transliterate.template',templateValue);

    $('#from').trigger('change');
  });

  // If the text of the from-textarea changes
  $('#from').on('change input propertychange',function()
  {
    // Get from and to modes
    let toScript = $('#toScript').attr('data-value');
    let toMode = modes[toScript];

    // Get the source text
    let fromText = $('#from').val();

    // Convert
    let toText = toMode.map(fromText,template);
    $('#to').val(toText);
  });

  // If the to-textarea is focused
  $('#to').on('focus',function()
  {
    $(this).select();
  });

  // Set the default values
  let defaultToScript = Cookies.get('transliterate.toScript');
  if (typeof defaultToScript === 'undefined' || !modes.hasOwnProperty(defaultToScript))
    defaultToScript = 'daedian';

    let defaultTemplate = Cookies.get('transliterate.template');
    if (typeof defaultTemplate === 'undefined' || !templates.hasOwnProperty(defaultTemplate))
      defaultTemplate = 'none';

  $('#toScript').trigger('change',[$('#toScript'),$('#toScript .dropdown-item[data-value="' + defaultToScript + '"]').get(0),false]);
  $('#template').trigger('change',[$('#template'),$('#template .dropdown-item[data-value="' + defaultTemplate + '"]').get(0),false]);
});
