-- Create the Gender ENUM type
CREATE TYPE gender_type AS ENUM ('Male', 'Female');


-- ==========================
-- DEPARTMENTS TABLE
-- ==========================
CREATE TABLE departments (
    department_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL
);


-- ==========================
-- PROGRAMMES TABLE
-- ==========================
CREATE TABLE programmes (
    programme_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    programme_name VARCHAR(100) NOT NULL,
    department_id INT NOT NULL,

    FOREIGN KEY (department_id)
        REFERENCES departments(department_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


-- ==========================
-- LEVELS TABLE
-- ==========================
CREATE TABLE levels (
    level_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    level_name VARCHAR(20) NOT NULL
);


-- ==========================
-- STUDENTS TABLE
-- ==========================
CREATE TABLE students (

    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    student_id VARCHAR(20) UNIQUE NOT NULL,

    first_name VARCHAR(50) NOT NULL,

    last_name VARCHAR(50) NOT NULL,

    gender gender_type NOT NULL,

    date_of_birth DATE NOT NULL,

    telephone VARCHAR(15),

    email VARCHAR(100) UNIQUE,

    address VARCHAR(255),

    department_id INT,

    programme_id INT,

    level_id INT,

    username VARCHAR(50) UNIQUE,

    password VARCHAR(255) NOT NULL,

    FOREIGN KEY (department_id)
        REFERENCES departments(department_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,

    FOREIGN KEY (programme_id)
        REFERENCES programmes(programme_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,

    FOREIGN KEY (level_id)
        REFERENCES levels(level_id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);


-- ==========================
-- INSERT DEPARTMENTS
-- ==========================
INSERT INTO departments (department_name)
VALUES
('Computer Science'),
('Information Technology'),
('Business Administration');


-- ==========================
-- INSERT PROGRAMMES
-- ==========================
INSERT INTO programmes (programme_name, department_id)
VALUES
('BSc Computer Science', 1),
('BSc Information Technology', 2),
('BBA Accounting', 3);


-- ==========================
-- INSERT LEVELS
-- ==========================
INSERT INTO levels (level_name)
VALUES
('100'),
('200'),
('300'),
('400');