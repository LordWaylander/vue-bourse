const API = require('../config/Axios.js');
const erreurs = require('../config/erreurs');

/**
    * GLOBAL_QUOTE - function=GLOBAL_QUOTE&symbol=${query}${exchange}&outputsize=compact&apikey=${API.Token} // trading AJD
    * TIME_SERIES_DAILY - function=TIME_SERIES_DAILY&symbol=${query}${exchange}&outputsize=compact&apikey=${API.Token} // trading AJD par jour & interval=min 
    * SYMBOL_SEARCH - function=SYMBOL_SEARCH&keywords=${query}&apikey=${API.Token} // recherche d'indices
    * TIME_SERIES_INTRADAY - function=TIME_SERIES_INTRADAY&symbol=${query}&interval=60min&apikey=${API.Token} // trading par heure & interval=min         
    * TIME_SERIES_WEEKLY - function=TIME_SERIES_WEEKLY&symbol=${query}&apikey=${API.Token} // trading par semaine
    * TIME_SERIES_MONTHLY - function=TIME_SERIES_MONTHLY&symbol=${query}&apikey=${API.Token} // tranding par mois
*/

exports.time_series_daily = (req, reply) => {
    let query = req.params.query
    API.axios.get(`query?function=TIME_SERIES_DAILY&symbol=${query}&outputsize=compact&apikey=${API.token}`)
    .then(result => {
        console.log(reply);
        reply.send(result.data);
    })
    .catch((err) => {
       let e = erreurs.error(err);
       reply.code(500).send(e)
    })
}

exports.global_quote = (req, reply) => {
    let query = req.params.query
    API.axios.get(`query?function=GLOBAL_QUOTE&symbol=${query}&outputsize=compact&apikey=${API.token}`)
    .then(result => {
        reply.send(result.data);
    })
    .catch((err) => {
        let e = erreurs.error(err);
       reply.code(500).send(e)
    })
}

exports.symbol_search = (req, reply) => {
    let query = req.params.query
    API.axios.get(`query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${API.token}`)
    .then((result) => {
        reply.send(result.data.bestMatches);
    })
    .catch((err) => {
        let e = erreurs.error(err);
        reply.code(500).send(e)
    })
}