// bringing in dependancies
const inquirer = require("inquirer");
const mysql = require("mysql2");
const consTable = require("console.table");

// creating a connection to the database
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        // using placeholder for password until I settle on a module to hide it
        password: "placeholder",
        database: "employee_db"
    },
    // what is shown to the client after connecting
    console.log(`Connected to the employee_db database`)
);




