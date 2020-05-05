"use strict"

const router = require('express').Router()
const TaskController = require('../controllers/TaskController.js')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)

router.get('/', TaskController.read)
router.get('/:id', TaskController.findById)
router.post('/', TaskController.create)
router.put('/:id', authorization, TaskController.update)
router.delete('/:id', authorization, TaskController.delete)


module.exports = router;