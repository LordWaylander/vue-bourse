const jwt = require('jsonwebtoken');
const datas = require('../datas/datas.json')
const fs = require('fs').promises;

exports.getProfile = (req, reply, done) => {
  let user = null;

  datas.forEach(element => {
    if(req.data.decodedToken.userId == element.id) {
      user = {
        userName : element.nom,
        userFirstname: element.prenom,
        userFavoris: element.favoris
      }
    }
  });
  
  if(!!user) {
    reply.send({user: user})
  }else{
    reply.code(500).send('erreur dans le controlleur pas de user')
  }
}

exports.isFavList = (req, reply, done) => {
  let isFavList = false;

  datas.forEach(element => {
    if(req.data.decodedToken.userId == element.id) {
      element.favoris.forEach(favoriElement => {
        if (req.params.query == favoriElement) {
          return isFavList = true
        }
      })
    }
  });

  reply.send(isFavList)
}

exports.deleteFavoris = async (req, reply, done) => {
  datas.forEach(element => {
    if(req.data.decodedToken.userId == element.id) {
      const index = element.favoris.indexOf(req.params.indice);
      element.favoris.splice(index, 1)
    }
  });

  try {
    let data = await JSON.stringify(datas);
    await fs.writeFile('datas/datas.json', data)
    reply.send({delete: true})
  } catch (err) {
    reply.code(500).send({err: err})
  }
}

exports.addFavoris = async (req, reply, done) => {
  datas.forEach(element => {
    if(req.data.decodedToken.userId == element.id) {
      element.favoris.push(req.body.indice)
    }
  });
  
  try {
    let data = await JSON.stringify(datas);
    await fs.writeFile('datas/datas.json', data)
    reply.send({add: true})
  } catch (err) {
    reply.code(500).send({err: err})
  }
}

exports.tableur = (req, reply, done) => {
  let symbol = req.params.symbol

  datas.forEach(element => {
    if(req.data.decodedToken.userId == element.id) {
      element.achat.forEach(el => {
        if (el.name == symbol) {
          reply.send(el)
        }else{
          reply.send('Vous n\'avez pas encore acheté d\action')
        }
      });
    }
  });
}