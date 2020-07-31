// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const usuarioLogueado = require ('../middwares/middUserValidation')
const recordame = require ('../middwares/middRecordame')
const middUserName = require ('../middwares/middUserName')
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

/*** API LISTAR ***/ 
router.get('/create/listarProductos',productsController.listarProductos); 

/*** CREATE ONE PRODUCT ***/ 
//router.get('/create/', recordame, usuarioLogueado, productsController.create); /* GET - Form to create */
router.get('/create/', middUserName, recordame, usuarioLogueado, productsController.createDb); /* GET - Form to create */
//router.post('/create/', upload.any(),productsController.store); /* POST - Store in DB */
router.post('/create/',middUserName, recordame,usuarioLogueado, upload.any(),productsController.storeDb); /* POST - Store in DB */


router.get('/:pag?', middUserName, productsController.root); /* GET - All products */
router.get('/detail/:productId',middUserName, productsController.detail); /* GET - Product detail */

//router.get('/list',middUserName, recordame, usuarioLogueado, productsController.list); /* GET - All products grill*/
router.get('/admin/list',middUserName, recordame,usuarioLogueado, productsController.list); /* GET - All products grill*/


/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:productId', middUserName, recordame, usuarioLogueado, productsController.edit); /* GET - Form to create */

router.put('/edit/:productId',middUserName, recordame, usuarioLogueado, productsController.update); /* PUT - Update in DB */

/*** DELETE ONE PRODUCT***/ 
//router.delete('/delete/:productId', recordame, usuarioLogueado, productsController.destroy); /* DELETE - Delete from DB */
router.delete('/delete/:productId', middUserName, recordame, usuarioLogueado, productsController.destroydb); /* DELETE - Delete from DB */

module.exports = router;



