exports.error =  function(err){
    if(err.code === "ERR_BAD_RESPONSE"){
        return 'Erreur interne du serveur';
    }else if (err.code === "ERR_NETWORK"){
        return 'Erreur de réseau';
    }else if (err.code === 'ETIMEDOUT'){
        return 'Time Out';
    }else{
        return err;
    }
}