const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  prenom: {
    type: String,
    unique: false,
    required: true,
  },
  nom: {
    type: String,
    unique: false,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  auth: {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      unique: false,
      required: true,
    }
  },
  favoris: [{
    type: String
  }]
},
{
  timestamps: true
})

const User = mongoose.model('users', userSchema);
const userObjectId = function(userId) {
  return mongoose.Types.ObjectId(userId);
}
module.exports = {User, userObjectId};