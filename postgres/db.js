const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'fitness',
  password: 'postgres'
})

const createCalories = `CREATE TABLE IF NOT EXISTS calories(
  _id SERIAL PRIMARY KEY,
  name VARCHAR (50) NOT NULL,
  calories INT NOT NULL,
  index INT NOT NULL,
  type VARCHAR (10) NOT NULL
);`

const createDays = `CREATE TABLE IF NOT EXISTS days(
  _id SERIAL PRIMARY KEY,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  user_id INT UNIQUE NOT NULL
);`

pool.query(queryString, (err, res) => {
  console.log(err, res)
  pool.end()
})