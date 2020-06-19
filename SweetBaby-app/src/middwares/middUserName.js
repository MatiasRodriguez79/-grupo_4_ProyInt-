
 function middUserName(req, res, next) {

    

    if ( req.session.nomYape != undefined) {
    
        req.nomCompleto = req.session.nomYape 

    } else {
        
    }
    console.log ('usuario logueadoo  ' + req.session.nomYape)
   next();

 }

 module.exports = middUserName