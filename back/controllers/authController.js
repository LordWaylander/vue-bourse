exports.login = (req, reply) => {
    console.log(req.body);
    if(req.body.user && req.body.password){
        reply.send('login success')
    }else{
        reply.code(403).send('pas de credentials')
    }
}

exports.logout = (req, reply) => {
    reply.send('logout');
}

exports.createAccount = (req, reply) => {
    reply.send('create account');
}