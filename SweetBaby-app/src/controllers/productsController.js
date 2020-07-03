const fs = require('fs');
const path = require('path');
const db = require('../database/models');

// const productsFilePath = path.join(__dirname, '../data/products.json');
// const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const categoriesFilePath = path.join(__dirname, '../data/categories.json');
const categories = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf-8'));

const imgsFilePath = path.join(__dirname, '../data/images.json');
const imgs = JSON.parse(fs.readFileSync(imgsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

let usuario = '';

const controller = {

	// List - Show all products Table
	list: async (req, res) => {

		usuario= req.nomCompleto

		res.render('productsList',{
			usuario,
			products: await db.Producto.findAll({
				include: [{association: 'categ'}]
			  }),
			thousandGenerator: toThousand,	
			total:req.productosInCarrito
		});
	},

	// Root - Show all products
	root: async (req, res, next) => {

		const categories = await db.Categoria.findAll();
		usuario= req.nomCompleto
		let pagina = 0;
		let pag = Number(req.params.pag);
		if (pag) {
			pagina = (req.params.pag - 1) * 9;
		} else {
			pag = 1
		}

		const totalProductos = await db.Producto.count('id')
		let products = await db.Producto.findAll({
			include: [{association: 'imgs'}],
			limit: 9,
			offset: pagina
		});

		var categoriaSelected = await db.Categoria.findByPk(req.query.cat);
		res.render('products',{
			usuario,
			categories: categories,
			currentUrl: req.query.cat ? ("?cat=" + req.query.cat ): "",
			products: products.filter(x => req.query.cat ? x.id_category == req.query.cat : x),
			titleCategory: req.query.cat ? categoriaSelected.name : "Todas las categorías",
			thousandGenerator: toThousand,
			total:req.productosInCarrito,
			totalProductos,
			pag
		});
	},

	// Detail - Detail from one product
	detail: async (req, res, next) => {

		usuario= req.nomCompleto
		let product = await db.Producto.findByPk(req.params.productId, {
			include: [{association: 'imgs'}],
		});
		res.render('productDetail',{
			product: product,
			thousandGenerator: toThousand,
			usuario,
			total:req.productosInCarrito
		});
	},
	// Create - Form to create
	/*create: (req, res) => {
		res.render('productAdd.ejs', {
			products,
			thousandGenerator: toThousand
		});
	},*/
	createDb: async(req, res) => {
		usuario= req.nomCompleto
		
		const categories = await db.Categoria.findAll();
		const products= await db.Producto.findAll();
     	res.render('productAdd.ejs', {
			 	products:products,
				categories: categories,
				thousandGenerator: toThousand,
				total:req.productosInCarrito,
			    usuario});     
	},

	/*
	store: (req, res, next) => {
		//console.log ('estoy en store');
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
	},*/

	storeDb: async (req, res, next) => {
		let productId;
		await db.Producto.create ({
			id_category : Number(req.body.idCategory),
			name: (req.body.name),
			price_venta: Number(req.body.priceVenta),
			price_compra: Number(req.body.priceCompra),
			created_date: (req.body.dateAlta),
			discount: Number(req.body.descuento),
			cuotas:(req.body.cuotas),
			stock: Number(req.body.stock),
			description: (req.body.descripcion),
			adicional_info: (req.body.infoAdic)
		}).then((result) => {
            productId = result.id;
		});

		let orderImg = 1;
		await req.files.forEach(element => {
			var imageData = fs.readFileSync(path.join(__dirname, '../../public/images/products/') + (element.filename));
			db.Image.create ({
				id_product : productId,
				img: imageData,
				order: orderImg++
			});
		});
		
		res.redirect('/products/list');
	},

	// Update - Form to edit
	edit: async (req, res) => {

		let pdtoID = req.params.productId;
		let productToEdit = await db.Producto.findByPk(pdtoID);
		const categories = await db.Categoria.findAll();
		res.render('productEdit', {productToEdit,categories,thousandGenerator: toThousand,
			total:req.productosInCarrito, usuario: req.nomCompleto })
	},

	

		// Update - Method to update
	update: (req, res) => {

		let pdtoID = req.params.productId;
		// let productToEdit = products.find(product => product.id == pdtoID)

		db.Producto.update({
			id_category : Number(req.body.idCategory),
			name: (req.body.name),
			price_venta: Number(req.body.priceVenta),
			price_compra: Number(req.body.priceCompra),
			created_date: (req.body.dateAlta),
			discount: Number(req.body.descuento),
			cuotas:(req.body.cuotas),
			stock: Number(req.body.stock),
			description: (req.body.descripcion),
			adicional_info: (req.body.infoAdic)
		}, { where: {
			id: pdtoID
		}});

		// req.body.priceCompra = Number(req.body.priceCompra);
		// req.body.priceVenta = Number(req.body.priceVenta);
		// req.body.stock = Number(req.body.stock);
		// req.body.descuento = Number(req.body.descuento);
		// req.body.idCategory = Number(req.body.idCategory);
		// productToEdit = {
		// 	id: productToEdit.id,
		// 	...req.body,
		// 	category: categories.find(x=> x.id == req.body.idCategory).name,
		// 	//image: productToEdit.image,
		// };
		
		// let newProducts = products.map(product => {
		// 	if (product.id == productToEdit.id) {
		// 		return product = {...productToEdit};
		// 	}
		// 	return product;
		// })

		// fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, ' '));
		
		res.redirect('/products/list');
	},

	/*
	destroy: (req, res) => {
		// console.log(req.url);
		let productId = req.params.productId;
		let finalProducts = products.filter(pdto => pdto.id != productId);
		let finalImgs = imgs.filter(img => img.idProducto != productId);
		fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, ' '));
		fs.writeFileSync(imgsFilePath, JSON.stringify(finalImgs, null, ' '));
		res.redirect('/products/list');	
	},*/
	destroydb: async(req, res) =>{
		await db.Producto.destroy({
            where: {
                id: req.params.productId
			}		
	});
	
		await db.Image.destroy({
			where: {
				id_product: req.params.productId
				
			}	
	});
        res.redirect('/products/list');
	}
};

module.exports = controller;