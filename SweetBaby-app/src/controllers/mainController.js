const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	root: (req, res, next) => {
		res.render('index');
	},
	carrito: (req, res, next) => {
		// const productsComprados = products.filter(x => x.idCategory == 10);
		const productsComprados = products;
		res.render('carrito', {			
			products: productsComprados,
			totalAmount: productsComprados.reduce((a, b) => a + (b['priceVenta'] || 0), 0),
			thousandGenerator: toThousand
		});
	},
	user: (req, res, next) => {
		res.render('sign-in');
	},
};

module.exports = controller;