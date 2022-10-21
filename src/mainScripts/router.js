const Foods = require("../templateScripts/Foods");
const Drinks = require("../templateScripts/Drinks");
const AddItem = require("../templateScripts/AddItem");

const router = {
  Home: Foods,
  Drinks: Drinks,
  AddItem: AddItem,
};

module.exports = router;
