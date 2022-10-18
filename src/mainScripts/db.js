const sqlite3 = require("sqlite3").verbose();

// Database will be created automatically if it doesn't exist.
const connectToDatabase = () => {
  let db = new sqlite3.Database("./store.db", (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the database.");
  });

  return db;
};

// Close database connection
const closeDatabase = (database) => {
  database.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Close database connection.");
  });
};

// This is run everytime the app starts
const initializeDatabase = (database) => {
  const sql = `CREATE TABLE IF NOT EXISTS food(
      id INTEGER PRIMARY KEY,
      name varchar(255) NOT NULL,
      description TEXT,
      type varchar(255),
      price REAL NOT NULL,
      image BYTE,
      quantity BIGINT
    )`;
  database.run(sql, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
  closeDatabase(database);
};

module.exports = {
  connectToDatabase,
  initializeDatabase,
  closeDatabase,
};
