var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();




var mongoose = require('mongoose');

require("./server/config/mongoose.js");

var Xcom2 = mongoose.model('Xcom2');

var Hs = mongoose.model('Hs');

var Fo4 = mongoose.model('Fo4');

var games = [
  "Hearthstone",
  "Xcom 2",
  "Fallout 4"
]



app.get('/scrape', function(req, res){

for(var i = 0; i < games.length; i++){

  var search = games[i].replace(" ", "+");

url = 'https://www.rockpapershotgun.com/?s=' + search;

request(url, function(error, response, html){
    if(!error){

    var $ = cheerio.load(html);

    var title, desc, img, date, source, sourceImg;

    var json = {articles: []};

    var article = {title: String, desc: String, img: String, date: String, source: String, sourceImg: String};

    $('#search-results').filter(function(){
        var data = $(this);

        data.children().each(function(){
            var child = $(this);
            var article = new Object;
            child.children().each(function(){

                link = child.children().last().children().first().children().attr('href');
                article.link = link;

                img = child.children().first().attr('src');
                article.img = img;

                desc = child.children().last().children().eq(3).text();

                article.desc = desc.substring(0,100) + "...";

                title = child.children().last().children().first().children().text();
                article.title = title;

                source = "Rock Paper Shotgun"
                article.source = source;

                sourceImg = "https://www.rockpapershotgun.com/images/15/aug/rpslogorec.png"
                article.sourceImg = sourceImg;

                article.game = games[i];


            })
            json.articles.push(article);
        })



    })

    // for(var i = 0; i < json.articles.length; i++){
    //   var gameInstance = new Hs(json.articles[i]);
    //   gameInstance.save(function(err, results){
    //     if(err) {
    //       console.log("this is an", err);
    //     }else{
    //       console.log("saved", i);
    //     }
    //   })
    // }
    console.log(json);
}



fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

    console.log('File successfully written! - Check your project directory for the output.json file');

})

// Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.

  console.log('Check your console for' + i);

    }) ;
  }
})

app.listen(8000, function() {
  console.log('Listening on port: 8000');
});


exports = module.exports = app;
