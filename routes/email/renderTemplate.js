async function renderTemplate(data) {
  try {
    // Use data from the request body to personalize the email
    const { name, company, message } = data;

    // Read the MJML template file
    const mjmlTemplate = await fs.readFile("./src/template.mjml", "utf-8");

    // Modify the template with dynamic data
    const modifiedTemplate = mjmlTemplate
      .replace(/<%=\s*it\.name\s*%>/g, name)
      .replace(/<%=\s*it\.company\s*%>/g, company)
      .replace(/<%=\s*it\.message\s*%>/g, message)

    // Convert the modified MJML to HTML using mjml2html
    const { html } = mjml2html(modifiedTemplate);

    return html;
  } catch (error) {
    console.error("Error rendering template:", error);
    throw new Error("Error rendering email template");
  }
}

module.exports = renderTemplate;
