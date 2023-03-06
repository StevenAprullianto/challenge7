const express = require('express');
const app = express();
const session = require('express-session');
const flash = require('express-flash');

require('dotenv').config();
const env = process.env;

const passport = require('./lib/passport')
const restrict = require('./middleware/restrict')
const login = require('./routes/login');
const register = require('./routes/register');
const room = require('./routes/room')
const fight = require('./routes/fight')
const AuthUser = require('./controllers/authController');
const cookieParser = require('cookie-parser');
const verifyToken = AuthUser.verifyToken;


app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(express.json())
app.use(cookieParser())


app.use(session({
    secret: 'Buat ini jadi rahasia',
    resave: false,
    saveUninitialized: false,
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.get('/',restrict, AuthUser.whoAmI2)

// app.get('/', verifyToken, (req, res) => {
//     res.status(200).render("main");
// })

app.get('/failed-login', (req, res) => {
    res.status(200).send("GAGAl LOGIN");
})

app.get('/game', AuthUser.game);

app.use('/login',(login))

app.use('/register',(register))

app.use('/room', {room})

app.use('/fight', {fight})

app.listen(env.PORT, () => {
    console.log("Port: ", env.PORT);
});