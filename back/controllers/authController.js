const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const {config} = require('../_services/Env');
const {mongodb} = require('../_services/Bdd');

exports.login = function(req, reply) {
    //pwd 123456789

    mongodb(this).findOne({"auth.user" : req.body.user})
    .then(user =>{
        if (user === null) {
            reply.code(403).send({auth : false, error: 'erreur de login / mot de passe'})
        } else {
            bcrypt.compare(req.body.password, user.auth.password)
            .then(result => {
                if(!!result){
                    let token = jwt.sign(
                        { userId: user.id }, 
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
                    reply.code(403).send({auth : false, error: 'erreur de login / mot de passe'})
                }
            })
        }
    })
    .catch(err => {
        console.log(err);
        reply.send(err)
    })
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