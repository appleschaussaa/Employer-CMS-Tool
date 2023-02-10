const inquirer = require("inquirer");
const mysql = require("mysql2");
const consTable = require("console.table");
const db = require("./index");
// might need to turn this into index and switch the current index to just a connection.js that exported into this.

const mainMenu = () => {
    inquirer.prompt(
        {
        type: "list",
        name: "menuSelection",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "Add Employee",
            "Update Employee Role",
            "View All Roles",
            "Add Role",
            "View All Departments",
            "Add Department",
            "Quit",
        ] 
    })
    .then(function(response) {
        switch(response.menuSelection) {
            case "View All Employees":
                // display("employee", " EMPLOYEES ");
                // display(employeecms_db.employee);
                db.query("SELECT * FROM employee", function (err, response) {
                    if (err) throw err;
                    console.log(response)
                })
                // viewEmployees();
                break;
            case "Add Employee":
                newEmployee();
                break;
            case "Update Employee Role":
                updateRole();
                break;
            case "View All Roles":
                db.query(`SELECT * FROM role `)
                break;
            case "Add Role":
                newRole();
                break;
            case "View All Departments":
                db.query(`SELECT * FROM department `)
                break;
            case "Add Department":
                newDepartment();
                break;
            case "Quit":

                quitConnection();
                break;
        }
        // return
    })
};

// const viewEmployees = () => {
//     let sql =       `SELECT employee.id, 
//                     employee.first_name, 
//                     employee.last_name, 
//                     employee.role_id, 
//                     employee.manager_id
//                     FROM employee`;
//     db.promise().query(sql, (err, response) => {
//       if (err) throw err;
//         console.table(response);
//         console.log("here are the employees")
//         mainMenu();
//     });
//   };

// placeholders for actual code
function newEmployee() {
    db.query(``)
    consTable(employee.newEmployee)
};

function updateRole() {
    db.query(``)
    consTable(role.updateRole)
};

function newRole() {
    db.query(``)
    consTable(role.newRole)
};

function newDepartment() {
    db.query(``)
    consTable(department.newDepartment)
};

// read that a exit was the reason it would not keep prompt open in node
function quitConnection() {
    inquirer.prompt({
      name: "exit",
      type: "confirm",
      message: "Are you sure you want to exit?",
    })
    .then(function (response) {
      if (response.quitConnection == true) {
        connection.end();
      }
      else {
        mainMenu();
      }
    });
}

module.exports = mainMenu;