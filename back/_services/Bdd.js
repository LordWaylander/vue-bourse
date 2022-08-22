exports.connexionBdd = function() {
  this.mongo.client.db('vue-bourse').collection('vue-bourse');
}


