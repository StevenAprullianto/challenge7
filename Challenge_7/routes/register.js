const express = require('express');
const route = express.Router();
const AuthUser = require('../controllers/authController');

route.get('/', AuthUser.userRenderRegister);
route.post('/', AuthUser.userRegister);

module.exports = route;