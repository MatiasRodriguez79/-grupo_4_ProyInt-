var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
const {check, validationResult, body, query } = require('express-validator');
const db = require('../database/models');
// ************ Controller Require ************
const usersController = require('../controllers/usersController');
const usersControllerApi = require('../controllersApi/userControllerApi');
const middUserName = require ('../middwares/middUserName')


// ************ Para la carga de imagenes ************
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../public/images/avatars');
    },
    filename: function (req, file, cb) {
        setTimeout(() => {  cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); }, 1000);      
    }
});

let upload = multer({
    storage: storage
});



/* GET home page. */
router.post('/register', upload.any(),[
    body('firstName').isLength({min:2}).withMessage('El nombre de usuario muy corto, debe tener al menos 2 caracteres.'),
    body('passwordRegister1').isLength({min:8}).withMessage('La contraseña debe tener al menos 8 caracteres.'),
    body('emailRegister1').custom(async function(value){
        const user = await db.User.findAll({where: {email: value}});
        if(user.length > 0)
            return Promise.reject();
    }).withMessage('Usuario ya existente.'),
], usersController.register);
router.get('/profile', middUserName, usersController.profile)
router.put('/register/update', upload.any(), usersController.update);
router.put('/register/update-pass', usersController.updatePass);
router.get('/register', usersController.registerGet);
router.post('/login', usersController.login);


/*** API ***/ 
router.get('/api/users/:userId',usersControllerApi.detailPorIdApi); 
router.get('/api/users/', usersControllerApi.listarUsersApi);

module.exports = router;
