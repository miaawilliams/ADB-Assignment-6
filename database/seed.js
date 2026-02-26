const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./database/university.db');

db.run (`INSERT INTO courses (id, courseCode, title, credits, description, semester)
    VALUES 
    (1, 'CS101', 'Intro Programming', 3, 'Learn Python basics', 'Fall 2024'),
    (2, 'BIO120', 'General Biology', 3, 'Introduction to biological principles', 'Fall 2024'),
    (3, 'MATH150', 'Calculus 1', 4, 'Basic calculus', 'Fall 2024'),
    (4, 'ENG101', 'Composition 1', 3, 'Academic writing and critical thinking', 'Spring 2025'),
    (5, 'ME210', 'Thermodynamics', 3, 'Principles of thermodynamics and heat transfer', 'Spring 2025'),
    (6, 'CS301', 'Database Systems', 3, 'Design and implementation of database systems', 'Fall 2024'),
    (7, 'PHYS201', 'Physics 2', 4, 'Electricity, magnetism, and modern physics', 'Spring 2025'),
    (8, 'CS201', 'Data Structures', 4, 'Study of fundamental data structures and algorithms', 'Spring 2025')
    
`);

console.log('Values successfully added');

db.all('SELECT * FROM courses', (err, rows) => {
    console.log(rows);
});