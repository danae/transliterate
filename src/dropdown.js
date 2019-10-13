// Create a Bootstrap dropdown from a select
$.fn.dropdownSelect = function(selectedValue)
{
  return this.each(function() {
    // Parse the options
    let buttonClass = $(this).attr('data-button-class') || 'btn-primary';
    let menuClass = $(this).attr('data-menu-class') || '';
    let itemClass = $(this).attr('data-item-class') || '';

    let prefix = $(this).attr('data-prefix') || '';
    let suffix = $(this).attr('data-suffix') || '';

    // Create the dropdown div
    let dropdown = $('<div class="dropdown">');
    $.each(this.attributes, function() {
      if (this.name === 'class')
        dropdown.addClass(this.value);
      else
        dropdown.attr(this.name, this.value);
    });

    // Dropdown button click event
    let dropdownButtonClick = function() {
      return function(e) {
        // Prevent the default click event
        e.preventDefault();
      };
    };

    // Create the button
    let dropdownButton = $('<button type="button" class="btn dropdown-toggle" data-toggle="dropdown">')
      .appendTo(dropdown)
      .addClass(buttonClass)
      .on('click', dropdownButtonClick);

    // Create the dropdown menu
    let dropdownMenu = $('<div class="dropdown-menu">')
      .appendTo(dropdown)
      .addClass(menuClass);

    // Dropdown item click event
    let dropdownItemClick = function(e, value, label) {
      value = value || $(this).attr('data-value');
      label = label || $(this).html();

      // Update the button label
      dropdownButton.html(prefix + label + suffix);

      // Set the value of the dropdown
      dropdown.attr('data-value', value);
      dropdown.trigger('change', [value]);
    };

    // Create a dropdown item
    let createDropdownItem = function(option) {
      let dropdownItem = $('<button type="button" class="dropdown-item">')
        .appendTo(dropdownMenu)
        .addClass(itemClass)
        .attr('data-value', option.value)
        .html(option.label)
        .on('click', dropdownItemClick);
      if (typeof elm !== 'undefined')
        dropdownItem.appendTo(elm);

      if (typeof option.disabled !== 'undefined' && option.disabled)
        dropdownItem.addClass('disabled');

      if (typeof option.selected !== 'undefined' && option.selected)
        return [dropdownItem, true];
      else
        return [dropdownItem, false];
    }

    // Add the items to the menu
    let selectedItem = undefined;
    $(this).find('option').each(function() {
      let [dropdownItem, selected] = createDropdownItem({
        value: this.value,
        label: this.label || $(this).html(),
        disabled: this.disabled,
        selected: this.selected
      });

      if (selected)
        selectedItem = dropdownItem;
    });

    // Select the first or selected item
    if (typeof selectedValue !== 'undefined' && dropdown.find(`.dropdown-item[data-value="${selectedValue}"]`).length > 0)
      selectedItem = dropdown.find(`.dropdown-item[data-value="${selectedValue}"]`);
    else
      selectedItem = selectedItem || dropdown.find('.dropdown-item');

    if (typeof selectedItem !== 'undefined')
      selectedItem.trigger('click');
    else
      dropdownItemClick();

    // Replace the select element
    $(this).replaceWith(dropdown);
  });
};
