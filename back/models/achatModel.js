const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const achatSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId, 
    ref: 'users'
  },
  name: {
    type: String,
    require: true, 
    unique: false
  },
  devise: {
    type: String,
    require: true, 
    unique: false
  },
  listeAchat: [{
    _id: false,
    date: {
      type: String,
      require: true,
    },
    quantite: {
      type: Number,
      require: true,
    },
    prixAchat:{
      type: Number,
      require: true,
    },
    fraisAchat: {
      type: Number,
      require: true,
    },
  }]
})

const Achat = mongoose.model('achats', achatSchema);

module.exports = {Achat};