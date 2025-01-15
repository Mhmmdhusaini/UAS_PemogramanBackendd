// Import mysql
const mysql = require("mysql");

// Import dotenv and run the config method
require("dotenv").config();

// Destructure process.env variables
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

/**
 * Create a database connection using createConnection method
 * Method accepts an object with host, user, password, and database properties
 */
const db = mysql.createConnection({
  host: DB_HOST,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});

/**
 * Connect to the database using the connect method
 * Accepts a callback function
 */
db.connect((err) => {
  if (err) {
    console.log("Error connecting: " + err.stack);
    return;
  } else {
    console.log("Connected to database");
    return;
  }
});

module.exports = db;
