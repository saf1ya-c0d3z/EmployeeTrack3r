const mysql = require("mysql2");
const inquirer = require("inquirer");
// create the connection to database
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  database: "employee_db",
});
// how do we get node to interact with mysql
// how do we get the user to interact with node


function dataBaseQ() {
inquirer
  .prompt([
    {
      type: "input",
      name: "name",
      message: "What is the staff members name?",
    },
    /* Pass your questions in here */
  ])
  .then((answers) => {
    console.log(answers.name);
    // execute will internally call prepare and query
    connection.execute(
      "SELECT * FROM `department` WHERE `name` = ? AND `age` > ?",
      ["Rick C-137", 53],
      function (err, results, fields) {
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available

        // If you execute same statement again, it will be picked from a LRU cache
        // which will save query preparation time and give better performance
      }
    );
    // Use user feedback for... whatever!!
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });

}

function roleTbQ() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the staff members name?",
      },
      /* Pass your questions in here */
    ])
    .then((answers) => {
      console.log(answers.name);
      // execute will internally call prepare and query
      connection.execute(
        "SELECT * FROM `department` WHERE `name` = ? AND `age` > ?",
        ["Rick C-137", 53],
        function (err, results, fields) {
          console.log(results); // results contains rows returned by server
          console.log(fields); // fields contains extra meta data about results, if available
  
          // If you execute same statement again, it will be picked from a LRU cache
          // which will save query preparation time and give better performance
        }
      );
      // Use user feedback for... whatever!!
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
  }
  function employeeTbQ() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "What is the staff members name?",
        },
        /* Pass your questions in here */
      ])
      .then((answers) => {
        console.log(answers.name);
        // execute will internally call prepare and query
        connection.execute(
          "SELECT * FROM `department` WHERE `name` = ? AND `age` > ?",
          ["Rick C-137", 53],
          function (err, results, fields) {
            console.log(results); // results contains rows returned by server
            console.log(fields); // fields contains extra meta data about results, if available
    
            // If you execute same statement again, it will be picked from a LRU cache
            // which will save query preparation time and give better performance
          }
        );
        // Use user feedback for... whatever!!
      })
      .catch((error) => {
        if (error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
        } else {
          // Something else went wrong
        }
      });
    }