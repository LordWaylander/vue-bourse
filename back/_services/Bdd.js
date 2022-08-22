exports.mongodb = function(fastify){
  return fastify.mongo.client.db('vue-bourse').collection('vue-bourse');
}