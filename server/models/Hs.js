var mongoose = require('mongoose');



var HsSchema = new mongoose.Schema({
  link: String,
  img: String,
  desc: String,
  title: String,
  source: String,
  sourceImg: String,
  game: String
});

mongoose.model('Hs', HsSchema);
