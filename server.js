const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 4000;

app.use(express.json());

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

const db = new sqlite3.Database('./database/university.db');






app.get('/api/courses', (req, res) => {
    db.all('SELECT * FROM courses', (err, rows) => {
        res.json(rows);
    });
});

app.get('/api/courses/:id', (req, res) => {
    const id = req.params.id;
    db.all('SELECT * FROM courses WHERE id = ?', [id], (err, rows) => {
        res.json(rows);
    });
});

app.post('/api/courses', (req, res) => {
    const { id, courseCode, title, credits, description, semester } = req.body;
    db.run(`
        INSERT INTO courses (id, courseCode, title, credits, description, semester)
        VALUES (?, ?, ?, ?, ?, ?)`,
    [id, courseCode, title, credits, description, semester],
        function(err) {
            res.json({ id: this.lastID });
        }
    );
});

app.put('/api/courses/:id', (req, res) => {
    const id = req.params.id;
    const { courseCode, title, credits, description, semester } = req.body;
    db.run(` UPDATE courses SET id = ?, courseCode = ?, title = ?, credits = ?, description = ?, semester = ?`,
        [id, courseCode, title, credits, description, semester],
        function(err) {
            res.json({ message: 'Course updated'});
        }
    );
});

app.delete('/api/corses/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM courses WHERE id = ?', [id],
        function(err) {
            if (err) {
                return res.status(500).json({error: err.message})
            }

            res.json({ message: 'Course deleted successfully'});
        }
    );
});

