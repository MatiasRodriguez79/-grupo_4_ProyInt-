// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const usuarioLogueado = require ('../middwares/middUserValidation')
const recordame = require ('../middwares/middRecordame')
// ************ Controller Require ************
const productsController = require('../controllers/productsController');



// ************ Para la carga de imagenes ************
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../public/images/products');
    },
    filename: function (req, file, cb) {
      setTimeout(() => {  cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); }, 1000);      
    }
});
  
let upload = multer({
  storage: storage
});



/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', recordame, usuarioLogueado, productsController.create); /* GET - Form to create */
router.post('/create/', upload.any(),productsController.store); /* POST - Store in DB */


router.get('/', productsController.root); /* GET - All products */
router.get('/detail/:productId/', productsController.detail); /* GET - Product detail */

router.get('/list',recordame, usuarioLogueado, productsController.list); /* GET - All products grill*/


/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:productId', recordame, usuarioLogueado, productsController.edit); /* GET - Form to create */

router.put('/edit/:productId',recordame, usuarioLogueado, productsController.update); /* PUT - Update in DB */

/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:productId', recordame, usuarioLogueado, productsController.destroy); /* DELETE - Delete from DB */

module.exports = router;



