const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const randomWords = require('random-words')

const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
const port = process.env.PORT || 3000;



// app.get('/', function(req, res){
//     // window.location.reload(true);




// });

app.all('/',function(req, res, next){
    let dictAPI = 'https://api.dictionaryapi.dev/api/v2/entries/en_US/';
    let word = req.body.word;
    if(word == null){
        word = randomWords();
    }
    let url = dictAPI + word;
    // let wordJSON
    request(url, function(req, response){
        let wordJSON = JSON.parse(response.body);
        // JSONvar = wordJSON;

        res.render('home.ejs',{dict: wordJSON});
    });
    // res.render('home.ejs', { dict: wordJSON});


});


app.listen(port, () => console.log(`Example app listening on port port!`));