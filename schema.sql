DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name_tb VARCHAR(30)
);

CREATE TABLE role_tb (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title_tb VARCHAR(30) NOT NULL,
  salary_tb DECIMAL,
  department_id INT
);
CREATE TABLE employee_tb (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT
);

