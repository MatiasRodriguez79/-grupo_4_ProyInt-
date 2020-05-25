var express = require('express');
var router = express.Router();

// ************ Controller Require ************
const mainController = require('../controllers/mainController');


/* GET home page. */
router.get('/', mainController.root);
router.get('/carrito', mainController.carrito);
router.get('/user', mainController.user);

module.exports = router;
