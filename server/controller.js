const pg = require('./postgres/db.js');

const controller = {
  postDay: (req, res) => {
    let {id, date} = req.body
    console.log(id, date)
    let query = `INSERT INTO days (user_id, date) VALUES (${id}, '${date}')`
    pg.query(query)
      .then(() => console.log('added day'))
      .catch(e => console.log(e))
    res.send()
  }
}

module.exports = controller