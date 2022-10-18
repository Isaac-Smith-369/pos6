// Define selectors for ease of use
const $ = (elementId) => document.getElementById(elementId);
const $$ = (elementclassName) =>
  document.getElementsByClassName(elementclassName);

const signUpButton = $("signUp");
const logInButton = $("logIn");
const container = $("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

logInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});
