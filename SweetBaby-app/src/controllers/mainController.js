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

		//console.log(req.productosInCarrito)
		//console.log('root ' + req.rol)
		res.render('index', 
		{usuario:req.nomCompleto,
		total:req.productosInCarrito, 
		rol: req.rol
	} );

	},
	carrito: async (req, res, next) => {

		// const user = await db.User.findByPk(req.session.user, {
        //     include: [{association: 'carritos'}]
		// })

		// let carritoID
		// if(user.carritos && user.carritos.find(x=> x.status == "ACTUAL")) {
		// 	carritoID =	user.carritos.find(x=> x.status == "ACTUAL").id;
		// }

		let carrito = await db.Carrito.findByPk(req.carritoId, {
			include: [{
				association: 'productos',
				include: {
					association: 'imgs'
				}
			}]
		})
		 
		if (!carrito){
			let carritoID;
			await db.Carrito.create({
				id_user: req.session.user,
				status: "ACTUAL"
			}).then((result) => {
				carritoID = result.id;
			});
			req.session.carritoId = carritoID;
			req.carritoId = req.session.carritoId;
			return res.redirect ('/carrito')
		}
		
		//console.log(carrito.productos)
		let productsAgregados= carrito.productos
		// if(carrito.find(x=> x.idUser == req.session.user)) {
		// 	productsComprados = carrito.find(x=> x.idUser == req.session.user).productsArray.map(x=> {
		// 		return {
		// 			...products.find(y => y.id == x.id),
		// 			imgs : imgs.filter(y => y.idProducto == x.id)
		// 		}
		// 	});
		// }

		// console.log(productsAgregados.reduce((a, b) => a + (Number(b['price_venta']) || 0), 0))
		res.render('carrito', {		
			idCarrito : req.carritoId,
			products: productsAgregados,
			totalAmount: Number(productsAgregados.reduce((a, b) => a + (Number(b['price_venta']) || 0), 0)),
			thousandGenerator: toThousand,
			usuario:req.nomCompleto,
			total:req.productosInCarrito,
			rol: req.rol
		});
	},

	addCarrito: async (req, res, next) => {

		let user = await db.User.findByPk(req.session.user, {
            include: [{association: 'carritos'}]
		})

		let carritoID
		if(user.carritos.length == 0) {
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

		req.session.productosCount++;
		req.productosInCarrito = req.session.productosCount;
		req.session.carritoId = carritoID;
		req.carritoId = req.session.carritoId;
		
		res.redirect('/products/');
	},

	removeProductCarrito: async (req, res, next) => {

		await db.ProductosCarrito.destroy({
			where: { 
				id_product: req.query.idProduct,
				id_carrito: req.params.idCarrito
			}
		})
		
		req.session.productosCount--;
		req.productosInCarrito = req.session.productosCount;
		
		res.redirect('/carrito');
	},

	user: (req, res,next) => {
	
		res.render('loggin',
			{
				error: null,
				total:0
			},
		);
	},
	logOff: (req,res,next)=>{

		req.session.user = null;
		res.cookie('recordame', null, { maxAge: -1 });
		req.session.nomYape= null
		req.session.carritoId = null;
		req.session.productosCount = 0;
		req.productosInCarrito = req.session.productosCount;
		res.render('loggin',{
			error: null,
			total:0
		},
		
		);
		
	}
};

module.exports = controller;