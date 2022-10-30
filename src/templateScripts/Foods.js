const { connectToDb } = require("../mainScripts/db");
const { getItems } = require("../mainScripts/items");
const Items = require("./Items");
const { generateRandomStr } = require("../mainScripts/utils");

const Foods = async () => {
  // Get all items from the database
  let database = await connectToDb();
  const items = getItems(database, "Foods");

  const name = "Home";

  const script = `./rendererScripts/food.js?id=${generateRandomStr()}`;

  const template = Items("FOODS", items);

  return { name, template, script };
};

module.exports = Foods;
