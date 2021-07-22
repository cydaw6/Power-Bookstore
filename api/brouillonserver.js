




let mongoose = require('mongoose');
mongoose.connect("mongodb://debian:zibaldone55@localhost:27017/antoinebastosfr?authSource=admin",{useNewUrlParser: true, useUnifiedTopology: true});
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erreur lors de la connexion'));
db.once('open', function(){
    console.log('Connexion réussi');
})
//////////
let projetsSchema = mongoose.Schema({
    description: String,
    title: String,
    tags: [],
    date: String,
    link: String,
    techs: [],
    thumbnail: String
},{collection: 'projets'});
let Projet = mongoose.model( 'test', projetsSchema);

// import required packages
const express = require('express');
const cors = require('cors');

const https = require('https');
const http = require('http');

const fs = require('fs');



// create new express app and save it as "app"
const app = express();
app.use(cors());

// create a route for the app
app.get('/', (req, res) => {
    res.writeHead(404);
});

// another route
app.get('/hex7894555!klmno', (req, res) => {
    res.writeHead(200, {
        'Content-type': 'text/json; charset=utf-8'
    })
    Projet.find(null, function(err, x) {
        if (err){
            throw err;
        }

        res.end((JSON.stringify(x, null, 4)));
    });
});

// Listen both http & https ports
const httpServer = http.createServer(app);
const httpsServer = https.createServer({
    key: fs.readFileSync('/etc/letsencrypt/live/antoinebastos.fr/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/antoinebastos.fr/fullchain.pem'),
}, app);

httpsServer.listen(707, () => {
    console.log('HTTPS Server running on port 707');
});


/* --
let express = require('express');
let cors = require('cors');

const app = express();
app.options('/*', function (request, response, next) {
    response.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    response.send();
});

app.get('/hex7894555!klmno', cors(), (req, res) => {
    res.writeHead(200, {
        'Content-type': 'text/json; charset=utf-8'
    })
    Projet.find(null, function(err, x) {
        if (err){
            throw err;
        }

        res.end((JSON.stringify(x, null, 4)));
    });

});


/*
app.get('request',function(req, res){

    if(req.url === '/hex7894555!klmno'){
        res.writeHead(200, {
            'Content-type': 'text/json; charset=utf-8'
        })
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");


    }else{
        res.writeHead(404);
    }
})


app.listen(707, () =>{
    console.log('listening on 707');
});
 --  */
//server.listen(707); // verifier que le port est bien ouvert

