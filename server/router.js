const router = require('express').Router();
const controller = require('./controller.js')

router
  .route('/days')
  .post(controller.postDay)

router
  .route('/days/:user_id')
  .get(controller.getDays)

module.exports = router