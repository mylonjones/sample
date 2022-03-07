
const express = require('express')
const app = express()
const port = 4000
const db = require('./postgres/db.js')
// const path = require('path')
const bodyParser = require('body-parser')
const router = require('./router.js')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// app.use('/', express.static(path.join(__dirname, '../public')))
app.use('/api', router)

app.listen(port, () => {
  console.log('serving app at port ' + port)
})