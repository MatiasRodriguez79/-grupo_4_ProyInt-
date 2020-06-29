const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const db = require('../database/models');

const controller = {
	register: async (req, res, next) => {

        if(req.body.emailRegister1 != req.body.emailRegister2) {
            return res.render('register', {
                error: 'Los e-mails no coinciden, por favor vuelva a intentarlo.'
            });   
       
        }

        if(req.body.passwordRegister1 != req.body.passwordRegister2) {
            return res.render('register', {
                error: 'Las contraseñas no coinciden, por favor vuelva a intentarlo.'
            });   
       
        }

        //Give any image name here.
        var imageData = fs.readFileSync(path.join(__dirname, '../../public/images/avatars/') + (typeof req.files[0] === "undefined" ? 'default-image.png' : req.files[0].filename));
        let userId;
        await db.User.create({
            first_name: req.body.firstName,
            lasta_name: req.body.lastName,
            password: bcrypt.hashSync(req.body.passwordRegister1, 10),
            id_atribute: 2,
            email: req.body.emailRegister1,
            avatar: imageData
        }).then((result) => {
            userId = result.id;
        });

        usuarioLogueado = userId
        usuarioNombre = req.body.firstName + ' ' + req.body.lastName    
        req.session.user = usuarioLogueado;
        req.session.nomYape = usuarioNombre;
        res.cookie('recordame', usuarioLogueado, { maxAge : 60000})

		res.redirect('/');
    },

    registerGet: (req, res, next) => {
		res.render('register', {
            error: null
        });
    },

    profile: async (req, res, next) => {
        const user = await db.User.findByPk(req.session.user)
        res.render('profile', {
            user: user,
            error: null,
            usuario:req.nomCompleto
        });
    },
    
	login: async (req, res, next) => {
		const email = req.body.email;
        const password = req.body.password;

        const user = await db.User.findOne({
            where: {
                email: email
            }
        })

        if (!user) {
            return res.render('loggin', {
                error: 'Usuario no encontrado!'
            });
        }
        if(!bcrypt.compareSync(password, user.password)) {
            return res.render('loggin', {
                error: 'Password incorrecto!'
            });   
       
        }
        usuarioLogueado = user.id
        usuarioNombre = user.first_name + ' ' + user.lasta_name
        req.session.user = usuarioLogueado;
        req.session.nomYape =usuarioNombre

        if (typeof req.body.recordame !== "undefined"){
            res.cookie('recordame', usuarioLogueado, { maxAge : 60000})
        }
		res.redirect('/');
    },

    update: async (req, res, next) => {
        db.User.update({
            first_name: req.body.firstName,
            lasta_name: req.body.lastName,
            id_atribute: 2
        }, {
            where: {
                id: req.session.user
            }
        })

        res.redirect('/');
    },

    updatePass: async (req, res, next) => {
        if(req.body.passwordRegister1 != req.body.passwordRegister2) {
            return res.render('profile', {
                user: newUser,
                error: 'Las contraseñas no coinciden, por favor vuelva a intentarlo.'
            });   
       
        }

        db.User.update({
            password: bcrypt.hashSync(req.body.passwordRegister1, 10)
        }, {
            where: {
                id: req.session.user
            }
        })

        res.redirect('/');
    },
    
};

module.exports = controller;