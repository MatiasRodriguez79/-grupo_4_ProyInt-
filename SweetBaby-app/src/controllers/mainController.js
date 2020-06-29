const fs = require('fs');
const path = require('path');
const db = require('../database/models');

const carritoFilePath = path.join(__dirname, '../data/carrito.json');
const carrito = JSON.parse(fs.readFileSync(carritoFilePath, 'utf-8'));

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const imgsFilePath = path.join(__dirname, '../data/images.json');
const imgs = JSON.parse(fs.readFileSync(imgsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

let usuario = '';
const controller = {
	root: (req, res, next) => {
		
		res.render('index', 
		{usuario:req.nomCompleto} );

	},
	carrito: async (req, res, next) => {

		const user = await db.User.findByPk(req.session.user, {
            include: [{association: 'carritos'}]
		})

		let carritoID
		if(!user.carritos && user.carritos.includes(x=> x.status == "ACTUAL")) {
			carritoID =	user.carritos.find(x=> x.status == "ACTUAL").id;
		}

		let carrito = await db.Carrito.findByPk(carritoID, {
			include: [{association: 'productos'}]
		})

		let productsComprados = carrito.productos;
		// if(carrito.find(x=> x.idUser == req.session.user)) {
		// 	productsComprados = carrito.find(x=> x.idUser == req.session.user).productsArray.map(x=> {
		// 		return {
		// 			...products.find(y => y.id == x.id),
		// 			imgs : imgs.filter(y => y.idProducto == x.id)
		// 		}
		// 	});
		// }

		res.render('carrito', {			
			products: productsComprados,
			totalAmount: productsComprados.reduce((a, b) => a + (b['priceVenta'] || 0), 0),
			thousandGenerator: toThousand,
			usuario:req.nomCompleto
		});
	},

	addCarrito: async (req, res, next) => {

		let user = await db.User.findByPk(req.session.user, {
            include: [{association: 'carritos'}]
		})

		let carritoID
		if(!user.carritos) {
			await db.Carrito.create({
				id_user: req.session.user,
				status: "ACTUAL"
			}).then((result) => {
				carritoID = result.id;
			});
		}
		else {
			carritoID =	user.carritos.find(x=> x.status == "ACTUAL").id;
		}

		await db.ProductosCarrito.create({
			id_carrito: carritoID,
			id_product: req.query.idProducto
		});

		
		res.redirect('/products/');
	},

	user: (req, res,next) => {
	
		res.render('loggin',
			{
				error: null
			},
		);
	},
	logOff: (req,res,next)=>{

		req.session.user = null;
		res.cookie('recordame', null, { maxAge: -1 });
		req.session.nomYape= null
		res.render('loggin',{
			error: null
		},
		
		);
		
	}
};

module.exports = controller;