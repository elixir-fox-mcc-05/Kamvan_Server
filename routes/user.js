"use strict";
const router = require('express').Router();
const UserController = require('../controller/usercontroller');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/google-login', UserController.googleLogin);

module.exports = router;