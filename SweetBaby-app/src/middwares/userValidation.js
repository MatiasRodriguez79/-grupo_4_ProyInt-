

function userValidation (req,res, next){
    console.log (req.session.user)

    if (req.session.user== undefined ){
        //res.send ("No estas Logueado")
        res.redirect('/user');
    
    }else{

        next();
    }

}
module.exports = userValidation; 
   
