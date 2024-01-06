CREATE DATABASE database_01_manhhuy;

CREATE TABLE IF NOT EXISTS courses (
	id INT NOT NULL,
	name VARCHAR(50) NOT NULL,
	price FLOAT,
	detail TEXT,
	teacher_id INT NOT NULL,
	active INT,
	created_at TIMESTAMP WITH TIME ZONE,
	updated_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE courses 
RENAME COLUMN detail to content;

ALTER TABLE courses 
ALTER COLUMN content 
SET NOT NULL;

CREATE TABLE IF NOT EXISTS teachers (
	id INT NOT NULL,
	name VARCHAR(50) NOT NULL,
	bio TEXT,
	created_at TIMESTAMP WITH TIME ZONE,
	updated_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE courses
ADD CONSTRAINT courses_id_primary 
PRIMARY KEY (id);

ALTER TABLE teachers
ADD CONSTRAINT teachers_id_primary 
PRIMARY KEY (id);

ALTER TABLE courses
ADD CONSTRAINT courses_teacher_id_foreign
FOREIGN KEY (teacher_id) REFERENCES teachers(id);

INSERT INTO teachers(id, name, bio, created_at, updated_at)
VALUES (1, 'Ta Hoang An', 'This is bio 1', NOW(), NOW());

INSERT INTO teachers(id, name, bio, created_at, updated_at)
VALUES (2, 'Dang Ngoc Son', 'This is bio 2', NOW(), NOW());

INSERT INTO teachers(id, name, bio, created_at, updated_at)
VALUES (3, 'Tran Cong Luc', 'This is bio 3', NOW(), NOW());

INSERT INTO courses(id, name, price, content, teacher_id, active, created_at, updated_at)
VALUES (1, 'Javascript', 1000, 'This is JS pro courses', 1, 1, NOW(), NOW());

INSERT INTO courses(id, name, price, content, teacher_id, active, created_at, updated_at)
VALUES (2, 'PHP', 2000, 'This is PHP pro courses', 1, 1, NOW(), NOW());

INSERT INTO courses(id, name, price, content, teacher_id, active, created_at, updated_at)
VALUES (3, 'Laravel', 3000, 'This is Laravel pro courses', 1, 1, NOW(), NOW());

INSERT INTO courses(id, name, price, content, teacher_id, active, created_at, updated_at)
VALUES (4, 'HTML&CSS', 4000, 'This is HTML&CSS pro courses', 2, 1, NOW(), NOW());

INSERT INTO courses(id, name, price, content, teacher_id, active, created_at, updated_at)
VALUES (5, 'ReactJS', 5000, 'This is ReactJS pro courses', 2, 1, NOW(), NOW());

INSERT INTO courses(id, name, price, content, teacher_id, active, created_at, updated_at)
VALUES (6, 'NodeJS', 6000, 'This is NodeJS pro courses', 2, 1, NOW(), NOW());

INSERT INTO courses(id, name, price, content, teacher_id, active, created_at, updated_at)
VALUES (7, 'NextJS', 7000, 'This is NextJS pro courses', 3, 1, NOW(), NOW());

INSERT INTO courses(id, name, price, content, teacher_id, active, created_at, updated_at)
VALUES (8, 'SASS', 8000, 'This is SASS pro courses', 3, 1, NOW(), NOW());

INSERT INTO courses(id, name, price, content, teacher_id, active, created_at, updated_at)
VALUES (9, 'VueJS', 9000, 'This is VueJS pro courses', 3, 1, NOW(), NOW());

ALTER TABLE courses
ADD CONSTRAINT courses_name_and_price_unique UNIQUE (name, price);

UPDATE courses
SET name='New Javascript', price=1100, updated_at=NOW()
WHERE id = 1;

UPDATE courses
SET name='New PHP', price=2200, updated_at=NOW()
WHERE id = 2;

UPDATE courses
SET name='New Laravel', price=3300, updated_at=NOW()
WHERE id = 3;

UPDATE courses
SET name='New HTML&CSS', price=4400, updated_at=NOW()
WHERE id = 4;

UPDATE courses
SET name='New ReactJS', price=5500, updated_at=NOW()
WHERE id = 5;

UPDATE courses
SET name='New NodeJS', price=6600, updated_at=NOW()
WHERE id = 6;

UPDATE courses
SET name='New NextJS', price=7700, updated_at=NOW()
WHERE id = 7;

UPDATE courses
SET name='New SASS', price=8800, updated_at=NOW()
WHERE id = 8;

UPDATE courses
SET name='New VueJS', price=9900, updated_at=NOW()
WHERE id = 9;

ALTER TABLE teachers
ADD CONSTRAINT teachers_bio_unique UNIQUE (bio);

UPDATE teachers
SET bio='This is new bio 1', updated_at=NOW()
WHERE id = 1;

UPDATE teachers
SET bio='This is new bio 2', updated_at=NOW()
WHERE id = 2;

UPDATE teachers
SET bio='This is new bio 3', updated_at=NOW()
WHERE id = 3;

SELECT * FROM teachers;
SELECT * FROM courses;




