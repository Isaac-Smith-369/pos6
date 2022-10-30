// Define selectors for ease of use
let container$ = (elementId) => document.getElementById(elementId);
var main$$ = (elementclassName) =>
  document.getElementsByClassName(elementclassName);

let appState = {
  user: null,
  cart: [],
};

// Convert HTML string to HTML elements
var htmlStrToHtmlNode = (htmlStr) => {
  let template = document.createElement("template");
  htmlStr = htmlStr.trim();
  template.innerHTML = htmlStr;
  return template.content;
};

var hydrateDocument = (content) => {
  const mainContent = main$("main-content");
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
  scriptTag.onload = () => {
    main$("username").innerHTML = appState.user.name;
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

let checkout = async () => {
  if (appState.cart.length === 0) return;
  console.log(appState.cart);
  await window.ordersAPI.createNewOrder(appState.cart);
  init();
  alert("Order placed successfully");
};

let init = async () => {
  let currentUser = await window.usersAPI.getCurrentUser();
  if (currentUser) {
    // Load the default route
    window.routingAPI.getDefaultRoute().then((content) => {
      hydrateDocument(content);
    });
  } else {
    window.routingAPI.navigateToRoute("Login").then((res) => {
      document.replaceChildren();
      document.appendChild(htmlStrToHtmlNode(res));
      // console.log(document);
    });
  }
};

init();
