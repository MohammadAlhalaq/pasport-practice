const express = require('express');

const { logout, login, register, dashboard, postLogin, postRegister } = require('./users');

const { IsLogedIn, IsLogedOut} = require('../../config/auth');
const router = express.Router();

router.route('/login').get(IsLogedOut, login).post(IsLogedOut, postLogin);
router.route('/register').get(IsLogedOut, register).post(IsLogedOut, postRegister);

// for protected page
router.use(IsLogedIn)
router.get('/logout', logout);
router.get('/dashboard', dashboard);

module.exports = router;