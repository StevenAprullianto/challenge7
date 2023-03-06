const express = require('express');
const app = express();
const fs = require('fs')

const gameRouter = require('./routes/game');
const adminRouter = require('./routes/admin');
const adminAddNewRouter = require('./routes/adminAddNew');

const usersJson = require('./users.json');

const fileName = 'users.json';
const userRead = fs.readFileSync(fileName);

const userObj = JSON.parse(userRead);
let updatedJson;

let id;
let userName;
let login;

//app.set('views', '../views') //ini perlui jika file js ada di routes, kalo pake nodemon ga perlu keknya 
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

function editJsonFile(userObj, index, value){
    userObj.users[index].login = value;
    updatedJson = JSON.stringify(userObj);
    fs.writeFile(
        fileName,
        updatedJson,
        function (err) {
            if (err) {
                return console.error(err);
            }
        }
    );
}

//Login
app.post('/', (req, res) =>{
    userName = "";
    try {
        const{username, password} = req.body;
        for (let index = 0; index <= usersJson.users.length; index++) {
                if(usersJson.users[index].username === username && usersJson.users[index].password === password){
                    userName = usersJson.users[index].username;
                    editJsonFile(userObj, index, 'y');
                    login = usersJson.users[index].login = "y";
                    id = index;
                    res.status(200).redirect('/main/'+userName) 
                }
                
                if(index >= usersJson.users.length-1){
                    res.send('Sorry wrong username or password')
                }
        }
    } catch (err) {
        console.log('error');
        res.status(400).send(err.mesage);
        
    }
})

app.get("/", (req, res) => {
    res.status(200).render("login");   
});

//admin
app.use('/admin', adminRouter);

//admin add new
app.use('/admin_add_new', adminAddNewRouter);

//Home
app.get("/main/:username", (req, res) => {
    console.log("login: "+login)
    if(login === 'y'){
        res.status(200).render("main", {name: userName});
    }else{
        res.status(200).send("Cannot access");
    }
    
});

//Game
//app.use("/game", (gameRouter, {idLink: id}));

app.get('/main/:username/game', (req, res) => {
    res.status(200).render('game', {name: req.params.username})
});


app.get("/users", (req, res) =>{
    res.status(200).json(usersJson);
})

//Menu
app.get("/work", (req, res) => {
    res.status(200).send("Work");
});

app.get("/contact", (req, res) => {
    res.status(200).send("Contact");
});

app.get("/about-us", (req, res) => {
    res.status(200).send("About Us");
});

app.get("/profile/:username", (req, res) => {
    res.status(200).send(req.params.username);

});
//

//Error Handling
app.get('/404', (req,res)=> {
    res.status(404).send(`404 NOT FOUND`)
})

app.get('*', (req,res)=>{
    res.status(404).send(`404 NOT FOUND`)
})
//

app.listen(3000, () => {
    console.log("Port: 3000");
});
