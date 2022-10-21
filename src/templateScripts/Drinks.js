const { connectToDb } = require("../mainScripts/db");
const { getItems } = require("../mainScripts/items");
const Items = require("./Items");
const { generateRandomStr } = require("../mainScripts/utils");

const Drinks = async () => {
  let database = await connectToDb();
  const items = getItems(database, "Drinks");

  const script = `./rendererScripts/food.js?id=${generateRandomStr()}`;

  const template = Items("DRINKS", items);

  return { template, script };
};

module.exports = Drinks;
