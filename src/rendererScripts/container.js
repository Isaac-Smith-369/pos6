// Define selectors for ease of use
var container$ = (elementId) => document.getElementById(elementId);
var container$$ = (elementclassName) =>
  document.getElementsByClassName(elementclassName);

var hydrateDocument = (content) => {
  const mainContent = container$("main-content");
  // Clear all elements before applying new route content
  mainContent.replaceChildren();
  mainContent.innerHTML = content.template;
  loadScript(mainContent, content.script);
};

// Load the default view when DOM content is loaded
var loadScript = (parent, script) => {
  // Buld a script tag and add the custom script tag
  const scriptTag = document.createElement("script");
  scriptTag.setAttribute("defer", "");
  scriptTag.setAttribute("src", script);
  scriptTag.onload = async () => {
    let currentUser = await window.usersAPI.getCurrentUser();
    container$("username").innerHTML = currentUser.name;
    console.log("Custom script loaded successfully");
  };
  scriptTag.onerror = () => {
    console.log("Error loading script");
  };
  parent.appendChild(scriptTag);
};

var navigate = (element) => {
  const address = element.getAttribute("data-route");
  window.routingAPI.navigateToRoute(address).then((res) => {
    if (res) {
      hydrateDocument(res);
    }
  });
  return false;
};

// Load the default route
window.routingAPI.getDefaultRoute().then((content) => {
  hydrateDocument(content);
});
