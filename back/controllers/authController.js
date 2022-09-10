const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const {config} = require('../_services/Env');
const {User} = require('../models/userModel');

exports.login = function(req, reply) {
    //pwd 123456789

    User.findOne({"auth.username" : req.body.user})
    .then(user =>{
        if (user === null) {
            reply.code(403).send({auth : false, error: 'erreur de login / mot de passe'})
        } else {
            bcrypt.compare(req.body.password, user.auth.password)
            .then(result => {
                if(!!result){
                    let token = jwt.sign(
                        { userId: user._id }, 
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
        reply.code(500).send(err)
    }
}

exports.createAccount = (req, reply) => {//"auth.username" : req.body.user
    User.findOne({$or: [
        {"auth.username" : req.body.auth.user},
        {email: req.body.email}
    ]})
    .then(user => {
        if (user === null) {
            bcrypt.hash(req.body.auth.password, 10, function(err, hash) {
                req.body.auth.password = hash;
                User.create(req.body)
                .then(() => {
                    reply.send({created : true});
                })
                .catch((err) => {
                    console.log(err);
                    reply.code(500).send(err)
                })
            });
        } else {
            reply.code(403).send({created : false, error: 'Un user existe déjà avec ce couple username / email'})
        }
    })
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