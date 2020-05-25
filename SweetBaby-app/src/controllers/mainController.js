const fs = require('fs');
const path = require('path');

const controller = {
	root: (req, res, next) => {
		res.render('index');
	},
	carrito: (req, res, next) => {
		res.render('carrito');
	},
	user: (req, res, next) => {
		res.render('sign-in');
	},
};

module.exports = controller;