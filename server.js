const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  database: "employee_db",
});

function menu() {
  inquirer
    .prompt({
      type: "list",
      name: "menu",
      message: "What do you want to do?",
      choices: [
        "View Departments",
        "View Roles",
        "View Employees",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Update Employee Role",
        "Exit",
      ],
    })
    .then((answer) => {
      console.log(answer);

      if (answer.menu === "View Departments") {
        viewDpts();
      } else if (answer.menu === "View Roles") {
        viewRoles();
      } else if (answer.menu === "View Employees") {
        viewEmployees();
      } else if (answer.menu === "Add Department") {
        addDpt();
      } else if (answer.menu === "Add Role") {
        addRole();
      } else if (answer.menu === "Add Employee") {
        addEmployee();
      } else if (answer.menu === "Update Employee Role") {
        updateEmpRole();
      } else if (answer.menu === "Exit") {
        connection.end();
      }
    });
}

function viewDpts() {
  connection.query("SELECT * FROM `department`", function (err, results) {
    if (err) throw err;
    console.table(results);
    menu();
  });
}

function viewRoles() {
  connection.query(
    "SELECT role.id, title, salary, department.name AS department FROM role, department WHERE role.department_id = department.id",
    function (err, results) {
      if (err) {
        console.log(err);
        throw err;
      }
      console.table(results);
      menu();
    }
  );
}

function viewEmployees() {
  connection.query(
    `SELECT employee.id, employee.first_name AS employee_first_name, employee.last_name AS employee_last_name, role.title, role.salary, department.name, manager.first_name AS manager_first_name, manager.last_name AS manager_last_name 
    FROM employee 
    LEFT JOIN role ON employee.role_id = role.id 
    LEFT JOIN department on role.department_id= department.id
    LEFT JOIN employee manager on employee.manager_id = manager.id 
    `,
    function (err, results) {
      if (err) throw err;
      console.table(results);
      menu();
    }
  );
}

function addDpt() {
  inquirer
    .prompt({
      type: "input",
      name: "department",
      message: "What is the name of the new department?",
    })
    .then((answer) => {
      console.log(answer);

      connection.query(
        "INSERT INTO department SET ?",
        { name: answer.department },
        function (err, results) {
          if (err) throw err;
          console.log("Department added successfully!");
          menu();
        }
      );
    });
}
function getAllDpts() {
  return new Promise(function (resolve, reject) {
    return connection.query(
      "SELECT * FROM `department`",
      function (err, results) {
        if (err) reject(err);
        console.log(results);
        resolve(results);
      }
    );
  });
}

function addRole() {
  getAllDpts().then((rows) => {
    const department_choices = rows.map((item) => {
      return {
        name: item.name,
        value: item.id,
      };
    });
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the name of the new role?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary of the new role?",
        },
        {
          type: "list",
          name: "department_id",
          message: "What is the department of the new role?",
          choices: department_choices,
        },
      ])

      .then((answer) => {
        console.log(answer);

        connection.query(
          "INSERT INTO role SET ?",
          {
            title: answer.title,
            salary: answer.salary,
            department_id: answer.department_id,
          },
          function (err, results) {
            if (err) throw err;
            console.log("role name added successfully!");
            menu();
          }
        );
      });
  });
}

function getAllManagers() {
  return new Promise(function (resolve, reject) {
    return connection.query(
      "SELECT * FROM `employee`",
      function (err, results) {
        if (err) reject(err);
        console.log(results);
        resolve(results);
      }
    );
  });
}

function getAllRoles() {
  return new Promise(function (resolve, reject) {
    return connection.query("SELECT * FROM `role`", function (err, results) {
      if (err) reject(err);
      console.log(results);
      resolve(results);
    });
  });
}

function addEmployee() {

  getAllManagers().then((rows) => {
    const manager_choices = rows.map((item) => {
      return {
        name: item.first_name + " " + item.last_name,
        value: item.id,
      };
    });
    manager_choices.push({ name: "none", value: null });
    getAllRoles().then((rows) => {
      const role_choices = rows.map((item) => {
        return {
          name: item.title,
          value: item.id,
        };
      });
      inquirer
        .prompt([
          {
            type: "input",
            name: "first_name",
            message: "What is the first name of the new employee?",
          },
          {
            type: "input",
            name: "last_name",
            message: "What is the last name of the new employee?",
          },
          {
            type: "list",
            name: "role_id",
            message: "What is the role of the new employee?",
            choices: role_choices,
          },
          {
            type: "list",
            name: "manager_id",
            message: "Who is the manager of the new employee?",
            choices: manager_choices,
          },
        ])
        .then((answer) => {
          console.log(answer);

          connection.query(
            "INSERT INTO employee SET ?",
            {
              first_name: answer.first_name,
              last_name: answer.last_name,
              role_id: answer.role_id,
              manager_id: answer.manager_id,
            },

            function (err, results) {
              if (err) throw err;
              console.log("employee added successfully!");
              menu();
            }
          );
        });
    });
  });

}

function getAllEmployees() {
  return new Promise(function (resolve, reject) {
    return connection.query("SELECT * FROM `employee`", function (err, results) {
      if (err) reject(err);
      console.log(results);
      resolve(results);
    });
  });
}

function updateEmpRole() {


  getAllEmployees().then((rows) => {
    const employee_choices = rows.map((item) => {
      return {
        name: item.first_name + " " + item.last_name,
        value: item.id,
      };
    });
    employee_choices.push({ name: "none", value: null });
    getAllRoles().then((rows) => {
      const row_choices = rows.map((item) => {
        return {
          name: item.title,
          value: item.id,
        };
      });
  
  

   inquirer
    .prompt([
      {
        type: "list",
        name: "employee_id",
        message: "Enter the name of the employee you want to update:",
        choices: employee_choices,
      },
    ])
    .then((answer) => {
      console.log(answer.employee_id)
      // const employeeName = answer.employeeName.split(" ");
      // const firstName = employeeName[0];
      // const lastName = employeeName[1];

      connection.query(
        `SELECT * FROM employee`,
        function (err, results) {
          if (err) throw err;
          if (results.length === 0) {
            console.log("Employee not found.");
            menu();
            return;
          }

          const employee = results[0];
          console.log(`Current role: ${employee.title}`);

          getAllRoles().then((rows) => {
            const role_choices = rows.map((item) => {
              return {
                name: item.title,
                value: item.id,
              };
            });

            inquirer
              .prompt([
                {
                  type: "list",
                  name: "newRoleId",
                  message: "Select the new role:",
                  choices: role_choices,
                },
              ])
              .then((answer) => {
                connection.query(
                  "UPDATE employee SET ? WHERE ?",
                  [
                    {
                      role_id: answer.newRoleId,
                    },
                    {
                      id: employee.id,
                    },
                  ],
                  function (err, results) {
                    if (err) throw err;
                    console.log("Employee role updated successfully!");
                    menu();
                  }
                );
              });
          });
        }
      );
    });
  });
});
}


menu();
