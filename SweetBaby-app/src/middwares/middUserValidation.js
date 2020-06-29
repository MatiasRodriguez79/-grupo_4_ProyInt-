

function userValidation (req, res, next){

  if (req.session.user== undefined ){
       res.redirect('/user');
    }else{
        req.usuario = req.session.user;
        req.nomCompleto = req.session.nomYape 
        next();
    }
    
}
module.exports = userValidation; 
   
