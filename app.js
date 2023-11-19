const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./dbconfig'); 
const app = express();


const port=3000;

app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static('public'));


app.get('/', (req, res) => {
  let sortBy = req.query.sortBy || 'name';
  let searchTerm = req.query.search || '';

  let query = 'SELECT * FROM employees';

  if (searchTerm) {
    query += ` WHERE name LIKE '%${searchTerm}%'`;
  }

  query += ` ORDER BY ${sortBy}`;

  connection.query(query, (err, results) => {
    if (err) throw err;
    res.render('index', { employees: results, sortBy, searchTerm });
  });
});


app.get('/add', (req, res) => {
  res.render('add');
});


app.post('/add', (req, res) => {
  const { name, age, dob, salary, dept } = req.body;
  const employee = { name, age,salary, dept,dob };

  connection.query('INSERT INTO employees SET ?', employee, (err) => {
    if (err) throw err;
    res.redirect('/');
  });
});


app.get('/edit/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM employees WHERE id = ?', [id], (err, result) => {
    if (err) throw err;
    res.render('edit', { employee: result[0] });
  });
});


app.post('/edit/:id', (req, res) => {
  const { id } = req.params;
  const { name, age, dob, salary, dept } = req.body;
  const updatedEmployee = { name, age, salary, dept,dob };

  connection.query('UPDATE employees SET ? WHERE id = ?', [updatedEmployee, id], (err) => {
    if (err) throw err;
    res.redirect('/');
  });
});


app.get('/delete/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM employees WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.redirect('/');
  });
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
