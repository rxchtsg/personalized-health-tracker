const { Pool } = require('pg');
require('dotenv').config();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
function allHabits() {
  const sql = 'SELECT * FROM habits ORDER BY id DESC';
  return pool.query(sql).then(result => result.rows);
}
function getHabit(id) {
  const sql = 'SELECT * FROM habits WHERE id = $1';
  return pool.query(sql, [id]).then(result => result.rows[0]);
}
function addHabit(data) {
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
function deleteHabit(id) {
  const sql = 'DELETE FROM habits WHERE id = $1';
  return pool.query(sql, [id]);
}
module.exports = {
  allHabits,
  getHabit
};
