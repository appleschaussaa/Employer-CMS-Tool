INSERT INTO department (id, department_name)
-- departments listed at 8 seconds in mock up video
VALUES  (1, "Engineering"), 
        (2, "Finance"), 
        (3, "Legal"), 
        (4, "Sales");

INSERT INTO role (title, salary, department_id)
-- roles listed at 14 seconda in mock up video
-- salaries based off Zippia.com averages for Washington
VALUES  ("Sales Lead", 48579, 4), 
        ("Salesperson", 42010, 4), 
        ("Lead Engineer", 84927, 1), 
        ("Software Engineer", 100260, 1), 
        ("Account Manager", 68535, 2), 
        ("Acountant", 54890, 2), 
        ("Legal Team Lead", 87135, 3), 
        ("Lawyer", 115808, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- creating an employee for each role
VALUES  ("Jenny", "Smith", 1, NULL),
        ("David", "Mitchel", 2, 1),
        ("Shannon", "Boyd", 3, NULL),
        ("Erik", "Steele", 4, 3),
        ("Kelly", "Hamilton", 5, NULL),
        ("Rene", "Sanchez", 6, 5),
        ("Joey", "Stillian", 7, NULL),
        ("Danielle", "Bella", 8, 7);
