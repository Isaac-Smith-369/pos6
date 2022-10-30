const Foods = require("../templateScripts/Foods");
const Drinks = require("../templateScripts/Drinks");
const AddItem = require("../templateScripts/AddItem");
const Login = require("../templateScripts/Login");

const router = {
  Login: Login,
  Home: Foods,
  Drinks: Drinks,
  AddItem: AddItem,
};

module.exports = router;
