// Define selectors for ease of use
const main$ = (elementId) => document.getElementById(elementId);
const main$$ = (elementclassName) =>
  document.getElementsByClassName(elementclassName);

// Convert HTML string to HTML elements
const htmlStrToNode = (htmlStr) => {
  let template = document.createElement("template");
  htmlStr = htmlStr.trim();
  template.innerHTML = htmlStr;
  return template.content.firstChild;
};

const hydrateDocument = (content) => {
  const mainContent = main$("main-content");

  // Clear all elements before applying new route content
  mainContent.replaceChildren();

  mainContent.innerHTML = content.template;

  // Buld a script tag and add the custom script tag
  const scriptTag = document.createElement("script");
  scriptTag.setAttribute("src", content.script);

  // Exeecute after all html has been parsed
  scriptTag.setAttribute("defer", "");

  scriptTag.onload = () => {
    console.log("Custom script loaded successfully");
  };

  scriptTag.onerror = () => {
    console.log("Error loading script");
  };

  mainContent.appendChild(scriptTag);
  // document.body.append(scriptTag);
};

// Load the default view when DOM content is loaded
document.addEventListener("DOMContentLoaded", async () => {
  const content = await window.routingAPI.getDefaultView();
  hydrateDocument(content);
});

const navigate = (element) => {
  const address = element.getAttribute("data-route");
  const res = window.routingAPI.navigateTo(address).then((res) => {
    console.log(res);
    hydrateDocument(res);
  });
  return false;
};
