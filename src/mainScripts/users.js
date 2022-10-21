const { writeDbSync } = require("./db");

const logUserIn = (database, user) => {
  const sql = `SELECT name FROM users WHERE username = ? AND password = ?`;
  let currentUser = null;
  const stmt = database.prepare(sql);
  stmt.bind(Object.values(user));
  while (stmt.step()) {
    currentUser = stmt.getAsObject();
  }
  stmt.free();
  return currentUser;
};

// Insert a single food item into the database
const createNewUser = (database, userData) => {
  const sql = `INSERT INTO users(
      name,
      username,
      password
    )
    VALUES(?, ?, ?)`;
  try {
    database.run(sql, Object.values(userData));
    writeDbSync(database);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { createNewUser, logUserIn };
