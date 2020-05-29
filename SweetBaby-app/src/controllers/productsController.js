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

	// List - Show all products Table
	list: (req, res) => {
		res.render('productsList',{
			products,
				thousandGenerator: toThousand
		});
	},

	// Root - Show all products
	root: (req, res, next) => {
		// console.log(req.url);
		res.render('products',{
			currentUrl: req.url,
			products: products.filter(x => req.query.cat ? x.idCategory == req.query.cat : x).map(x => {
				return {
					...x,
					imgs : imgs.filter(y => y.idProducto == x.id)
				}
			}),
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
	// Create - Form to create
	create: (req, res) => {
		res.render('productAdd.ejs', {
			products,
			thousandGenerator: toThousand
		});
	},
	store: (req, res, next) => {
		//onsole.log ('estoy en store');
		req.body.priceVenta = Number(req.body.priceVenta);
		req.body.priceCompra = Number(req.body.priceCompra);
		req.body.descuento = Number(req.body.descuento);
		req.body.idCategory = Number(req.body.idCategory);
		req.body.stock = Number(req.body.stock);
		let newProduct = {
			id: products[products.length - 1].id + 1,
			...req.body,
			category: categories.find(x=> x.id == req.body.idCategory).name,
			//image: 'default-image.png'
			image: req.files[0].filename
		};
		let finalProducts = [...products, newProduct];

		let newImages;
		let finalImgs = [...imgs];
		let orderImg = 1;
		req.files.forEach(element => {
			newImages = {
				idProducto: newProduct.id,
				img: element.filename,
				order: orderImg++
			}
			finalImgs = [...finalImgs, newImages];
		});
		// let newImages = {
		// 	idProducto: newProduct.id,
		// 	img: req.files[0].filename,
		// 	order: 1
		// }
		// let finalImgs = [...imgs, newImages];

		
		fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, ' '));
		fs.writeFileSync(imgsFilePath, JSON.stringify(finalImgs, null, ' '));
		
		res.redirect('/products/list');
	},

	// Update - Form to edit
	edit: (req, res) => {
		//console.log("estoy en edit");
		let pdtoID = req.params.productId;
		// console.log(pdtoID)		
		let productToEdit = products.find(product => product.id == pdtoID);
	
		// console.log(productToEdit);
		res.render('productEdit', {productToEdit,products,thousandGenerator: toThousand })


	},

		// Update - Method to update
	update: (req, res) => {
		// console.log('estoy en update')
		let pdtoID = req.params.productId;
		let productToEdit = products.find(product => product.id == pdtoID)

		req.body.priceCompra = Number(req.body.priceCompra);
		req.body.priceVenta = Number(req.body.priceVenta);
		req.body.stock = Number(req.body.stock);
		req.body.descuento = Number(req.body.descuento);
		req.body.idCategory = Number(req.body.idCategory);
		productToEdit = {
			id: productToEdit.id,
			...req.body,
			category: categories.find(x=> x.id == req.body.idCategory).name,
			//image: productToEdit.image,
		};
		
		let newProducts = products.map(product => {
			if (product.id == productToEdit.id) {
				return product = {...productToEdit};
			}
			return product;
		})

		fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, ' '));
		res.redirect('/products/list');
	},

	destroy: (req, res) => {
		console.log(req.url);
		let productId = req.params.productId;
		let finalProducts = products.filter(pdto => pdto.id != productId);
		let finalImgs = imgs.filter(img => img.idProducto != productId);
		fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, ' '));
		fs.writeFileSync(imgsFilePath, JSON.stringify(finalImgs, null, ' '));
        res.redirect('/products/list');
	}
};

module.exports = controller;