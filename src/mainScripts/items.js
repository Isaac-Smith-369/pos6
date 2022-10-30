const { writeDbSync } = require("./db");
const { convertBytesToImage, convertImageToBytes } = require("./utils");

const prepareItem = (item) => {
  const itemObj = {
    name: item.itemName,
    description: item.description,
    type: item.type,
    price: item.price,
    image: item.image === "" ? null : convertImageToBytes(item.image),
    quantity: item.quantity,
  };
  const itemArr = Object.values(itemObj);
  return itemArr;
};

// Insert a single food item into the database
const createFoodItem = (database, foodItem) => {
  const sql = `INSERT INTO items(
      name,
      description,
      type,
      price,
      image,
      quantity
    )
    VALUES(?, ?, ?, ?, ?, ?)`;
  const item = prepareItem(foodItem);
  try {
    database.run(sql, item);
    writeDbSync(database);
  } catch (error) {
    console.error(error);
  }
};

// Insert multiple food items into the database
const createFoodItems = (database, foodItems) => {
  let placeholders = foodItems.map((_) => "(?, ?, ?, ?, ?, ?)").join(",");
  const sql = `INSERT INTO items(
      name,
      description,
      type,
      price,
      image,
      quantity
    )
    VALUES ${placeholders}`;
  const items = prepareItem(foodItems);
  try {
    database.run(sql, items);
    writeDbSync(database);
  } catch (error) {
    console.error(error);
  }
};

const getItems = (database, type) => {
  const sql = `SELECT * FROM items WHERE type = ?`;
  let items = [];
  const stmt = database.prepare(sql);
  stmt.bind([type]);
  while (stmt.step()) {
    let item = stmt.getAsObject();
    items.push(item);
  }
  // Convert bytes to image
  items.map((item) =>
    item.image !== null ? (item.image = convertBytesToImage(item.image)) : ""
  );
  // Free memory used by statement
  stmt.free();
  return items;
};

module.exports = { createFoodItem, createFoodItems, getItems };
