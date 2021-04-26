DROP DATABASE IF EXISTS company_DB;

CREATE DATABASE company_DB;
USE company_DB;

CREATE TABLE department(
	id INT AUTO_INCREMENT NOT NULL,
	name VARCHAR(50),
	PRIMARY KEY(id)
);

CREATE TABLE role(
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(50),
    salary INTEGER,
    department_id INTEGER,
    PRIMARY KEY(id),
    FOREIGN KEY(department_id) REFERENCES department(id)
);

CREATE TABLE employee(
	id INT AUTO_INCREMENT NOT NULL,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
    role_id INT,
    manager_id INT,
	PRIMARY KEY(id),
	FOREIGN KEY(role_id) REFERENCES role(id),
    FOREIGN KEY(manager_id) REFERENCES employee(id)
);