

// Express
const express = require('express');
const app = express();
var cors = require('cors');
const port = 7045

// fs
const fs = require("fs");
let dbpasswd = fs.readFileSync(__dirname + "/dbpasswd.txt", "utf8");

// Mongoose
const mongoose = require('mongoose');
// using mongodb atlas for facility
let url = 'mongodb+srv://admin:'+dbpasswd+'@bastion-1.tpu1w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(
    url,  
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true
    }
);
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error during connection'));
let Bookstore = null;
db.once('open', function(){
    console.log('Successful connection');
})

//https://www.codegrepper.com/code-examples/javascript/how+to+create+a+collection+with+mongoose
// https://www.tutorialkart.com/nodejs/mongoose/insert-document-to-mongodb/

// Define book schema
let BookSchema = mongoose.Schema({
    isbn: Number,
    title: String,
    type: String,
    authors: [{type: String}],
    language: String,
    publisher: String,
    publishedDate: Number,
    description: String,
    keyWords: [{type: String}],
    purchasedPrice: Number,
    sellingPrice: Number,
    location: String,
    pageCount: Number,
    image: String,
    thumbnail: String,
    personalNote: String,
    condition: String
},{collection: 'Bookstore'});

// Compile
let Book = mongoose.model('Book', BookSchema, 'Bookstore');
Bookstore = mongoose.model('Bookstore', BookSchema);

/* To add a document
// a document instance
var book1 = new Book({ 
    authors: ["Irvin D. Yalom"],
    description: "Amsterdam, fevrier 1941. Le Reichleiter Rosenberg, charge de la confiscation des biens culturels des juifs dans les territoires occupes, fait main basse sur la bibliotheque de Baruch Spinoza. Qui etait-il donc ce philosophe, excommunie en 1656 par la communaute juive d'Amsterdam et banni de sa propre famille, pour, trois siecles apres sa mort, exercer une telle fascination sur l ideologue du parti nazi Irvin Yalom, l auteur de Et Nietzsche a pleure, explore la vie interieure de Spinoza, inventeur d une ethique de la joie, qui influenca des generations de penseurs. Il cherche aussi a comprendre Alfred Rosenberg qui joua un role decisif dans l'extermination des juifs d'Europe.\"Le rythme soutenu du recit, la vivacite des dialogues, l erudition d Irvin Yalom, la plongee dans la societe neerlandaise du XVIIe siecle et les grands bouleversements de l Europe du XXe font de cet ouvrage un veritable regal.\" Marie Auffret-Pericone, La Croix.\"",
    image: "http://books.google.com/books/content?id=LhrSnQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    isbn: 2253168688,
    keyWords: null,
    language: "fr",
    location: null,
    personalNote: null,
    publishedDate: 20140129,
    publisher: "Livre de Poche",
    purchasedPrice: null,
    sellingPrice: null,
    thumbnail: "http://books.google.com/books/content?id=LhrSnQEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
    title: "Le problème Spinoza",
    type: null,
    condition: "Neuf"
});
// save model to database
book1.save(function (err, book){
    if (err) return console.err(err);
    console.log(book.title + " saved to bookstore collection");
});
*/


/* Server */
// use it before all route definitions
app.use(cors({origin: 'http://127.0.0.1:5500'}));


// create a route for the app
app.get('/', (req, res) => {
    res.writeHead(404);
});

// another route
app.get('/books', (req, res) => {
    res.writeHead(200, {
        'Content-type': 'text/json; charset=utf-8'
    })
    Bookstore.find(null, function(err, x) {
        if (err){
            throw err;
        }

        res.end((JSON.stringify(x, null, 4)));
    });
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})







