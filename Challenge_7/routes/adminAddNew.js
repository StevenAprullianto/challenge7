let express = require('express');
let router = express.Router();

let { user_game, user_biodata, user_history } = require('../models')

let userGameId

const addUserGame = async (username, password) => {
    let result;
    try{
        result = await user_game.create({
        username: username,
        password: password
        })

    }catch(err){
        console.error(err)
    }
    
}

const addUserBiodata= async(name, email, mobile, gender, dob) => { //, userGameId
    let result;
    try{
        result = await user_biodata.create({
        name: name,
        email: email,
        mobile: mobile,
        gender: gender,
        dob: dob
        //,user_game_id: userGameId
        })
    }catch(err){
        console.error(err)
    }
}

const addUserHistory= async() => { //userGameId
    let result;
    try{
        result = await user_history.create({
        score:0,
        login_time: new Date()
        //,user_game_id: userGameId
        })
    }catch(err){
        console.error(err)
    }
    console.log(result.dataValues)
}

router.get('/', (req, res) => {
    res.status(200).render("admin_add_new");
})

router.post('/', (req, res) => {
    const {username, password, name, email, mobile, gender, dob} = req.body
    addUserGame(username, password);
    addUserBiodata(name, email, mobile, gender, dob); //, userGameId
    addUserHistory(); //userGameId
    res.status(200).redirect("admin");
})

module.exports = router;