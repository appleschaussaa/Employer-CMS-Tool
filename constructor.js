const inquirer = require("inquirer");
const consTable = require("console.table");

const mainMenu = (db) => {
    // creates a prompt with choices for the user
    inquirer
        .prompt({
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
            ],
        })
        // This takes the users answer above to run through a switch statement
        .then((answer) => {
            // Either queries * from a table or runs a function
            switch (answer.menuSelection) {
                case "View All Employees":
                    db.promise()
                        .query("SELECT * FROM employee")
                        .then(() => {
                            viewEmployees(db);
                        })
                        .catch((err) => {
                            console.log(err);
                            mainMenu(db);
                        });
                    break;
                case "Add Employee":
                    newEmployee(db);
                    break;
                case "Update Employee Role":
                    updateRole(db);
                    break;
                case "View All Roles":
                    db.promise()
                        .query("SELECT * FROM role")
                        .then(([rows]) => {
                            // allows for the results to be shown in table form
                            console.table(rows);
                            mainMenu(db);
                        })
                        .catch((err) => {
                            console.log(err);
                            mainMenu(db);
                        });
                    break;
                case "Add Role":
                    newRole(db);
                    break;
                case "View All Departments":
                    db.promise()
                        .query("SELECT * FROM department")
                        .then(([rows]) => {
                            console.table(rows);
                            mainMenu(db);
                        })
                        .catch((err) => {
                            console.log(err);
                            mainMenu(db);
                        });
                    break;
                case "Add Department":
                    addDepartment(db);
                    break;
                case "Quit":
                    quitConnection(db);
                    break;
            }
        })
        // if there is an error run mainMenu(db) to go back to main screen
        .catch((err) => {
            console.log(err);
            mainMenu(db);
        });
};

// start of the functions for running sql queries based off the users answers
const viewEmployees = function (db) {
    const sql = `SELECT employee.id, 
        employee.first_name, 
        employee.last_name, 
        role.title,
        role.salary,
        department.department_name AS department,
        CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name
        FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee manager ON employee.manager_id = manager.id`;
    db.promise()
        .query(sql)
        .then(([rows]) => {
            console.table(rows);
            mainMenu(db);
        })
        .catch((err) => {
            console.log(err);
            mainMenu(db);
        });
};

function newEmployee(db) {
    // The function starts by calling the promise method on the db object,
    // which returns a Promise-based version of the connection object
    db.promise()
        .query("SELECT * FROM role")
        .then(([rows]) => {
            return db.promise().query("SELECT * FROM employee");
        })
        .then(([rows]) => {
            // This maps the data retrieved from the db to an array of manager choices
            const managerChoices = rows.map((row) => ({
                name: `${row.first_name} ${row.last_name}`,
                value: row.id,
            }));
            managerChoices.unshift({ name: "None", value: null });
            return inquirer.prompt([
                {
                    type: "input",
                    name: "firstName",
                    message: "What is the employee's first name?",
                    validate: (input) => {
                        if (input.trim().length === 0) {
                            return "Please enter a valid name.";
                        }
                        return true;
                    },
                },
                {
                    type: "input",
                    name: "lastName",
                    message: "What is the employee's last name?",
                    validate: (input) => {
                        if (input.trim().length === 0) {
                            return "Please enter a valid name.";
                        }
                        return true;
                    },
                },
                {
                    type: "list",
                    name: "roleId",
                    message: "What is the employee's role?",
                    choices: () =>
                        db.promise()
                            .query("SELECT * FROM role")
                            .then(([roles]) =>
                                roles.map((role) => ({
                                    name: role.title,
                                    value: role.id,
                                }))
                            ),
                    validate: (input) => {
                        if (input.trim().length === 0) {
                            return "Please enter a valid role.";
                        }
                        return true;
                    },
                },
                {
                    type: "list",
                    name: "managerId",
                    message: "Who is the employee's manager?",
                    choices: managerChoices,
                    validate: (input) => {
                        if (input.trim().length === 0) {
                            return "Please enter a valid manager.";
                        }
                        return true;
                    },
                },
            ]);
        })
        .then((answers) => {
            db.promise()
                // This adds a new employee to the database and then inserts a new row into the employee table, with the first name, last name, role ID, and manager ID of the new employee.
                .query("INSERT INTO employee SET ?", {
                    first_name: answers.firstName,
                    last_name: answers.lastName,
                    role_id: answers.roleId,
                    manager_id: answers.managerId,
                })
                .then(() => {
                    console.log("Employee added successfully!");
                    mainMenu(db);
                })
                .catch((err) => {
                    console.log(err);
                    mainMenu(db);
                });
        })
        .catch((err) => {
            console.log(err);
            mainMenu(db);
        });
};

function updateRole(db) {
    // First, get a list of all employees from the database
    db.promise()
        .query("SELECT * FROM employee")
        .then(([employees]) => {
            // Prompt the user to select the employee to update
            inquirer
                .prompt([
                    {
                        type: "list",
                        name: "employeeId",
                        message:
                            "Which employee's role would you like to update?",
                        choices: employees.map((employee) => ({
                            name: `${employee.first_name} ${employee.last_name}`,
                            value: employee.id,
                        })),
                    },
                    // Prompt the user to select the new role for the employee
                    {
                        type: "list",
                        name: "roleId",
                        message: "Which role would you like to assign?",
                        choices: () =>
                            db.promise()
                                .query("SELECT * FROM role")
                                .then(([roles]) =>
                                    roles.map((role) => ({
                                        name: role.title,
                                        value: role.id,
                                    }))
                                ),
                    },
                ])
                .then(({ employeeId, roleId }) => {
                    // Update the employee's role in the database
                    db.promise()
                        .query("UPDATE employee SET role_id = ? WHERE id = ?", [
                            roleId,
                            employeeId,
                        ])
                        .then(() => {
                            console.log(
                                "Employee's role has been updated successfully!"
                            );
                            mainMenu(db);
                        })
                        .catch((err) => {
                            console.log(err);
                            mainMenu(db);
                        });
                });
        })
        .catch((err) => {
            console.log(err);
            mainMenu(db);
        });
};

function newRole(db) {
    inquirer
        .prompt([
            {
                name: "title",
                type: "input",
                message: "What is the title of the new role?",
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary of the new role?",
            },
            {
                name: "department_id",
                type: "input",
                message: "What is the department ID of the new role?",
            },
        ])
        .then((answer) => {
            const { title, salary, department_id } = answer;
            db.promise()
                .execute(
                    "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
                    [title, salary, department_id]
                )
                .then(() => {
                    console.log(`New role '${title}' added successfully!`);
                    mainMenu(db);
                })
                .catch((err) => {
                    console.log(err);
                    mainMenu(db);
                });
        });
};

function addDepartment(db) {
    inquirer
        .prompt({
            type: "input",
            name: "departmentName",
            message: "What is the name of the new department?",
            validate: (input) => {
                if (input.trim().length === 0) {
                    return "Please enter a valid name.";
                }
                return true;
            },
        })
        .then((answer) => {
            db.promise()
                .query(
                    "INSERT INTO department (department_name) VALUES (?)",
                    answer.departmentName
                )
                .then(() => {
                    console.log(
                        `${answer.departmentName} department has been added.`
                    );
                    mainMenu(db);
                })
                .catch((err) => {
                    console.log(err);
                    mainMenu(db);
                });
        })
        .catch((err) => {
            console.log(err);
            mainMenu(db);
        });
};

// read that a exit was the reason it would not keep prompt open in node
function quitConnection(db) {
    inquirer
        .prompt({
            name: "exit",
            type: "confirm",
            message: "Are you sure you want to exit?",
        })
        .then(function (answer) {
            if (answer.exit == true) {
                db.end();
            } else {
                mainMenu(db);
            }
        })
        .catch((err) => {
            console.log(err);
            mainMenu(db);
        });
};

module.exports = { mainMenu };
