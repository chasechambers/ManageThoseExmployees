
// Import and require mysql2
const mysql = require('mysql2');
const viewAllDepartments = 'SELECT * FROM department;';
const Employee = require('./employee')
const inquirer = require('inquirer');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password
    password: 'password1234',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

// Query database
db.query(viewAllDepartments, function (err, results) {
 
});

const employee1 = new Employee();


// VIEW FUNCTIONS

// Returns employee ID
const employeeViewAll = () => { db.query(employee1.getEmployeeInfoQuery(), function (err, results) {
  console.table(results);
  showTables();
});
};

const databaseViewAll = () => {
  db.query('SELECT * FROM department;', function (err, results) {
    console.table(results);
    showTables();
  });
};

const roleViewAll = () => {
  db.query(`SELECT
  role.title,
  role.salary,
  role.id,
  department_name
  FROM role
  JOIN department ON role.department_id = department.id;`, function (err, results) {
    console.table(results);
    showTables();
  });
};

// ADD TO TABLE FUNCTIONS

const addDepartment = () => {
  addDepartmentQuery();
}

// INQUIRER FUNCTIONS/PROMPTS

const showTables = () => {
inquirer
  .prompt([
    {
      name: "database_election",
      type: "list",
      message: "What do you want to do?",
      choices: ["View All Departments", "View All Roles", "View All Employees", "Add a New Department", "Add a New Role", "Add a New Employee", "Update Employee Role"],
    },
  ])
  .then((answer) => {
    if (answer.database_election === 'View All Departments') {
        databaseViewAll();
        
    } else if (answer.database_election === 'View All Roles') {
        roleViewAll();
        // showTables();
    } else if (answer.database_election === 'View All Employees') {
        employeeViewAll();
        // showTables();
    } else if (answer.database_election === 'Add a New Department') {
        addDepartmentPrompt();
        // showTables();
    } else if (answer.database_election === 'Add a New Employee') {
        addEmployeePrompt();
        // showTables();
    } else if (answer.database_election === 'Add a New Role') {
        addRolePrompt();
        // showTables();
    } else if (answer.database_election === 'Update Employee Role') {
        updateEmployeeRole();
    }
    });
  };
    
const addDepartmentPrompt = () => {
  inquirer.prompt([
    {
      name: "add_department",
      type: "input",
      message: "What is the name of the department you want to add?"
    },
  ])
  .then((answer) => {

    db.query(`INSERT INTO department (department_name)
    VALUES ('${answer.add_department}');`, function (err, results) 
    {
      console.log(`${answer.add_department} has been added!`);
    });
  });
};

const addRolePrompt = () => {
  inquirer.prompt([
    {
      name: "add_role_name",
      type: "input",
      message: "What is the name of the role you want to add?"
    },
    {
      name: "role_salary",
      type: "input",
      message: "What is the salary of the role?"
    },
    {
      name: "department_id",
      type: "input",
      message: "What is the id of the department this role is in?"
    },
  ])
  .then((answer) => {

    db.query(`INSERT INTO role (title, salary, department_id)
    VALUES ('${answer.add_role_name}', ${answer.role_salary}, ${answer.department_id});`, function (err, results) 
    {
      console.log(`${answer.add_role_name} has been added!`);
    });
  });
};


const addEmployeePrompt = () => {
  inquirer.prompt([
    {
      name: "employee_first_name",
      type: "input",
      message: "What is the first name of the employee?"
    },
    {
      name: "employee_last_name",
      type: "input",
      message: "What is the last name of the employee?"
    },
    {
      name: "employee_role",
      type: "input",
      message: "What is the role id of the employee?"
    },
    {
      name: "employee_manager_id",
      type: "input",
      message: "What is the id number of the manager?"
    },
  ])
  .then((answer) => {

    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES ('${answer.employee_first_name}', '${answer.employee_last_name}', ${answer.employee_role}, ${answer.employee_manager_id});`, function (err, results) 
    {
      console.log(`${answer.employee_first_name} ${answer.employee_last_name} has been added!`);
      showTables();
    });
  });
};

const updateEmployeeRole = () => {
  inquirer.prompt([
    {
      name: "employee_id",
      type: "input",
      message: "What is the id of the employee you want to update?"
    },
    {
      name: "employee_role",
      type: "input",
      message: "What is the id of the new role for the employee?"
    },
  ])
  .then((answer) => {

    db.query(`UPDATE employee SET role_id = '${answer.employee_role}' WHERE id = ${answer.employee_id};`, function (err, results) 
    {
      console.log(`Employee role has been updated!`);
      showTables();
    });
  });
};

// RUN CODE

showTables();