const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const categoriesFilePath = path.join(__dirname, '../data/categories.json');
const categories = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf-8'));

const imgsFilePath = path.join(__dirname, '../data/images.json');
const imgs = JSON.parse(fs.readFileSync(imgsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	root: (req, res, next) => {
		res.render('products',{
			products: products.filter(x => req.query.cat ? x.idCategory == req.query.cat : x),
			titleCategory: req.query.cat ? categories.find(x=> x.id == req.query.cat).name : "Todas las categorías",
			thousandGenerator: toThousand
		});
	},
	// Detail - Detail from one product
	detail: (req, res, next) => {
		// res.send('aaa ' +  req.params.productId);
		// console.log({
		// 	...products.find((x) => x.id == req.params.productId),
		// 	imgs : imgs.filter(x => x.idProducto == req.params.productId).map((x) => { return x.img} )
		// });
		res.render('productDetail',{
			product: {
				...products.find((x) => x.id == req.params.productId),
				imgs : imgs.filter(x => x.idProducto == req.params.productId)
				// .map((x) => { return x.img} )
			},
			thousandGenerator: toThousand
		});
	},
};

module.exports = controller;