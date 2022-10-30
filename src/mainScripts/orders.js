const { writeDbSync } = require("./db");

const createOrder = (database, order) => {
  let placeholders = [];
  if (order.length > 1) {
    placeholders = order.map((_) => "(?, ?, ?)").join(",");
  } else {
    placeholders = order.map((_) => "(?, ?, ?)");
  }
  const sql = `INSERT INTO orders(
        item,
        quantity,
        total
      )
      VALUES ${placeholders}`;
  try {
    let orderItems = order.map((orderItem) => Object.values(orderItem));
    // order.forEach((orderItem) => {
    //   orderItems.push(Object.values(orderItem));
    // });
    database.run(sql, orderItems.flat());
    writeDbSync(database);
  } catch (error) {
    console.error(error);
  }
};

const getOrders = (database) => {
  const sql = `SELECT * FROM orders`;
  let orders = [];
  const stmt = database.prepare(sql);
  while (stmt.step()) {
    let order = stmt.getAsObject();
    orders.push(order);
  }
  stmt.free();
  return orders;
};

module.exports = { getOrders, createOrder };
