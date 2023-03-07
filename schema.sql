DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30)
);

CREATE TABLE role_tb (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title_tb VARCHAR(30) NOT NULL,
  salary_tb DECIMAL,
  department_id INT,
  FOREIGN KEY (department)
  REFERENCES department(id)
  ON DELETE SET NULL
);
CREATE TABLE employee_tb (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  FOREIGN KEY (book_price)
  REFERENCES book_prices(id)
  ON DELETE SET NULL
);

