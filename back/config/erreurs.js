exports.error =  function(err){
    console.log('****** err ******');
    console.log(err);
    if (err == 'Error: Nombre maximal de requetes dépassé') {
        return 'Nombre maximal de requetes dépassé'
    }else{
        switch (err.code) {
            case 'ETIMEDOUT':
                return 'Time Out';
                break;
            case 'ERR_NETWORK':
                return 'Erreur de réseau';
                break;
            case 'ERR_BAD_RESPONSE':
                return 'Erreur interne du serveur';
                break;
            default:
                return 'ERREUR';
                break;
        }
    }

    
}