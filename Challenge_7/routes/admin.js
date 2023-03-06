let express = require('express');
let router = express.Router();

let { user_game, user_biodata, user_history } = require('../models');

router.get('/', async (req, res) => {
    const result = await user_biodata.findAll({ raw: true })
    res.status(200).render("admin", { data: result });
})

router.post('/', async(req, res) =>{
    const{id, name, email, mobile, gender, dob} = req.body;
    const{method} = req.query;

    if(method === "PUT"){
        await user_biodata.update(
            {name, email, mobile, gender, dob},
            {where: {id: id}})
        res.redirect('/admin');
    }
})


router.post('/edit', async(req, res) =>{
    const{id} = req.query;
    // const result = await user_biodata.findAll({ raw: true })
    // const dataEdit = result.find(item => item.id === parseInt(id))

    const dataEdit = await user_biodata.findOne({where: {id:id},raw: true})
    const dataEditGame = await user_game.findOne({where: {id:id},raw: true})
    res.status(200).render('admin_edit', {dataEdit, dataEditGame})
})

router.post('/delete', async(req, res) =>{
    const{id} = req.query;
    await user_game.destroy({
        where:{id: id}
    })
    await user_biodata.destroy({
        where:{id: id}
    })
    await user_history.destroy({
        where:{id: id}
    })
    res.status(200).redirect('/admin')
})

module.exports = router;