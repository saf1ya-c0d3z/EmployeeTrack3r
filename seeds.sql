
USE employee_db;

INSERT INTO department (name_tb)
VALUES ('HR'),
       ('Outreach'),
       ('Case Management'),
       ('Counseling'),
       ('Management');
     
INSERT INTO role_tb (title, salary, department_id)
VALUES ('Human Recourses Specialist', 40,000, 8),
       ("School Outreach Specialist", 44,000, 9),
       ("Case Manager", 52,000, 9),
       ("Youth Counselor", 42,000, 9),
       ("Finacial Advisor", 54,000, 8),
       ("General Manager", 52,000, 8),
       ;

INSERT INTO employee_tb (first_name, last_name, role_id, manager_id)
VALUES ("Mallory","Wright", 1,""),
       ("Huckleberry" , "Finn", 2,""),
       ("Biggie", "Smalls", 3, 1),
       ("Jordan", "Cooper", 4, ""),
       ("Rachel", "Newton", 5, ""),
       ("Bridget", "Fitz", 6, 2),
      ;

