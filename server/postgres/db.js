const { Pool, Client } = require('pg')

// const client = new Client({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'fitness',
//   password: 'postgres'
// })

// client.connect()

// const createUsers = `CREATE TABLE IF NOT EXISTS users (
//   _id SERIAL PRIMARY KEY,
//   user_name VARCHAR (20) NOT NULL
// )`

// const createDays = `CREATE TABLE IF NOT EXISTS days(
//   _id SERIAL PRIMARY KEY,
//   user_id INT REFERENCES users (_id),
//   date TIMESTAMP NOT NULL
// )`

// const createCalories = `CREATE TABLE IF NOT EXISTS calories (
//   _id SERIAL PRIMARY KEY,
//   day_id INT REFERENCES days (_id),
//   name VARCHAR (50) NOT NULL,
//   calories INT NOT NULL,
//   index INT NOT NULL,
//   type VARCHAR (10) NOT NULL
// )`

// const deleteCalories = `DROP TABLE IF EXISTS calories`
// const deleteDays = `DROP TABLE IF EXISTS days`
// const deleteUsers = `DROP TABLE IF EXISTS users`

// client.query(deleteCalories)
//   .then(() => console.log('deleted calories'))
//   .catch(e => console.log(e))
// client.query(deleteDays)
//   .then(() => console.log('deleted days'))
//   .catch(e => console.log(e))
// client.query(deleteUsers)
//   .then(() => console.log('deleted users'))
//   .catch(e => console.log(e))
// client.query(createUsers)
//   .then(() => console.log('created users'))
//   .catch(e => console.log(e))
// client.query(createDays)
//   .then(() => console.log('created days'))
//   .catch(e => console.log(e))
// client.query(createCalories)
//   .then(() => console.log('created calories'))
//   .catch(e => console.log(e))

// client.query(`INSERT INTO users (user_name) VALUES ('mylon')`)
//   .then(() => console.log('created user mylon'))
//   .catch(e => console.log(e))
//   .then(() => {
//     client.end()
//   })

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'fitness',
  password: 'postgres'
})

module.exports = pool