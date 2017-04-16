var mongoose = require('mongoose');


var Xcom2Schema = new mongoose.Schema({
  link: String,
  img: String,
  desc: String,
  title: String,
  source: String,
  sourceImg: String,
  game: String
});

mongoose.model('Xcom2', Xcom2Schema);
