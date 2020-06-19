var express = require('express');
var router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/mainController');
const usuarioLogueado = require ('../middwares/middUserValidation')
const middUserName = require ('../middwares/middUserName')


/* GET home page. */
router.get('/',middUserName, mainController.root);
router.get('/carrito',middUserName,usuarioLogueado, mainController.carrito);
router.get('/carrito',middUserName, mainController.carrito);
router.get('/user', middUserName, mainController.user);
router.get('/logOff',mainController.logOff);

module.exports = router;
