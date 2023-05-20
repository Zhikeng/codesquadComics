const express = require('express')

const adminController = require('../controllers/admin-controller')
const router = express.Router()

router.route('/')
.get(adminController.admin)

router.route('/create-book')
.get(adminController.create)

router.route('/update-book/:_id')
.get(adminController.update)

module.exports = router;