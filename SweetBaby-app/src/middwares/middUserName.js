
 function middUserName(req, res, next) {

    

    if ( req.session.nomYape != undefined) {
    
        req.nomCompleto = req.session.nomYape 

    } else {
        req.nomCompleto = 'No hay user'
    }
    console.log ('usuario logueadoo  ' + req.session.nomYape)
   next();

 }

 module.exports = middUserName