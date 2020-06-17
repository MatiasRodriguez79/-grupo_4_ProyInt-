

function userValidation (req, res, next){
    console.log ('sesion de usuario ' + req.session.user)

  if (req.session.user== undefined ){
       console.log ("No estas Logueado")
       res.redirect('/user');
    
    }else{

        req.usuario = req.session.user;
        req.nomCompleto = req.session.nomYape 

        next();
    }

}
module.exports = userValidation; 
   
