// very small express server for my tracker (Day 2)
const express = require('express');
const fs = require('fs');
const path = require('path');
const { allHabits, addHabit } = require('./views/db.js');
const app = express();
const PORT = 3000;

// views + static
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// --- Routes ---

// home: just a tiny page for now
app.get('/', (req, res) => {
    const body = fs.readFileSync(path.join(__dirname, 'views', 'home.ejs'), 'utf8');
    res.render('layout', { title: 'Home', body });
});

// GET /habits — show all habits
app.get('/habits', (req, res) => {
  const rows = allHabits(); 

  const listHtml = rows.map(r => {
    const iron = r.took_iron ? '✓' : '✗';
    const meat = r.ate_meat ? '✓' : '✗';
    return `<li>${r.day} — water ${r.water_ml || 0}ml, iron ${iron}, meat ${meat}, vitamin D ${r.vitamin_d_iu || 0} IU</li>`;
  }).join('');

  let body = fs.readFileSync(path.join(__dirname, 'views', 'habits.ejs'), 'utf8');
  body = body.replace('', `<ul>${listHtml}</ul>`);

  res.render('layout', { title: 'Habits', body });
});

// POST /habits — save a new habit
app.post('/habits', (req, res) => {
  // req.body has the form data
  console.log('Got a form submission:', req.body); 

  const data = {
    day: req.body.day,
    water_ml: Number(req.body.water_ml) || 0,
    vitamin_d_iu: Number(req.body.vitamin_d_iu) || 0,
    // Convert checkbox "on" to 1, or 0 if missing
    took_iron: req.body.took_iron === 'on' ? 1 : 0,
    ate_meat: req.body.ate_meat === 'on' ? 1 : 0
  };
  
  addHabit(data);
  res.redirect('/habits'); // Go back to the habits page
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`server on http://localhost:${PORT}`);
});