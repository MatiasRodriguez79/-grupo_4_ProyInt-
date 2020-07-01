

function userValidation (req, res, next){

  if (req.session.user== undefined ){
       res.redirect('/user');
    }else{
        req.usuario = req.session.user;
        req.nomCompleto = req.session.nomYape;
        req.carritoId = req.session.carritoId;
        req.productosInCarrito = req.session.productosCount;
        next();
    }
    
}
module.exports = userValidation; 
   
