
USE employee_db;

INSERT INTO department (name)
VALUES ('HR'),
       ('Outreach'),
       ('Case Management'),
       ('Counseling'),
       ('Management');
     
INSERT INTO role (title, salary, department_id)
VALUES ('Human Recourses Specialist', 4000, 8),
       ("School Outreach Specialist", 4000, 9),
       ("Case Manager", 5000, 9),
       ("Youth Counselor", 4000, 9),
       ("Finacial Advisor", 5000, 8),
       ("General Manager", 5000, 8)
       ;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mallory","Wright", 1, null),
       ("Huckleberry" , "Finn", 2, null),
       ("Biggie", "Smalls", 3, 1),
       ("Jordan", "Cooper", 4, 2),
       ("Rachel", "Newton", 5, 1),
       ("Bridget", "Fitz", 6, 2)
      ;

