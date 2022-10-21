// Convert HTML string to HTML elements
var htmlStrToNode = (htmlStr) => {
  let template = document.createElement("template");
  htmlStr = htmlStr.trim();
  template.innerHTML = htmlStr;
  return template.content;
};

var appendScriptTagToMain = (parent, script) => {
  // Buld a script tag and add the custom script tag
  const scriptTag = document.createElement("script");
  // Execute after all html has been parsed
  scriptTag.setAttribute("defer", "");
  scriptTag.setAttribute("src", script);
  scriptTag.onload = () => {
    console.log("Custom script loaded successfully");
  };
  scriptTag.onerror = () => {
    console.log("Error loading script");
  };
  parent.appendChild(scriptTag);
};

var hydrateMain = (content) => {
  const currentView = document.getElementById("current-view");
  // Clear all elements before applying new route content
  currentView.replaceChildren();
  currentView.innerHTML = content.template;
  // currentView.append(htmlStrToNode(content.template));
  appendScriptTagToMain(currentView, content.script);
};

// Load the default view when DOM content is loaded
document.addEventListener("DOMContentLoaded", async () => {
  const content = await window.routingAPI.getDefaultView();
  hydrateMain(content);
});

var navigateToView = (viewName) => {
  window.routingAPI.navigateToView(viewName).then((res) => {
    if (res) {
      hydrateMain(res);
    }
  });
  return false;
};
