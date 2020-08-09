// ************ Require's ************
const express = require('express');
const router = express.Router();
// ************ Controller Require ************

const productsControllerApi = require('../../controllersApi/productsControllerApi');

/*** API ***/ 
router.get('/products/',productsControllerApi.listarProductosApi); 
router.get('/products/:productId',productsControllerApi.detailPorIdApi); 


module.exports = router;