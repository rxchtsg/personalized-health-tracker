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
module.exports = {
  allHabits,
  getHabit
};
