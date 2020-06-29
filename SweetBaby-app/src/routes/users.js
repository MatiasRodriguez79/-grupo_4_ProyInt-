var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');

// ************ Controller Require ************
const usersController = require('../controllers/usersController');
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
router.post('/register', upload.any(), usersController.register);
router.get('/profile', middUserName, usersController.profile)
router.put('/register/update', upload.any(), usersController.update);
router.put('/register/update-pass', usersController.updatePass);
router.get('/register', usersController.registerGet);
router.post('/login', usersController.login);

module.exports = router;
