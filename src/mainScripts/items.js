const { closeDatabase } = require("./db");
const { convertBytesToImage, convertImageToBytes } = require("./utils");

const prepareItem = (item) => {
  const itemObj = {
    ...item,
    image: item.image === "" ? null : convertImageToBytes(item.image),
  };
  const itemArr = Object.values(itemObj);
  return itemArr;
};

// Insert a single food item into the database
const createFoodItem = (database, foodItem) => {
  const sql = `INSERT INTO food(
      name,
      description,
      type,
      price,
      image,
      quantity
    )
    VALUES(?, ?, ?, ?, ?, ?)`;
  const item = prepareItem(foodItem);
  database.run(sql, item, function (err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  });
  closeDatabase(database);
};

// Insert multiple food items into the database
const createFoodItems = (database, foodItems) => {
  let placeholders = foodItems.map((_) => "(?, ?, ?, ?, ?, ?)").join(",");
  const sql = `INSERT INTO food(
      name,
      description,
      type,
      price,
      image,
      quantity
    )
    VALUES ${placeholders}`;
  console.log(sql);
  const items = prepareItem(foodItems);
  database.run(sql, items, function (err) {
    if (err) {
      console.error(err.message);
    }
    console.log(`Inserted ${this.changes} inserted.`);
  });
  closeDatabase(database);
};

const getItems = (database, type) => {
  const sql = `SELECT * FROM food WHERE type = ?`;
  return new Promise((resolve, reject) => {
    database.all(sql, [type], (err, rows) => {
      if (err) reject(err);
      console.log("Returning rows of food items");
      rows.map((item) => (item.image = convertBytesToImage(item.image)));
      resolve(rows);
    });
    closeDatabase(database);
  });
};

module.exports = { createFoodItem, createFoodItems, getItems };
