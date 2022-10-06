INSERT INTO department (department_id, department_name)
VALUES
(1,'Engineering'),
(2,'Finance'),
(3,'Legal'),
(4,'Sales');

INSERT INTO role (role_id, title, department_id, salary)
VALUES
  (1,'Sales Lead', 4, 100000),
  (2,'Salesperson', 4, 8000),
  (3,'Lead Engineer', 1, 150000),
  (4,'Software Engineer', 1, 120000),
  (5,'Account Manager',  2, 160000),
  (6,'Accountant',  2, 125000),
  (7,'Legal Team Lead', 3, 250000),
  (8,'Lawyer',  3, 190000);

INSERT INTO employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES
(1,"Daniela", "Lopez", 5, NULL);
(2, "Alyssa", "Rodriguez", 8, Null),
(3,"Darby", "Lopez", 6, Null),
(4,"Robert", "Paragas", 7, NULL),
(5, "Tiffany", "Garcia", 4, Null),
(6,"Irene","Perez", 2, NULL),
(7,"Momo", "Martinez", 1, NULL),
(8,"Jean", "Black", 3, NULL);
(9,"Anna","Sanchez", 2, 1),
(10,"Joe","Smith", 8, 2),
(11,"Melissa","Barnes", 6, 3),
(12,"Robin","Zinc", 4, );