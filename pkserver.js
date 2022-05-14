//POKEMON example

const express = require('express');
const app = express();
const { sequelize, pokemon } = require('./models')
const bodyParser = require('body-parser');
const es6Renderer = require('express-es6-template-engine');

//app.use('/', require('./routes/endpoints'));

const winston = require('winston');

const moment = require('moment');

const pg = require('pg-promise')();
const oldDb = pg("postgres://dretaylor@localhost:5432/pokedex");

//To convert the request to readable json format, we use bodyparser package
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))

app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

const logger = winston.createLogger({
    level: 'info',
    defaultMeta: { service: 'pokedex' },
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

//*** GET REQUESTS SHOULD NEVER CONTAIN A BODY */

app.get('/', (req, res) => {
    res.render('home');
})

// Get all pokemon from the pokedex
app.get('/pokedex', async (req, res) => {
    let pokedex = await pokemon.findAll();

    res.render('pokemonlist', {
        locals: {
            pokedex,
        }
    });
})

// Get a single pokemon from the pokedex
app.get('/pokemon/:id', async (req, res) => {
    let pokedex = await pokemon.findOne ({
        where: {
            id: req.params.id
        }
    })
    if (pokedex == null) {
        res.statusCode = 400;
        res.send('Not found');
    } else {
        res.statusCode = 200;
        // res.send(pokedex);
        res.render('pokedex', {
            locals: {
                pokedex,
                
            }
        });
    }
})

// Add a pokemon to the pokedex
app.post('/pokemon', async (req, res) => {
    let createdPokemon = await pokemon.create(
        { name, hp, type } = req.body
    )
    res.statusCode = 200;
    res.send(createdPokemon);
});

// Delete a pokemon from the pokedex
app.delete('/pokemon/:id', async (req, res) => {
    let deletedPokemon = await pokemon.destroy({
        where: {
            id: req.params.id
        }
    })
    res.sendStatus(200).send(deletedPokemon);
})

// Update the meta for a pokemon in the pokedex
app.put('/pokemon/:id', async (req, res) => {

    await pokemon.update(
        {
        name: req.body.name,
        hp: req.body.hp,
        type: req.body.type
        }, {
        where: {
              type: req.params.id
            }       
    })
    //.then ((results) => {
        res.send(poke)
    //})
})

//Correct the following endpoint and bring up to best 
app.delete('/gymleader/:name', async (req, res) => {
    let name = req.params.name;
    await oldDb.oneOrNone('SELECT * FROM gym_leaders WHERE name = $1', name).then((gym_leader) =>{
        if(gym_leader == null){
            res.statusCode = 400;
            logger.error({
                "Error": `${name} does not exist`,
                "Status_Code": res.statusCode
            })
            res.send(`${name} does not exist`)
        } else {
            res.statusCode = 200;
            oldDb.none('DELETE FROM gym_leaders WHERE name = $1', name).then(() =>res.send(gym_leader));
        }
    })
});

app.listen(6500, async ()=> {
    console.log('Server is running on port 6500')
    //await sequelize.sync()
})