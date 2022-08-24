const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const BlogPost = new Schema({
  title: {
    type: String,
    required: true
  }
});

const Test = mongoose.model('vue-bourses', BlogPost);
module.exports = Test;


/**
 * autre fchier
 */

const  test = require('./modelTest');
test.find()
.then(res => {
  console.log(res);
})