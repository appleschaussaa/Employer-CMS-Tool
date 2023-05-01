// brings in dependencies and other files
const mysql = require("mysql2");
const { mainMenu } = require("./constructor.js");
require('dotenv').config();

// creating a connection to the database
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: process.env.DB_PASSWORD,
        database: "employeecms_db",
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    },
);

// if an error displays message or else runs mainMenu(db)
db.connect((err) => {
    if (err) throw err;
    console.log(`Connected to the employeecms_db database.`);
    mainMenu(db);
  });