const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// PostgreSQL connection pool
const pool = new Pool({
  user: 'rootabega',
  host: 'localhost',
  database: 'dbtest',
  password: 'myPassword',
  port: 5432,
});

// Route to get data from the database and display it
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('select * from tblMain;');
    const rows = result.rows;

    let html = '<div>';
    rows.forEach(row => {
      html += `<div>${JSON.stringify(row)}</div>`;
    });
    html += '</div>';

    res.send(html);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});



