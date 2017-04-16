var mongoose = require('mongoose');



var Fo4Schema = new mongoose.Schema({
  link: String,
  img: String,
  desc: String,
  title: String,
  source: String,
  sourceImg: String,
  game: String
});

mongoose.model('Fo4', Fo4Schema);
