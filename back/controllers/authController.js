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
            return infoUser = element
        }
    });

    if (login) {
        let token = jwt.sign(
            { userId: infoUser.id }, 
            config.JWT_SECRET,
            { expiresIn: '1h' }
        );

        reply
        .setCookie('token', token, {
            domain: 'localhost',
            path: '/',
            secure: true,
            expires: Date.now()+(1000*60*60), //expires 1H
            maxAge: 3600 // maxAge 1H
          })
        .code(200)
        .send({auth : true})
    } else {
        reply.code(403).send({auth : false, error: 'erreur dans le login'})
    }
}

exports.logout = (req, reply) => {
    try {
        reply
        .clearCookie('token')
        .clearCookie('query')
        .send({connected: false})
    } catch (err) {
        reply
        .code(500)
        .send(err)
    }
    //reply.send('logout');
}

exports.createAccount = (req, reply) => {
    reply.send('create account');
}

exports.verifToken = (req, reply) => {
    let token = req.cookies.token;
    try {
        jwt.verify(token, config.JWT_SECRET);
        reply.send({auth : true})
    } catch (error) {
        reply
        .clearCookie('token')
        .send({auth : false})
    }
}