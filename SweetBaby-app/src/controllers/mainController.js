const fs = require('fs');
const path = require('path');

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
		
		 //usuario= req.nomCompleto		
		//console.log ('hola main '+ usuario)
		res.render('index', 
		{usuario:req.nomCompleto} );

	},
	carrito: (req, res, next) => {
		// console.log(carrito.find(x=> x.idUser == 1).productsArray.map(x=> {
		// 	return {
		// 		...products.find(y => y.id == x.id),
		// 		imgs : imgs.filter(y => y.idProducto == x.id)
		// 	}
		// }));

		let productsComprados = [];
		if(carrito.find(x=> x.idUser == req.session.user)) {
			productsComprados = carrito.find(x=> x.idUser == req.session.user).productsArray.map(x=> {
				return {
					...products.find(y => y.id == x.id),
					imgs : imgs.filter(y => y.idProducto == x.id)
				}
			});
		}
		console.log ('estoye en carrito' + req.nomCompleto)
		res.render('carrito', {			
			products: productsComprados,
			totalAmount: productsComprados.reduce((a, b) => a + (b['priceVenta'] || 0), 0),
			thousandGenerator: toThousand,
			usuario:req.nomCompleto
		});
	},
	user: (req, res,next) => {
	
		console.log ('estoy en user')
		res.render('loggin',
		{
			error: null
		},
		//{usuario:req.nomCompleto}
		);
	},
	logOff: (req,res,next)=>{
		//console.log ('estoy en log off de ' + req.session.user) 
		//req.session.user = undefined;
		//req.cookies.recordame = undefined;
		req.session.user = null;
		res.cookie('recordame', null, { maxAge: -1 });
		req.session.nomYape= null
		//console.log ("limpio recordame "+req.session.user+req.cookies.recordame)
		res.render('loggin',{
			error: null
		},
		
		);
		
	}
};

module.exports = controller;