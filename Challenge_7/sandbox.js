require('dotenv').config();
const bcrypt = require('bcrypt');
const env = process.env

const salt = bcrypt.genSaltSync(parseInt(env.SALTROUND));
const hash = bcrypt.hashSync("aaaaaaaaa", salt);

const comparePassword = bcrypt.compareSync("aaaaaaaaas", hash)

console.log(env.SALTROUND)