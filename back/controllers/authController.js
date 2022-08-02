exports.login = (req, reply) => {
    const datas = require('../datas/datas.json')
    let login = false
    let infoUser;

    // fouille en "BDD (fichier data.json)"
    datas.forEach(element => {
        console.log(element);
        if(req.body.user == element.auth.user && req.body.password == element.auth.password) {
            login = true;
            infoUser = element
        }
    });


    if (login) {
        /**
         * Mettre en place un token ici et renvoyer la data
         */
        reply.send({ 
            data : infoUser
        })
        
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