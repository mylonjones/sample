const router = require('express').Router();
const controller = require('./controller.js')

router
  .route('/days')
  .post(controller.postDay)

module.exports = router