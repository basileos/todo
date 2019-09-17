const express = require('express');
const router = express.Router();
const authController = require('./../controllers/auth');
const checkAuthorization = require('./../middleware/auth');
const getUser = require('../middleware/getUser');

router.post('/login', authController.login);
router.get('/logout', checkAuthorization, getUser, authController.logout);

module.exports = router;
