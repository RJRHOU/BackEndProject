//GameZ Backend Project

const express = require('express');
const app = express();
const { sequelize, Game, Favorites, Wishlist, User } = require('./models')

const bodyParser = require('body-parser');
const es6Renderer = require('express-es6-template-engine');

//app.use('/', require('./routes/endpoints'));

const winston = require('winston');

const moment = require('moment');

const pg = require('pg-promise')();

//To convert the request to readable json format, we use bodyparser package
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))

app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

app.use(express())

const logger = winston.createLogger({
    level: 'info',
    defaultMeta: { service: 'Game' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ]
})

// Middleware is the mediary that modifies information sent between the client and server
app.all('*', (req, res, next) => {
    logger.info({
        "Action": req.method,
        "Path": req.path,
        "Content_Type": req.header('Content-Type'),
        "Body": req.body,
        "Time": moment().format('MM/DD/YYYY, h:mm:ss a')
    })
    next()
})

//Get all games from gameInfo (app.get)
app.get('/gameInfo', async (req, res) => {
    let gaming = await Game.findAll();

    res.send(gaming)
    
})

// Get a single game from the gameList (app.get)
app.get('/gameList/:id', async (req, res) => {
    let gaming = await Game.findOne ({
        where: {
            id: req.params.id
        }
    })
    if (gaming == null) {
        res.statusCode = 400;
        res.send('Not found');
    } else {
        res.statusCode = 200;
        // res.send(gaming);
        res.render('gaming', {
            locals: {
                gaming,
                
            }
        });
    }
})


// Add a game to the gameList
app.post('/gameInfo', async (req, res) => {
    let createdUser = await Game.create(
    { 
        gamename: req.body.gamename,
        gameid: req.body.gameid,
        star: req.body.star,
        review: req.body.review,
        username: req.body.username
    } 
    ) 
    res.statusCode = 200;
    res.send(createdUser);
});


// Add a game to the gameList
app.post('/favInfo', async (req, res) => {
    let createdUser = await Favorites.create(
    { 
        gamename: req.body.gamename,
        gameid: req.body.gameid,
        star: req.body.star,
        review: req.body.review,
        username: req.body.username
    } 
    ) 
    res.statusCode = 200;
    res.send(createdUser);
});


//Update the meta for a game
 app.patch('/gameInfo/:gameid', async (req, res) =>{

    let gPatch = await Game.update(
        {
            gamename: req.body.gamename,
            gameid: req.body.gameid,
            star: req.body.star,
            review: req.body.review,
            username: req.body.username, 
         },    {
                  where:{
                      gameid: req.params.gameid
                  }
              } 
        
    )
     res.send(gPatch)         
 })

//Update the meta for a Favorites
 app.patch('/favInfo/:gameid', async (req, res) =>{

    let gPatch = await Favorites.update(
        {
            gamename: req.body.gamename,
            gameid: req.body.gameid,
            star: req.body.star,
            review: req.body.review,
            username: req.body.username, 
         },    {
                  where:{
                      gameid: req.params.gameid
                  }
              } 
        
    )
     res.send(gPatch)         
 })




app.listen(7500, async ()=> {
    console.log('Server is running on port 7500')
    await sequelize.sync()
})
