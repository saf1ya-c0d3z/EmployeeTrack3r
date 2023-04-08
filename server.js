const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable =require ("console.table");
// const express = require ("express");



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

    if (answer === 'View Departments') {
      viewDpts();
    } else if (answer === 'View Roles') {
      viewRoles();
    } else if (answer === 'View Employees') {
      viewEmployees();
    } else if (answer === 'Add Department') {
      addDpt();
    } else if (answer === 'Add Role') {
      addRole();
    } else if (answer === 'Add Employee') {
      addEmployee();
    } else if (answer === 'Update Employee Role') {
      updateEmpRole();
    } else if (answer === 'Exit') {
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
          'INSERT INTO departments SET ?',
          { name: answer.name },
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
          'INSERT INTO roles SET ?',
          { name: answer.name },
          function (err, results) {
            if (err) throw err;
            console.log('role added successfully!');
            menu();
          }
        );
      });
    }
                
      
    //     function addRole() {
      
    //       connection.query(
    //               "SELECT * FROM `role`", function (err, results,) {
    //                 console.log(results);
    //               if error throw err }
    //       )}
      
    //       function addEmployee() {
      
    //         connection.query(
    //                 "SELECT * FROM `employee`", function (err, results,) {
    //                   console.log(results);
    //                 if error throw err }
    //         )}
           

    //         function updateEmpRole() {
      
    //           connection.query(
    //                   "SELECT * FROM `employee`", function (err, results,) {
    //                     console.log(results);
    //                   if error throw err }
    //           )}
             
               
            
      
  










// function dataBaseQ() {
// inquirer
//   .prompt([
//     {
//       type: "input",
//       name: "name",
//       message: "What is the department name?",
//     },
    
//     /* Pass your questions in here */
//   ])
//   .then((answers) => {
//     console.log(answers.name);
//     // execute will internally call prepare and query
//     connection.query(
//       "SELECT * FROM `department` WHERE `name` = ? AND `age` > ?",
//       ["Rick C-137", 53],
//       function (err, results, fields) {
//         console.log(results);
//         console.log(fields); 

//         
//       }
//     );
//     // Use user feedback for... whatever!!
//   })
//   .catch((error) => {
//     if (error.isTtyError) {
//      
//     } else {
//     
//     }
//   });

// }

// function roleTbQ() {
//   inquirer
//     .prompt([
//       {
//         type: "input",
//         name: "title",
//         message: "What is the job position?",
//       },
//       {
//         type: "input",
//         name: "salary",
//         message: "What is salary of this job?",
//       },
//       {
//         type: "input",
//         name: "departmentID",
//         message: "What is the department identification number?",
//       },
//       /* Pass your questions in here */
//     ])
//     .then((answers) => {
//       console.log(answers.name);
//       // execute will internally call prepare and query
//       connection.execute(
//         "SELECT * FROM `department` WHERE `name` = ? AND `age` > ?",
//         ["Rick C-137", 53],
//         function (err, results, fields) {
//           console.log(results); // results contains rows returned by server
//           console.log(fields); // fields contains extra meta data about results, if available
  
//           // If you execute same statement again, it will be picked from a LRU cache
//           // which will save query preparation time and give better performance
//         }
//       );
//       // Use user feedback for... whatever!!
//     })
//     .catch((error) => {
//       if (error.isTtyError) {
//         // Prompt couldn't be rendered in the current environment
//       } else {
//         // Something else went wrong
//       }
//     });
//   }
//   function employeeTbQ() {
//     inquirer
//       .prompt([
//         {
//           type: "input",
//           name: "firstName",
//           message: "What is the staff member's first name?",
//         },
//         {
//           type: "input",
//           name: "lastName",
//           message: "What is the staff member's last name?",
//         },
//         {
//           type: "input",
//           name: "departmentID",
//           message: "What is the department identification number?",
//         },
//         {
//           type: "input",
//           name: "managerID",
//           message: "What is the staff members name?",
//         },
//         /* Pass your questions in here */
//       ])
//       .then((answers) => {
//         console.log(answers.name);
//         // execute will internally call prepare and query
//         connection.execute(
//           "SELECT * FROM `department` WHERE `name` = ? AND `age` > ?",
//           ["Rick C-137", 53],
//           function (err, results, fields) {
//             console.log(results); // results contains rows returned by server
//             console.log(fields); // fields contains extra meta data about results, if available
    
//             // If you execute same statement again, it will be picked from a LRU cache
//             // which will save query preparation time and give better performance
//           }
//         );
//         // Use user feedback for... whatever!!
//       })
//       .catch((error) => {
//         if (error.isTtyError) {
//           // Prompt couldn't be rendered in the current environment
//         } else {
//           // Something else went wrong
//         }
//       });
//     }

menu();