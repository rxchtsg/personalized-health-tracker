// simple sqlite helper for habits tracking
const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

// absolute paths 
const ROOT = path.join(__dirname, '..');        // .../backend
const DATA_DIR = path.join(ROOT, 'data');       // .../backend/data
const DB_PATH  = path.join(DATA_DIR, 'journal.db'); // .../backend/data/journal.db

fs.mkdirSync(DATA_DIR, { recursive: true });
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

if (!fs.existsSync(DB_PATH)) {
  fs.closeSync(fs.openSync(DB_PATH, 'a'));
}

const db = new Database(DB_PATH);
db.exec(`
  CREATE TABLE IF NOT EXISTS habits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    day TEXT NOT NULL,
    water_ml INTEGER DEFAULT 0,
    took_iron INTEGER DEFAULT 0,
    ate_meat INTEGER DEFAULT 0,
    vitamin_d_iu INTEGER DEFAULT 0
  );
`);
function allHabits() {
  return db.prepare('SELECT * FROM habits ORDER BY id DESC').all();
}

function getHabit(id) {
  return db.prepare('SELECT * FROM habits WHERE id = ?').get(id);
}
function addHabit(data) {
  const stmt = db.prepare(`
    INSERT INTO habits (day, water_ml, took_iron, ate_meat, vitamin_d_iu)
    VALUES (@day, @water_ml, @took_iron, @ate_meat, @vitamin_d_iu)
  `);
  return stmt.run(data);
}
function deleteHabit(id) {
  const stmt = db.prepare('DELETE FROM habits WHERE id = ?');
  return stmt.run(id);
}
function updateHabit(id, data) {
  const stmt = db.prepare(`
    UPDATE habits
    SET day = @day,
        water_ml = @water_ml,
        took_iron = @took_iron,
        ate_meat = @ate_meat,
        vitamin_d_iu = @vitamin_d_iu
    WHERE id = ?
  `);
  return stmt.run(data, id);
}
module.exports = { allHabits, getHabit, addHabit, deleteHabit, updateHabit };