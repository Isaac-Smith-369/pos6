const { generateRandomStr } = require("../mainScripts/utils");
const Login = async () => {
  const name = "Login";
  const script = `./rendererScripts/login.js?id=${generateRandomStr()}`;
  const template = `
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
        integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
        />
        <title>GCTU Canteen</title>
        <link rel="stylesheet" href="./css/login-style.css" />
    </head>
    <body>
    <div class="container" id="container">
    <div class="form-container sign-up-container">
        <form id="register-form">
        <h1>Create Account</h1>
        <input name="name" type="text" placeholder="Name" />
        <input name="username" type="text" placeholder="Username" />
        <input name="password" type="password" placeholder="Password" />
        <button id="register-btn" onSubmit="(e) => e.preventDefault()">Create Account</button>
        </form>
    </div>
    <div class="form-container log-in-container">
        <form id="login-form">
        <h1>Log in</h1>
        <input name="username" type="text" placeholder="Username" />
        <input name="password" type="password" placeholder="Password" />
        <a href="#">Forgot your password?</a>
        <button id="login-btn" onSubmit="(e) => e.preventDefault()">Log In</button>
        </form>
    </div>
    <div class="overlay-container">
        <div class="overlay">
        <div class="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>Already have an account? Log In</p>
            <button class="ghost" id="logIn">Log In</button>
        </div>
        <div class="overlay-panel overlay-right">
            <h1>Hello, There!</h1>
            <p>Don't have an account? Sign Up Free</p>
            <button class="ghost" id="signUp">Sign Up</button>
        </div>
        </div>
    </div>
    </div>
    </body>
    `;
  return { name, template, script };
};
module.exports = Login;
