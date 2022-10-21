const signUpButton = document.getElementById("signUp");
const logInButton = document.getElementById("logIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

logInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

var handleRegister = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const user = Object.fromEntries(formData);
  console.log("Sent request to create new user");
  const currentUser = await window.usersAPI.createNewUser(user);
  if (currentUser) {
    navigateToView("Container");
  } else {
    alert("Coundn't create an account for you. Try again");
  }
  // clearForm();
};

var handleLogin = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const user = Object.fromEntries(formData);
  console.log("User ", user);
  console.log("Sent request to login");
  const currentUser = await window.usersAPI.logIn(user);
  if (currentUser) {
    navigateToView("Container");
  } else {
    alert("Invalid username or password");
  }
  // clearForm();
};

var userRegister = document.getElementById("register-form");
userRegister.addEventListener("submit", handleRegister);

var userLogin = document.getElementById("login-form");
userLogin.addEventListener("submit", handleLogin);
