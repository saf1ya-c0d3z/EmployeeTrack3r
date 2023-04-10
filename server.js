const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable =require ("console.table");




const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  database: "employee_db",
});

function menu() {
  inquirer.prompt({
    type: 'list',
    name: "menu",
    message: 'What do you want to do?',
    choices: ['View Departments', 'View Roles', 'View Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Exit'],
  })
  .then((answer) => {
    console.log(answer);

    if (answer.menu === 'View Departments') {
      viewDpts();
    } else if (answer.menu === 'View Roles') {
      viewRoles();
    } else if (answer.menu === 'View Employees') {
      viewEmployees();
    } else if (answer.menu === 'Add Department') {
      addDpt();
    } else if (answer.menu === 'Add Role') {
      addRole();
    } else if (answer.menu === 'Add Employee') {
      addEmployee();
    } else if (answer.menu === 'Update Employee Role') {
      updateEmpRole();
    } else if (answer.menu === 'Exit') {
      connection.end();
    }
  });
}



function viewDpts() {
  connection.query(
    "SELECT * FROM `department`", 
    function (err, results) {
      if (err) throw err;
      console.log(results);
    }
  );
}

function viewRoles() {
  connection.query(
    "SELECT * FROM `role`",
    function (err, results) {
      if (err) {
        console.log(err);
        throw err;
      }
      console.log(results);
    }
  );
}

function viewEmployees() {
  connection.query(
    'SELECT * FROM employee',
    function (err, results) {
      if (err) throw err;
      console.log(results);
    }
  );
}  

    function addDpt() {
      inquirer.prompt({
        type: 'input',
        name: 'department',
        message: 'What is the name of the new department?',
      })
      .then((answer) => {
        console.log(answer);
    
        connection.query(
          'INSERT INTO department SET ?',
          { name: answer.department },
          function (err, results) {
            if (err) throw err;
            console.log('Department added successfully!');
            menu();
          }
        );
      });
    }

    function addRole() {
      inquirer.prompt({
        type: 'input',
        name: 'role',
        message: 'What is the name of the new role?',
      })
      .then((answer) => {
        console.log(answer);
    
        connection.query(
          'INSERT INTO role SET ?',
          { name: answer.role },
          function (err, results) {
            if (err) throw err;
            console.log('role added successfully!');
            menu();
          }
        );
      });
    }

    function addEmployee() {
      inquirer.prompt({
        type: 'input',
        name: 'employee',
        message: 'What is the name of the new employee?',
      })
      .then((answer) => {
        console.log(answer);
    
        connection.query(
          'INSERT INTO employee SET ?',
          { name: answer.employee },
          function (err, results) {
            if (err) throw err;
            console.log('employee added successfully!');
            menu();
          }
        );
      });
    }
                
    function updateEmpRole() {
  inquirer.prompt([
    {
      type: "input",
      name: "employeeId",
      message: "Enter the ID of the employee whose role you want to update: ",
    },
    {
      type: "input",
      name: "newRoleId",
      message: "Enter the ID of the new role: ",
    },
  ]).then((answer) => {
    connection.query(
      "UPDATE employee SET role_id = ? WHERE id = ?",
      [answer.newRoleId, answer.employeeId],
      function(err, results) {
        if (err) throw err;
        console.log(`Employee ${answer.employeeId} role updated to ${answer.newRoleId}`);
        menu();
      }
    );
  });
}

menu();



   

             