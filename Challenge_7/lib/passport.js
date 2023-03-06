const passport = require('passport')
const localStrategy = require('passport-local')
const {Strategy: JwtStrategy, ExtractJwt} = require('passport-jwt')
const AuthUser =  require('../controllers/authController')
const userLogin = AuthUser.userLogin
const{user_game} = require('../models')
const userLoginJwt  = AuthUser.userLoginJwt 


//==========================================LOCAL STRATEGY============================================================
// async function authenticate(username, password, done){
//     try {
//         console.log('passport terpanggil');
//         const user = await userLogin(username, password)
//         return done(null, user)
//     } catch (error) {
//         return done(null, false, {message: error.message})
//     }
// }

// passport.use(
//     new localStrategy({ usernameField: 'username', passwordField: 'password' }, authenticate)
// )

// passport.serializeUser(
//     (user, done) => done(null, user.dataValues.id)
// )
// passport.deserializeUser(
//     async (id, done) => done(null, await user_game.findByPk(id))
// )
//======================================================================================================================

//==========================================JWT STRATEGY================================================================
const options = {
    // Untuk mengekstrak JWT dari request, dan mengambil token-nya dari header yang bernama Authorization
    jwtFromRequest : ExtractJwt .fromHeader ('authorization' ),
    /* Harus sama seperti dengan apa yang kita masukkan sebagai parameter kedua dari jwt.sign di User Model.
    Inilah yang kita pakai untuk memverifikasi apakah tokennya dibuat oleh sistem kita */
    secretOrKey : 'Ini rahasia ga boleh disebar-sebar' ,
}

passport .use(new JwtStrategy (options, async (payload, done) => {
    // payload adalah hasil terjemahan JWT, sesuai dengan apa yang kita masukkan di parameter pertama dari jwt.sign
    user_game.findByPk (payload.id)
    .then(user => done(null, user))
    .catch(err => done(err, false))
}))
//======================================================================================================================

module.exports = passport;