// Class that defines a template
export default class Template
{
  // Constructor
  constructor(data)
  {
    this.id = data.id;
    this.name = data.name;
    this.visible = data.visible || true;
    this.template = data.template;
  }

  // Apply the template to a string
  apply(string, script)
  {
    let appliedString = this.template;

    appliedString = appliedString.replaceAll("%string%", string);
    appliedString = appliedString.replaceAll("%id%", script.id);
    appliedString = appliedString.replaceAll("%name%", script.name);
    appliedString = appliedString.replaceAll("%category%", script.category);
    appliedString = appliedString.replaceAll("%font%", script.font);

    return appliedString;
  }

  // Load templates from a URL
  static async load(url)
  {
    // Fetch the response
    let response = await fetch(url);

    // Fetch the JSON
    let datas = await response.json();

    // Iterate over the data in order to fill the templates map
    let templates = new Map();
    for (let data of datas)
    {
      let template = new Template(data);
      templates.set(template.id, template);
    }

    // Return the templates
    return templates;
  }
}
