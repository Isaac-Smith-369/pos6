const initSqlJs = require("sql.js");
const fs = require("fs");
const path = require("path");

// Database path
const databasebPath = "../../canteen.sqlite";

// Check if database file exists, if not create a new one
const FindOrCreateDbFile = (dbPath) => {
  const filePath = path.join(__dirname, dbPath);
  // console.log(filePath);
  if (fs.existsSync(filePath)) {
    const fileBuffer = fs.readFileSync(filePath);
    return fileBuffer;
  }
  fs.writeFileSync(filePath, "");
  const fileBuffer = fs.readFileSync(filePath);
  return fileBuffer;
};

// Connect to database
const connectToDb = async () => {
  const dbFileBuffer = FindOrCreateDbFile(databasebPath);
  const SQL = await initSqlJs();
  return new SQL.Database(dbFileBuffer);
};

// Write db to disk
const writeDbSync = (database) => {
  const data = database.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(path.join(__dirname, databasebPath), buffer);
  database.close();
};

// Initialize database
const initializeDb = (database) => {
  const sql = `CREATE TABLE IF NOT EXISTS food(
    id INTEGER PRIMARY KEY,
    name varchar(255) NOT NULL,
    description TEXT,
    type varchar(255),
    price REAL NOT NULL,
    image BYTE,
    quantity BIGINT
  ); \
  CREATE TABLE IF NOT EXISTS users(
    name varchar(255) PRIMARY KEY,
    username varchar(255) NOT NULL,
    password TEXT NOT NULL
  )`;
  database.run(sql);
  console.log("Running migration");
  writeDbSync(database);
};

module.exports = {
  connectToDb,
  initializeDb,
  writeDbSync,
};
