// bringing in dependancies
const inquirer = require("inquirer");
const mysql = require("mysql2");
const consTable = require("console.table");
const mainMenu = require("./constructor.js");
require('dotenv').config();



// creating a connection to the database
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: process.env.DB_PASSWORD,
        database: "employeecms_db"
    },
    // what is shown to the client after connecting
);

db.connect(function(err) {
    if (err)
        console.log("could not connect");
    mainMenu
        console.log(`Connected to the employee_db database`)
});

// db.query(` select * from department`)




