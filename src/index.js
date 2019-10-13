import './dropdown.js';

import modes from './modes.js';
import templates from './templates.js';


// Add modes to the dropdown
let initModeDropdown = function(elmSelector, modes)
{
  let elm = $(elmSelector);

  Object.keys(modes).sort().forEach(function(modeId) {
    let mode = modes[modeId];
    $('<option>')
      .appendTo(elm)
      .val(modeId)
      .html(mode.name);
  });
};

// Add templates to the dropdown
let initTemplateDropdown = function(elmSelector, templates)
{
  let elm = $(elmSelector);

  for (let templateId in templates)
  {
    let template = templates[templateId];
    $('<option>')
      .appendTo(elm)
      .val(templateId)
      .html(template.name);
  }
};

// If the document is loaded
$(function()
{
  let template;

  // Set the default values
  let defaultScript = Cookies.get('transliterate.script');
  let defaultTemplate = Cookies.get('transliterate.template');

  // initialize the script dropdown
  initModeDropdown('#script', modes);
  $('#script').dropdownSelect(defaultScript);

  // Initialize the template dropdown
  initTemplateDropdown('#template', templates);
  $('#template').dropdownSelect(defaultTemplate);

  // If the script dropdown chages
  $('#script').change(function(e, value)
  {
    let toMode = modes[value];

    // Set a cookie with the last selected script
    Cookies.set('transliterate.script', value, {expires: 90});

    // Change the charmap
    let charmapElm = $('#charmap');
    charmapElm.html('');
    if (typeof toMode.charmap !== "undefined")
      toMode.charmap.render(charmapElm);

    // Change the RTL mode
    if (toMode.transliteration.rightToLeft)
      $('#to').addClass("text-right");
    else
      $('#to').removeClass("text-right");

    // Trigger the translation
    $('#from').trigger('change');
  });

  // If the template dropdown chages
  $('#template').change(function(e, value)
  {
    template = templates[value];

    // Set a cookie with the last selected template
    Cookies.set('transliterate.template', value, {expires: 90});

    // Trigger the translation
    $('#from').trigger('change');
  });

  // If the text of the from-textarea changes
  $('#from').on('change input propertychange', function()
  {
    // Get from and to modes
    let script = $('#script').attr('data-value');
    let toMode = modes[script];

    // Get the source text
    let fromText = $('#from').val();

    // Convert
    let toText = toMode.transliteration.transliterate(fromText, template, toMode);
    $('#to').val(toText);
  });

  // If the to-textarea is focused
  $('#to').on('focus', function()
  {
    $(this).select();
  });
});
4
