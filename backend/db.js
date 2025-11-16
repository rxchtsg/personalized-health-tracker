const { Pool } = require('pg');
require('dotenv').config();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
async function allHabits() {
  const sql = 'SELECT * FROM habits ORDER BY id DESC';
  return pool.query(sql).then(result => result.rows);
}
async function getHabit(id) {
  const sql = 'SELECT * FROM habits WHERE id = $1';
  return pool.query(sql, [id]).then(result => result.rows[0]);
}
async function addHabit(data) {
  const sql = `
    INSERT INTO habits (day, water_ml, vitamin_d, took_iron, ate_meat)
    VALUES ($1, $2, $3, $4, $5)
  `;
  const values = [
    data.day,
    data.water_ml,
    data.vitamin_d,
    data.took_iron,
    data.ate_meat
  ];
  return pool.query(sql, values);
}
async function deleteHabit(id) {
  const sql = 'DELETE FROM habits WHERE id = $1';
  return pool.query(sql, [id]);
}
async function updateHabit(id, data) {
  const sql = `
    UPDATE habits
    SET day = $1, water_ml = $2, vitamin_d = $3, took_iron = $4, ate_meat = $5
    WHERE id = $6
  `;
  const values = [
    data.day,
    data.water_ml,
    data.vitamin_d,
    data.took_iron,
    data.ate_meat,
    id
  ];
  return pool.query(sql, values);
}
module.exports = {
  allHabits,
  getHabit,
  addHabit,
  deleteHabit,
  updateHabit,
};
