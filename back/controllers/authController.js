const jwt = require('jsonwebtoken');
const datas = require('../datas/datas.json')
const {config} = require('../_services/Env');

exports.login = (req, reply) => {
    
    let login = false
    let infoUser;

    // fouille en "BDD (fichier data.json)"
    datas.forEach(element => {
        if(req.body.user == element.auth.user && req.body.password == element.auth.password) {
            login = true;
            infoUser = element
        }
    });

    if (login) {
        let token = jwt.sign(
            { 
                userId: infoUser.id,
                username: infoUser.auth.user
            }, 
            config.JWT_SECRET,
            { expiresIn: '1h' }
        );
        reply.send({ token : token })
    } else {
        reply.code(403).send('utilisateur non présent')
    }
}

exports.logout = (req, reply) => {
    reply.send('logout');
}

exports.createAccount = (req, reply) => {
    reply.send('create account');
}