const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  prenom: {
    type: String,
    unique: false
  },
  nom: {
    type: String,
    unique: false
  },
  email: {
    type: String,
    unique: true
  },
  auth: {
    username: {
      type: String,
      unique: true
    },
    password: {
      type: String,
      unique: false
    }
  },
  favoris: [{
    type: String
  }],
  achats: [{
    type: String
  }],
})

const User = mongoose.model('vue-bourses', userSchema);
const userObjectId = function(userId) {
  return mongoose.Types.ObjectId(userId);
}
module.exports = {User, userObjectId};