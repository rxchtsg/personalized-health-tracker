// very small express server for my tracker (Day 2)
const express = require('express');
const fs = require('fs');
const path = require('path');
const { allHabits } = require('./views/db.js');
const app = express();
const PORT = 3000;
const Database = require('better-sqlite3');
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
const DB_PATH = path.join(__dirname, 'data', 'journal.db');
const db = new Database(DB_PATH);
db.exec(`
  CREATE TABLE IF NOT EXISTS habits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    day TEXT NOT NULL,              -- e.g. "2025-10-27"
    water_ml INTEGER DEFAULT 0,     -- hydration
    took_iron INTEGER DEFAULT 0,    -- 0/1
    ate_meat INTEGER DEFAULT 0,      -- 0/1
    vitamin_d_iu INTEGER DEFAULT 0  -- Vitamin D supplement in IU
  );
`);
// views + static
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// home: just a tiny page for now
app.get('/', (req, res) => {
    const body = fs.readFileSync(path.join(__dirname, 'views', 'home.ejs'), 'utf8');
    res.render('layout', { title: 'Home', body });
});
 // GET /habits — tiny placeholder page
app.get('/habits', (req, res) => {
  try {
    const rows = allHabits();           // <-- comes from views/db.js
    const listHtml = rows.map(r => {
      const iron = r.took_iron ? '✓' : '✗';
      const meat = r.ate_meat ? '✓' : '✗';
      return `<li>${r.day} — water ${r.water_ml || 0}ml, iron ${iron}, meat ${meat}, vitamin D ${r.vitamin_d_iu || 0} IU</li>`;
    }).join('');

    let body = fs.readFileSync(path.join(__dirname, 'views', 'habits.ejs'), 'utf8');
    body = body.replace('<!-- LIST -->', `<ul>${listHtml}</ul>`);
    res.render('layout', { title: 'Habits', body });
  } catch (e) {
    console.error('ERROR in /habits:', e);
    res.status(500).send('Server error. Check terminal logs.');
  }
});
app.get('/seed', (req, res) => {
  const stmt = db.prepare(`INSERT INTO habits (day, water_ml, took_iron, ate_meat, vitamin_d_iu)
                           VALUES (date('now'), 1200, 1, 0, 1000)`);
  stmt.run();
  res.redirect('/habits');
});
app.listen(PORT, () => {
  console.log(`server on http://localhost:${PORT}`);
});


  