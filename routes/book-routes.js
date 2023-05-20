const express = require('express')

const bookController = require('../controllers/book-controller')
const router = express.Router()

router.route('/')
  .post(bookController.create)

router.route('/:_id')
  .get(bookController.detail)
  .put(bookController.update)
  .delete(bookController.delete)


module.exports = router;