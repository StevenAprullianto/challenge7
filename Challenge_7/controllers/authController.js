const {user_game} = require('../models');

require('dotenv').config();
const bcrypt = require('bcrypt');
const { use } = require('passport');
const jwt = require('jsonwebtoken');
const { token } = require('morgan');
const env = process.env;

class AuthUser{
    static userRenderRegister(req, res){
        res.render('register');
    }

    static async userRegister(req, res){
        try {
            const{username, password, isAdmin} = req.body;
            const salt = bcrypt.genSaltSync(parseInt(env.SALTROUND));
            const hash = bcrypt.hashSync(password, salt);

            const inputUser = {
                username,
                password: hash,
                isAdmin
            }

            // if(username == null || username == ""){
            //     alert("username must be filled");
            // }else if(password == null|| password == ""){
            //     alert("Password must be filled");
            // }else{
                
            // }

            const responseInputUser = await user_game.create(inputUser);

                //console.log(responseInputUser, "==> ini input user")
                // res.status(201).json({message: "Success Created"})
            res.redirect('/login');

        } catch (error) {
            console.log(error);
        }
    }

    static userRenderLogin(req, res){
        res.render('login');
    }

    static async userLogin(username, password){
        try {
            console.log('massuuuukkk');
            //const{username, password} = req.body;

            const userDatabase = await user_game.findOne({
                where:{
                    username
                }
            })

            //console.log(userDatabase, "===> userdatabe");

            if(!userDatabase){
                return Promise.reject("Username is not found")
            }else{
                const cekPassword = bcrypt.compareSync(password, userDatabase.password)
                if(cekPassword){
                    console.log("password benar");
                    return Promise.resolve(userDatabase)
                }else{
                    console.log("password salah");
                    return Promise.reject("Password is not found")
                }
            }

        } catch (error) {
            console.log(error);
        }
    }

    static whoAmI(req, res){
        //console.log(req.user.dataValues, "==> ini whoami");
        res.render('main', req.user.dataValues)
    }

    static game(req, res){
        //console.log(req.user.dataValues, "==> ini whoami");
        res.render('game', req.user.dataValues)
    }

    static generateToken(id, username){
        const payload = {
            id,
            username
        }

        const rahasia = 'Ini rahasia ga boleh disebar-sebar'
        const token = jwt.sign(payload, rahasia)
        console.log(token, "==> ini token");
        return token;
    }

    static verifyToken(req, res, next){
        console.log(req.headers, "==> masuuuuuk verify")
        const accessToken = req.headers["cookie"].split(" ")[0].replace('access-token=', '').replace(';', '')
        console.log(accessToken, "==> acess token");
        if(!accessToken) return res.status(400).json({error: "User not Authenticated"});
        

        try {
            
            const rahasia = 'Ini rahasia ga boleh disebar-sebar'
            const validToken = jwt.verify(accessToken, rahasia);
            console.log(validToken, "==> masuuuuuk verify")
            if(validToken){
                req.authenticated = true
                console.log(req.authenticated, "==> masuk if");
                return next()
            }
        } catch (error) {
            return res.status(400).json({error: error})
        }
    }

    static async userLoginJwt(username, password){
        try {
            const userDatabase = await user_game.findOne({
                where:{
                    username
                }
            })

            if(!userDatabase) return Promise.reject("Username is not found")

            const cekPassword = bcrypt.compareSync(password, userDatabase.password)

            if(!cekPassword) return Promise.reject("Password wrong")

            return Promise.resolve(userDatabase)
        } catch (error) {
            console.log(error);
        }
    }

    static async loginJwt(req, res){
        try {
            const{username, password} = req.body;
            const cekLoginJwt = await AuthUser.userLoginJwt(username, password)
            let idUser = cekLoginJwt.dataValues.id
            let usernameUser = cekLoginJwt.dataValues.username
            let generateTokenManipulate = AuthUser.generateToken(idUser, usernameUser)

            res.cookie('access-token', generateTokenManipulate, {
                maxAge: 60*60*24*30*1000
            })

            // console.log(req, "===> cookie")

            const verifyToken = AuthUser.verifyToken(req, res)
            console.log(verifyToken, "==> verifytokrn")

            res.status(200).redirect("/",{ verifyToken });

            //res.status(200).json({"access_token": generateTokenManipulate})
            
            // const rahasia = 'Ini rahasia ga boleh disebar-sebar'
            // let decode = jwt.verify(generateTokenManipulate, rahasia);
            // console.log(generateTokenManipulate, "===> tokennya")
            // console.log(decode, "===> setelah decode");
            // console.log(req.headers, "===> headers");


            // if(generateTokenManipulate){
            //     console.log("loginBerhasil");
            //     res.status(200).redirect('/')
            //     //.json({"access_token": generateTokenManipulate})
            // }else{
            //     console.log("loginGAGal");
            //     res.status(200).redirect('/login')
            // }
            
        } catch (error) {
            console.log(error);
            
        }  
    }

    static whoAmI2(req, res){
        // console.log(req, "==> masuuuuuk whoami2")
        // console.log(AuthUser.verifyToken(req, res), '==>verify');
        // const currentUser =  req.user;
        // res.status(200).render(AuthUser.verifyToken(req, res, "main"))
        // console.log(req, "==> ini authenticated")
        // console.log(req.cookie, "==> ini cookie");
        // console.log(req.payload, "==> ini payload");
        // res.status(200).render('main', req.payload)

        const verifyToken = AuthUser.verifyToken(req, res)
        console.log(verifyToken, "==> verifytokrn")

        res.status(200).render("/", { verifyToken });


    }

    static userRenderRoom(req, res){
        res.status(200).json("Ini romm");
    }

    static async userCreateRoom(req, res){
        try {
            const userDatabase = await user_game.findOne({
                where:{
                    id : req.id
                }
            })

            if(!userDatabase) return Promise.reject("user is not found")

            const cekLoginJwt = req.body
            let idUser = cekLoginJwt.dataValues.id
            let usernameUser = cekLoginJwt.dataValues.username
            let generateTokenManipulate = AuthUser.generateToken(idUser, usernameUser)

            res.cookie('access-token', generateTokenManipulate, {
                maxAge: 60*60*24*30*1000
            })

            res.status(200).json("created room berhasil")
        } catch (error) {
            console.log(error);
        }
    }

    static userRenderFight(req, res){
        res.status(200).json("Player suit");
    }

    static async userFight(req, res){
        try {
            const{player1, player2, skor1, skor2} = req.body;

            if((player1 === "batu" && player2 === "gunting") ||
                (player1 === "kertas" && player2 === "batu") ||
                (player1 === "gunting" && player2 === "kertas")){
                skor1 =+ 1;
            }else if (player1 === player2){

            }else{
                skor2 =+ 1;
            }

            const cekLoginJwt = req.body
            let idUser = cekLoginJwt.dataValues.id
            let usernameUser = cekLoginJwt.dataValues.username
            let generateTokenManipulate = AuthUser.generateToken(idUser, usernameUser)

            res.cookie('access-token', generateTokenManipulate, {
                maxAge: 60*60*24*30*1000
            })

            if(skor1 === 3){
                res.status(200).json("Player 1 WIN")
            }else{
                res.status(200).json("Player 2 WIN")
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = AuthUser;