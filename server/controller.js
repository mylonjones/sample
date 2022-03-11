const pg = require('./postgres/db.js')

async function setCalories(calories, day_id) {
  let code = 200
  let query = `DELETE FROM calories WHERE day_id = ${day_id}`
  await pg.query(query)
    .then(() => {
      let query = `INSERT INTO calories (day_id, name, calories, index, type) VALUES `

      for(let set of calories) {
        query += `(${day_id}, '${set.name}', ${set.cal}, ${set.index}, '${set.type}'),`
      }
      query = query.slice(0, query.length - 1)

      pg.query(query)
        .then(() => console.log('submited calories'))
        .catch(e => {
          console.log('error in calorie insert', e)
          code = 404
        })
    })
    .catch(e => {
      console.log('error in calorie delete by day id', e)
      code = 404
    })

  return code
}

const controller = {
  postDay: (req, res) => {
    let { id, date, calories } = req.body

    pg.query(`SELECT _id FROM days WHERE date = '${ date }' AND user_id = ${ id }`)
      .then(async function(result) {
        let _id = result.rows[0]
        if(_id) {
          let code = await setCalories(calories, _id._id)
          res.status(code).end()
        } else {
          pg.query(`INSERT INTO days (user_id, date) VALUES (${ id }, '${ date }') RETURNING _id`)
            .then(async function(result) {
              let _id = result.rows[0]._id
              let code = await setCalories(calories, _id)
              res.status(code).end()
            })
            .catch(e => res.status(404).end())
        }
      })
      .catch(e => res.status(404).end())
  },
  getDays: (req, res) => {
    let { user_id } = req.params
    pg.query(`SELECT date, name, calories, type FROM days, calories WHERE days.user_id = ${ user_id } AND days._id=calories.day_id`)
      .then((result) => {
        let sets = result.rows

        let days = []

        let j = 0
        for(let i = 0; i < sets.length; i++) {
          let { date, name, calories, type } = sets[i]
          if(days[j] === undefined) {
            days.push({
              date,
              sets: []
            })
          } else if(days[j].date.getTime() !== date.getTime()) {
            j++
            i--
            continue
          }
          days[j].sets.push({name, calories, type})
        }

        res.status(200).send(days)
      })
      .catch(e => res.status(404).end())
  }
}

module.exports = controller