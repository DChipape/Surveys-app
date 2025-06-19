const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const db = new sqlite3.Database('survey.db');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create table
db.run(`
  CREATE TABLE IF NOT EXISTS surveys (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    dob TEXT,
    contact TEXT,
    food TEXT,
    q1 TEXT,
    q2 TEXT,
    q3 TEXT,
    q4 TEXT
  )
`);


app.post('/submit-survey', (req, res) => {
  const { name, email, dob, contact, food, q1, q2, q3, q4 } = req.body;
  const foodVal = Array.isArray(food) ? food.join(', ') : (food || '');

  db.run(
    `INSERT INTO surveys (name, email, dob, contact, food, q1, q2, q3, q4)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [name, email, dob, contact, foodVal, q1, q2, q3, q4],
    function (err) {
      if (err) {
        console.error(err.message);
        res.status(500).send('Database insert failed.');
      } else {
        res.status(200).send('Success');
      }
    }
  );
});

app.get('/get-survey-results', (req, res) => {
  db.all('SELECT * FROM surveys', [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error retrieving data');
    } else {
      res.json(rows);
    }
  });
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});