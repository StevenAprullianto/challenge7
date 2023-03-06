const express = require('express');
const route = express.Router();
const AuthUser = require('../controllers/authController');
const passport = require('../lib/passport');
const restrict = require('../middleware/restrict');

route.get('/', AuthUser.userRenderLogin);
// route.post('/', passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/failed-login',
//     failureFlash: true
// }))

route.post('/', AuthUser.loginJwt);
// route.get('/', restrict, AuthUser.whoAmI2);
// route.post('/', passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/failed-login',
//     failureFlash: true
// }))

module.exports = route;