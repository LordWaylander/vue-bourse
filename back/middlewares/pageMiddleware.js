exports.test = (request, reply, done) => {
    if(request.params.id == '') {
        reply.send({ err : 'Pas d\'ID présent' })
    }
    done();
}
