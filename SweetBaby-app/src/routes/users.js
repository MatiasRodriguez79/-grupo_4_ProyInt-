var express = require('express');
var router = express.Router();

// ************ Controller Require ************
const usersController = require('../controllers/usersController');


/* GET home page. */
router.post('/register', usersController.register);
router.post('/login', usersController.login);

module.exports = router;
