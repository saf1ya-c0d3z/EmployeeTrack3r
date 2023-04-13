 USE employee_db;
 
 
 SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name, manager.first_name, manager.last_name 
 FROM employee 
 LEFT JOIN role ON employee.role_id = role.id 
 LEFT JOIN department on role.department_id= department.id
 LEFT JOIN employee manager on employee.manager_id = manager.id 
 ;
 