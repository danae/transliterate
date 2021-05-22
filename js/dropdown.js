// Create a select-like component using a dropdown button
$.fn.dropdownSelect = function(items, selectedValue, triggerChange = false)
{
  return this.each(function() {
    // Get the dropdown element
    let dropdown = this;

    // Dropdown item click event
    let dropdownItemClick = function(e) {
      let value = $(this).attr('data-value');
      let label = $(this).attr('data-label') || $(this).html();

      // Update the active item of the dropdown
      $(dropdown).find('.dropdown-item.is-active').removeClass('is-active');
      $(this).addClass('is-active');

      // Update the label of the dropdown
      $(dropdown).find('.dropdown-label').html(label);

      // Update the value of the dropdown
      $(dropdown).attr('data-value', value);
      $(dropdown).trigger('change', [value]);
    };

    // Get the dropdown content
    let dropdownContent = $(dropdown).find('.dropdown-content');

    // Add the items to the dropdown
    for (let item of items)
    {
      // Check the type of the item
      if (item.type === 'divider')
      {
        // Dropdown divider
        let dropdownDivider = $('<hr class="dropdown-divider">');

        // Add the divider to the dropdown
        $(dropdownContent).append(dropdownDivider);
      }
      else if (item.type === 'header')
      {
        // Dropdown header
        let dropdownHeader = $('<div class="dropdown-item dropdown-header">')
          .html(item.label);

        // Add the header to the dropdown
        $(dropdownContent).append(dropdownHeader);
      }
      else if (item.type === 'custom')
      {
        // Dropdown item with custom HTML
        let dropdownCustomItem = $('<div class="dropdown-item">')
          .attr('data-value', item.value)
          .html(item.html);

        // Add the custom item to the dropdown
        $(dropdownContent).append(dropdownCustomItem);
      }
      else if (item.type === 'item')
      {
        // Dropdown item with link (default)
        let dropdownItem = $('<a href="#" class="dropdown-item is-size-7 px">')
          .attr('data-value', item.value)
          .attr('data-label', item.label)
          .html(item.html || item.label)
          .on('click', dropdownItemClick);

          // Check if this item is selected
          if (selectedValue == dropdownItem.value)
            dropdownItem.addClass('is-active');

        // Add the custom item to the dropdown
        $(dropdownContent).append(dropdownItem);
      }
    }

    // Select the first or selected item
    let selectedItem = undefined;
    if (selectedValue === undefined || (selectedItem = $(dropdown).find(`.dropdown-item[data-value="${selectedValue}"]`)).length == 0)
      selectedItem = $($(dropdown).find('.dropdown-item[data-value]').get(0));

    // Add the button trigger if applicable
    if (triggerChange)
      $(dropdown).find('.dropdown-trigger').on('click', function() {
        $(dropdown).trigger('change');
      });

    // Trigger the click of the selected item
    if (selectedItem !== undefined)
      selectedItem.trigger('click');
  });
};
