USE company_DB;

INSERT INTO
    department (name)
VALUES
    ("Product Development"),
    ("Manufacturing"),
    ("Quality Assurance");

INSERT INTO
    role(title, salary, department_id)
VALUES
    ("Senior Developer", 100000, 1),
    ("Systems Engineer", 80000, 1),
    ("Intern", 50, 1),
    ("Mfg. Supervisor", 120000, 2),
    ("Machine Operator", 55000, 2),
    ("Final Inspector", 100000, 3),
    ("Quality Inspector", 65000, 3);

INSERT INTO
	employee (first_name, last_name, role_id)
VALUES
    ("Ronan", "Harris", 1),
    ("Bill", "Leeb", 4),
    ("Daniel", "Myer", 6);

INSERT INTO
	employee (first_name, last_name, role_id, manager_id)
VALUES
	("Brian", "Hernandez", 3, 1),
    ("Andy", "LaPlegua", 7, 2),
    ("Shane", "Englefield", 5, 2),
    ("Vasi", "Vallis", 2, 3);
