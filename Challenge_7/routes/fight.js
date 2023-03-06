const express = require('express');
const route = express.Router();
const AuthUser = require('../controllers/authController');
const passport = require('../lib/passport');
const restrict = require('../middleware/restrict');

route.get('/', restrict, AuthUser.userRenderFight);

route.post('/', AuthUser.userRenderFight);

module.exports = route;