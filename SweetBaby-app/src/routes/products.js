// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// ************ Controller Require ************
const productsController = require('../controllers/productsControllers');

// ************ Para la carga de imagenes ************
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../public/images/productos');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname));
    }
  });
  
  let upload = multer({
    storage: storage
  });


//router.get('/', productsController.root); /* GET - All products */
//router.get('/detail/:productId/', productsController.detail); /* GET - Product detail */

/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', productsController.create); /* GET - Form to create */
router.post('/create/', upload.any(),productsController.store); /* POST - Store in DB */


/*** EDIT ONE PRODUCT ***/ 
//router.get('/edit/:productId', productsController.edit); /* GET - Form to create */
//router.put('/edit/:productId', productsController.update); /* PUT - Update in DB */

/*** DELETE ONE PRODUCT***/ 
//router.delete('/delete/:productId', productsController.destroy); /* DELETE - Delete from DB */

module.exports = router;
