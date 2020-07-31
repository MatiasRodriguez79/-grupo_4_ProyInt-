
 function middUserName(req, res, next) {
    req.productosInCarrito = 0
    if ( req.session.nomYape != undefined) {
      req.rol = req.session.rol;
      req.nomCompleto = req.session.nomYape 
      req.carritoId = req.session.carritoId;
      req.productosInCarrito = req.session.productosCount;
    }
    next();
 }

 module.exports = middUserName