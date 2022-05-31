//GameZ Backend Project

const express = require('express');
const methodOverride = require('method-override');
const app = express();
const { sequelize, Game, favoritesTWO, favoritesLIST, favoriteGames, Users } = require('./models')

const bodyParser = require('body-parser');
const es6Renderer = require('express-es6-template-engine');
const fetch = require("node-fetch");
const PORT = process.env.PORT || 3001;

const env = process.env.NODE_ENV || "production";

const winston = require('winston');
const moment = require('moment');
const pg = require('pg-promise')();
const bcrypt = require('bcrypt');
const { response } = require('express');
const favoritestwo = require('./models/favoritestwo');
const { JSON } = require('sequelize');

//To convert the request to readable json format, we use bodyparser package
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
app.use(methodOverride('_method'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');
app.use(express())

// You need to explicitly tell express what folders to use in order for it to render correctly
app.use(express.static('css'))

// Winston to log crash errors
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

//endpoint to homepage
app.get('/home', (req, res) => {
   
    res.render('index', {
        locals: {
        }
        });
})

//enpoint for login
app.get('/home/login', (req, res) => {
   
    res.render('login', {
        locals: {
        }
            });
})
    

//Get all games from gameInfo (app.get)
app.get('/gameInfo', async (req, res) => {
    let gaming = await Game.findAll();

    res.send(gaming)
})

//Posting search results from button click
app.post('/home', async (req,res)=> {
   
    const userInput = req.body.search;
    const urlEncodedSearchString = encodeURIComponent(userInput);
    
    let games = await fetch(`https://rawg.io/api/games?key=c1be38abe1e74ea3a7b554f19b8a9df6&search=${urlEncodedSearchString}`)
    let gamesJson = await games.json()
    let allGames = gamesJson.results.slice(0,50)
        let imgArray = []
        allGames.map((game) => {
            imgArray.push(encodeURIComponent(game.background_image))
        })
        res.render('SearchResults', {
        locals: {
               games: allGames,
               image: imgArray
            }
        });
})    

//pulling one game card from favorite 
app.get('/oneresult/:gameslug' , async (req, res) => {
    console.log(req.params.gameslug, "IM HERE")
    let games = await fetch(`https://rawg.io/api/games/${req.params.gameslug}?key=c1be38abe1e74ea3a7b554f19b8a9df6`)
    console.log(games)
    let gamesJson = await games.json()
    console.log(gamesJson)
    let allGames = gamesJson
      console.log(allGames)
        
        res.render('FavoritesWish', {
        locals: {
               game: allGames,
               name: ''
            }
        });   
  } )
 
  // Adds to FavoritiesLIST DB
app.post('/addToFavorites/:name/:slug/:rating/:released/:image' ,async (req, res) => {
    console.log('favorite created', req.params)
    await favoritesLIST.create(
        { 
            name: req.params.name,
            slug: req.params.slug,
            background_image: req.params.image,
            released: req.params.released,
        })  
});

// Delete a game from the FavoritesLIST
app.delete('/deleteGame/:slug', async (req, res) => {
    console.log(req.params.slug, favoritesLIST.slug);
    await favoritesLIST.destroy({
       
        where: {
            slug: req.params.slug
        }
    })
    res.redirect('back');
})

//Edit a game from the favoritesLIST
app.post('/editGame/:slug', async (req, res) =>{
    await favoritesLIST.update(
        {
            rating: req.body.selectedRating
        },    
        {
            where: {
                slug: req.params.slug
            }
        } 
    )
    res.redirect('back');        
 })

//add card to Favorites 
app.get('/addToFavoritesInfo', async (req, res) => {
    let allFavoriteSlugs = await favoritesLIST.findAll();
    console.log(allFavoriteSlugs)
    if(allFavoriteSlugs === null) {
        res.send('tf')
    } else {

        res.render('FavoritesWish', {
            locals: {
                   games: allFavoriteSlugs,
                }
        });  
    }
});


 // User login 
app.post('/login', async (req, res) => {
    let user = await Users.findOne({
        where: {
            email: req.body.email
        }
    })
    if(user !== null){
        let passwordCheck = await bcrypt.compare(req.body.password, user.password)
        if(passwordCheck === true){
            console.log("hi")
            res.render('HomeAfterLogin', {
                locals: {
                    }
                });
        }
    }
    })

// posting a new user to table    
app.post('/signUp', async function (req, res) {
    console.log(req.body.firstName, req.body.lastName, req.body.email, req.body.username, "USERNAME")
    let allUsers = await Users.findAll()
    console.log(allUsers)
    createdUser = await Users.create(
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,                
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 12),
            username: req.body.username
         })  
});

//route to link to login page
app.get('/login', (req, res) => {
   
    res.render('login', {
        locals: {
           
            }
        });
    })

//route to link to signup page     
app.get('/signUp', (req, res) => {
   
        res.render('signUp', {
            locals: {
                
                }
            });
        })

 //route to get to contact page       
app.get('/contactPAGETWO', (req, res) => {
   
     res.render('contactPAGETWO', {
        locals: {
                    
                }
            });
        })        

//route to get to Forgot Password  page       
app.get('/forgotPass', (req, res) => {
   
    res.render('forgotPass', {
       locals: {
                   
               }
           });
       }) 
// port where local host is running      
// app.listen(8500, async ()=> {
//     console.log('Server is running on port 8500')
//     await sequelize.sync()
// })