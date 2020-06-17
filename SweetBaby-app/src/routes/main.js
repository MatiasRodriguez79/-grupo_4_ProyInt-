var express = require('express');
var router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/mainController');
const usuarioLogueado = require ('../middwares/middUserValidation')


/* GET home page. */
router.get('/', mainController.root);
router.get('/carrito',usuarioLogueado, mainController.carrito);
router.get('/user', mainController.user);

module.exports = router;
