const fs = require('fs');
const path = require('path');

const carritoFilePath = path.join(__dirname, '../data/carrito.json');
const carrito = JSON.parse(fs.readFileSync(carritoFilePath, 'utf-8'));

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const imgsFilePath = path.join(__dirname, '../data/images.json');
const imgs = JSON.parse(fs.readFileSync(imgsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	root: (req, res, next) => {
		res.render('index');
	},
	carrito: (req, res, next) => {
		// console.log(carrito.find(x=> x.idUser == 1).productsArray.map(x=> {
		// 	return {
		// 		...products.find(y => y.id == x.id),
		// 		imgs : imgs.filter(y => y.idProducto == x.id)
		// 	}
		// }));

		let productsComprados = [];
		if(carrito.find(x=> x.idUser == 1)) {
			productsComprados = carrito.find(x=> x.idUser == 1).productsArray.map(x=> {
				return {
					...products.find(y => y.id == x.id),
					imgs : imgs.filter(y => y.idProducto == x.id)
				}
			});
		}
		
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