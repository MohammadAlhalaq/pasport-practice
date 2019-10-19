const express = require('express');

const { login, register, dashboard, postLogin, postRegister } = require('./users');

const router = express.Router();

router.route('/login').get(login).post(postLogin);
router.route('/register').get(register).post(postRegister);
router.get('/dashboard', dashboard);

module.exports = router;