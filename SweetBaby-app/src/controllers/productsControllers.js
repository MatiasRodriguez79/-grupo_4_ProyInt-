const fs = require('fs');
const path = require('path');


const productsFilePath = path.join(__dirname, '../data/products.JSON');


const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Create - Form to create
	create: (req, res) => {
		res.render('productAdd.ejs', {
			products,
			thousandGenerator: toThousand
		});
	},	
	//  Method to store
	store: (req, res, next) => {
		//onsole.log ('estoy en store');
		req.body.priceVenta = Number(req.body.priceVenta);
		req.body.priceCompra = Number(req.body.priceCompra);
		let newProduct = {
			idproducts: products[products.length - 1].idproducts + 1,
			...req.body,
			idcategory:'',
			//image: 'default-image.png'
			image: req.files[0].filename
		};
		let finalProducts = [...products, newProduct];

		
		fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, ' '));
		
		res.redirect('/products/create');
	},

};

module.exports = controller;