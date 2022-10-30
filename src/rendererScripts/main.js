// Define selectors for ease of use
let main$ = (elementId) => document.getElementById(elementId);
var main$$ = (elementclassName) =>
  document.getElementsByClassName(elementclassName);

let appState = {
  user: null,
  cart: [],
  container: null,
  userLoggedIn: false,
};

// Buld a script tag and add the custom script tag
let loadScript = (parent, script) => {
  const scriptTag = document.createElement("script");
  scriptTag.setAttribute("defer", "");
  scriptTag.setAttribute("src", script);
  scriptTag.onload = () => {
    console.log("Custom script loaded successfully");
    // main$("username").innerHTML = appState.user.name;
  };
  scriptTag.onerror = () => {
    console.log("Error loading script");
  };
  parent.appendChild(scriptTag);
};

// Convert HTML string to HTML elements
let htmlStrToHtmlNode = (htmlStr) => {
  let template = document.createElement("template");
  htmlStr = htmlStr.trim();
  template.innerHTML = htmlStr;
  return template.content;
};

let hydrateLogin = (content) => {
  let rootNode = document.getElementsByTagName("html")[0];
  rootNode.replaceChildren();
  rootNode.innerHTML = content.template;
  loadScript(rootNode, content.script);
};

let hydrateHome = (content) => {
  let rootNode = document.getElementsByTagName("html")[0];
  if (appState.userLoggedIn) {
    rootNode.replaceChildren();
    rootNode.innerHTML = appState.container;
  }
  if (content.name === "Login") {
    return;
  } else {
    const mainContent = main$("main-content");
    mainContent.replaceChildren();
    mainContent.innerHTML = content.template;
    main$("username").innerHTML = appState.user.name;
    appState.userLoggedIn = false;
    loadScript(rootNode, content.script);
  }
};

let navigate = async (element) => {
  const routeName = element.getAttribute("data-route");
  let res = await window.routingAPI.navigateToRoute(routeName);
  if (res) {
    hydrateHome(res);
  }
  return false;
};

let navigateToRoute = async (routeName) => {
  let res = await window.routingAPI.navigateToRoute(routeName);
  if (res) {
    hydrateHome(res);
  }
};

let checkout = async () => {
  if (appState.cart.length < 1) {
    return;
  } else {
    console.log(appState.cart);
    await window.ordersAPI.createNewOrder(appState.cart);
    navigateToRoute("Home");
    alert("Order placed successfully");
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  appState.user = await window.usersAPI.getCurrentUser();
  appState.container = document.getElementsByTagName("html")[0].innerHTML;
  let homeContent = await window.routingAPI.getDefaultRoute();
  let loginContent = await window.routingAPI.navigateToRoute("Login");
  if (appState.user) {
    hydrateHome(homeContent);
  } else {
    hydrateLogin(loginContent);
  }
});
