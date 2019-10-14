// Create a Bootstrap dropdown from a select
$.fn.dropdownSelect = function(itemsToPopulate, selectedValue)
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

    // Create the button
    let dropdownButton = $('<button type="button" class="btn dropdown-toggle" data-toggle="dropdown">')
      .appendTo(dropdown)
      .addClass(buttonClass)
      .on('click', e => e.preventDefault());

    // Create the dropdown menu
    let dropdownMenu = $('<div class="dropdown-menu">')
      .appendTo(dropdown)
      .addClass(menuClass);

    // Dropdown item click event
    let dropdownItemClick = function(e, value, buttonLabel) {
      value = value || $(this).attr('data-value');
      buttonLabel = buttonLabel || $(this).attr('data-button-label') || $(this).html();

      // Update the button label
      dropdownButton.html(prefix + buttonLabel + suffix);

      // Set the value of the dropdown
      dropdown.attr('data-value', value);
      dropdown.trigger('change', [value]);
    };

    // Create a dropdown item
    let createDropdownItem = function(elm, option) {
      let dropdownItem = $('<button type="button" class="dropdown-item">')
        .appendTo(elm)
        .addClass(itemClass)
        .attr('data-value', option.value)
        .attr('data-button-label', option.buttonLabel || option.label)
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
    };

    // Create a dropdown submenu
    let createDropdownSubmenu = function(elm, option)
    {
      if (typeof option.submenu === 'undefined' || option.submenu.length === 0)
        return createDropdownItem(elm, option);
      else
      {
        // Create the dropdown submenu
        let dropdownSubmenu = $('<div class="dropdown-submenu">')
          .appendTo(dropdownMenu)
          .on('click', e => {
            if ($(e.currentTarget).children().is(e.target))
            {
              e.preventDefault();
              e.stopPropagation();
            }
          });

        // Create the dropdown item
        let [dropdownItem, selected] = createDropdownItem(dropdownSubmenu, option);
        dropdownItem
          .off('click')
          .on('click', e => e.preventDefault());

        // Create the dropdown menu
        let dropdownSubmenuMenu = $('<div class="dropdown-menu">')
          .appendTo(dropdownSubmenu)
          .addClass(menuClass);

        // Recursively add submenu
        for (let submenuOption of option.submenu)
          createDropdownSubmenu(dropdownSubmenuMenu, submenuOption);

        return [dropdownItem, selected];
      }
    };

    // Add the items to the menu
    let selectedItem = undefined;

    // Check for items to populate
    if (typeof itemsToPopulate !== 'undefined')
    {
      // Add items to populate
      $.each(itemsToPopulate, function() {
        let [dropdownItem, selected] = createDropdownSubmenu(dropdownMenu, this);

        if (selected)
          selectedItem = dropdownItem;
      });
    }
    else
    {
      // Add options that are present on the element
      $(this).find('option').each(function() {
        let [dropdownItem, selected] = createDropdownItem(dropdownMenu, {
          value: this.value,
          label: this.label || $(this).html(),
          buttonLabel: $(this).html(),
          disabled: this.disabled,
          selected: this.selected
        });

        if (selected)
          selectedItem = dropdownItem;
      });
    }

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
