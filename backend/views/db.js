// simple sqlite helper for habits tracking
const path = require('path');
const Database = require('better-sqlite3');

const DB_PATH = path.join(__dirname, 'data', 'journal.db');
const db = new Database(DB_PATH);

// fetch all rows
function allHabits() {
  return db.prepare(`SELECT * FROM habits ORDER BY id DESC`).all();
}

// find single row
function getHabit(id) {
  return db.prepare(`SELECT * FROM habits WHERE id = ?`).get(id);
}

// create new row
function createHabit({ day, water_ml, took_iron, ate_meat, vitamin_d_iu }) {
  return db.prepare(`
    INSERT INTO habits (day, water_ml, took_iron, ate_meat, vitamin_d_iu)
    VALUES (?, ?, ?, ?, ?)
  `).run(day, water_ml, took_iron, ate_meat, vitamin_d_iu);
}

// update existing row
function updateHabit(id, { day, water_ml, took_iron, ate_meat, vitamin_d_iu }) {
  return db.prepare(`
    UPDATE habits
    SET day = ?, water_ml = ?, took_iron = ?, ate_meat = ?, vitamin_d_iu = ?
    WHERE id = ?
  `).run(day, water_ml, took_iron, ate_meat, vitamin_d_iu, id);
}

// delete row
function deleteHabit(id) {
  return db.prepare(`DELETE FROM habits WHERE id = ?`).run(id);
}

module.exports = { allHabits, getHabit, createHabit, updateHabit, deleteHabit };
