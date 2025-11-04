// very small express server for my tracker (Day 2)
const express = require('express');
const fs = require('fs');
const path = require('path');
const { allHabits } = require('./views/db.js');
const app = express();
const PORT = 3000;
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
  const rows = allHabits(); 

  const listHtml = rows.map(r => {
    const iron = r.took_iron ? '✓' : '✗';
    const meat = r.ate_meat ? '✓' : '✗';
    return `<li>${r.day} — water ${r.water_ml || 0}ml, iron ${iron}, meat ${meat}, vitamin D ${r.vitamin_d_iu || 0} IU</li>`;
  }).join('');

  let body = fs.readFileSync(path.join(__dirname, 'views', 'habits.ejs'), 'utf8');
  body = body.replace('<!-- LIST -->', `<ul>${listHtml}</ul>`);

  res.render('layout', { title: 'Habits', body });
});

app.listen(PORT, () => {
  console.log(`server on http://localhost:${PORT}`);
});
