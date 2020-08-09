var express = require('express');
var router = express.Router();

const usersControllerApi = require('../../controllersApi/userControllerApi');

console.log ('estoy en ruteador api')
/*** API ***/ 
router.get('/users/', usersControllerApi.listarUsersApi);
router.get('/users/:userId',usersControllerApi.detailPorIdApi); 


module.exports = router;