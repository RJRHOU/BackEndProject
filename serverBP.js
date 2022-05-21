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

const bcrypt = require('bcrypt');

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




//Get all Favorites from Info (app.get)
app.get('/favInfo', async (req, res) => {
    let favoritesgame = await Favorites.findAll();

    res.send(favoritesgame)
    
})

// Get a single game from the gameList (app.get)
app.get('/favList/:id', async (req, res) => {
    let favoritesgame = await Favorites.findOne ({
        where: {
            id: req.params.id
        }
    })
    if (favoritesgame == null) {
        res.statusCode = 400;
        res.send('Not found');
    } else {
        res.statusCode = 200;
        // res.send(favoritesgame);
        res.render('favoritesgame', {
            locals: {
                favoritesgame,
                
            }
        });
    }
})


// Add a game to the FavoritesList
app.post('/favInfo', async (req, res) => {
    let createdFavorites = await Favorites.create(
    { 
        gamename: req.body.gamename,
        gameid: req.body.gameid,
        star: req.body.star,
        review: req.body.review,
        username: req.body.username
    } 
    ) 
    res.statusCode = 200;
    res.send(createdFavorites);
});



//Get all Wishlist from Info (app.get)
app.get('/wishInfo', async (req, res) => {
    let wishlistgame = await Wishlist.findAll();

    res.send(wishlistgame)
    
})

// Get a single game from the WishList (app.get)
app.get('/wishList/:id', async (req, res) => {
    let wishgame = await Wishlist.findOne ({
        where: {
            id: req.params.id
        }
    })
    if (wishgame == null) {
        res.statusCode = 400;
        res.send('Not found');
    } else {
        res.statusCode = 200;
        // res.send(wishlistgame);
        res.render('wishlistgame', {
            locals: {
                wishgame,
                
            }
        });
    }
})


// Add a game to the WishList
app.post('/wishInfo', async (req, res) => {
    let createdwishList = await Wishlist.create(
    { 
        gamename: req.body.gamename,
        gameid: req.body.gameid,
        rating: req.body.rating,
        username: req.body.username
    } 
    ) 
    res.statusCode = 200;
    res.send(createdwishList);
});



// Delete a game from the gameList
app.delete('/gameInfo/:gamename', async (req, res) => {
    let deletedGames = await Game.destroy({
        where: {
            gamename: req.params.gamename
        }
    })
    res.sendStatus(200).send(deletedGames);
})

// Delete a game from the Favorites
app.delete('/favInfo/:gamename', async (req, res) => {
    let deletedGames = await Favorites.destroy({
        where: {
            gamename: req.params.gamename
        }
    })
    res.sendStatus(200).send(deletedGames);
})

// Delete a game from the gameList
app.delete('/wishInfo/:gamename', async (req, res) => {
    let deletedGames = await Wishlist.destroy({
        where: {
            gamename: req.params.gamename
        }
    })
    res.sendStatus(200).send(deletedGames);
})



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
 app.patch('/gameInfo/:gamename', async (req, res) =>{

    let gPatch = await Game.update(
        {
            gamename: req.body.gamename,
            gameid: req.body.gameid,
            star: req.body.star,
            review: req.body.review,
            username: req.body.username, 
         },    {
                  where:{
                      gamename: req.params.gamename
                  }
              } 
        
    )
    res.sendStatus(200).send(gPatch);        
 })

//Update the meta for a Favorites
 app.patch('/favInfo/:gamename', async (req, res) =>{

    let gPatch = await Favorites.update(
        {
            gamename: req.body.gamename,
            gameid: req.body.gameid,
            star: req.body.star,
            review: req.body.review,
            username: req.body.username, 
         },    {
                  where:{
                      gamename: req.params.gamename
                  }
              } 
        
    )
    res.sendStatus(200).send(gPatch);          
 })

 //Update the meta for a Wishlist
 app.patch('/wishInfo/:gamename', async (req, res) =>{

    let gPatch = await Wishlist.update(
        {
            gamename: req.body.gamename,
            gameid: req.body.gameid,
            star: req.body.star,
            review: req.body.review,
            username: req.body.username, 
         },    {
                  where:{
                      gamename: req.params.gamename
                  }
              } 
        
    )
    res.sendStatus(200).send(gPatch);          
 })

 // User login 
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    models.User.findOne({
        where: { email: email }
      }).then((user) => {
        if (!user) {
          res.json({ error: 'no user with that username' })
          return;
        }
    
        bcrypt.compare(password, user.password, (err, match) => {
          if (match) {
            req.session.user = user;
            res.json({ user_id: user.id, success: true })
          } else {
            res.json({ error: 'incorrect password' })
          }
        })
      })
    })


app.listen(7500, async ()=> {
    console.log('Server is running on port 7500')
    await sequelize.sync()
})
