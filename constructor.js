const inquirer = require("inquirer");
const consTable = require("console.table");
// might need to turn this into index and switch the current index to just a connection.js that exported into this.

const mainMenu = () => {
    inquirer.prompt({
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
    .then(function(answer) {
        switch(answer.menuSelection) {
            case "View All Employees":
                // not the right display, just a placeholder. Same with below
                display(db.employee);
                break;
            // need to create functions to add to the tables
            case "Add Employee":
                newEmployee();
                break;
            case "Update Employee Role":
                updateRole();
                break;
            case "View All Roles":
                display(db.role);
                break;
            case "Add Role":
                newRole();
                break;
            case "View All Departments":
                display(db.department);
                break;
            case "Add Department":
                newDepartment();
                break;
            case "Quit":
                // figure out/remind myself how to end Mysql connection
                quitConnection();
                break;
        }
    })
};

function newEmployee() {
    consTable(employee.newEmployee)
};

function updateRole() {
    consTable(role.updateRole)
};

function newRole() {
    consTable(role.newRole)
};

function newDepartment() {
    consTable(department.newDepartment)
};

function quitConnection() {
    conection.end()
};

module.exports = mainMenu
