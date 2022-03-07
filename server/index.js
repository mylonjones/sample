
const express = require('express')
const app = express()
const port = 4000
const db = require('../postgres/db.js')
// const path = require('path')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
// app.use('/', express.static(path.join(__dirname, '../public')));

app.listen(port, () => {
  console.log('serving app at port ' + port)
})