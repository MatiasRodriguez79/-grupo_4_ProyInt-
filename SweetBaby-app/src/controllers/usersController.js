const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	register: (req, res, next) => {

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
// console.log(req.files[0]);
		const newUser = {
            id: users[users.length - 1].id + 1,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
			password: bcrypt.hashSync(req.body.passwordRegister1, 10),
			category: 'user',
            email: req.body.emailRegister1,
            avatar: typeof req.files[0] === "undefined" ? 'default-image.png' : req.files[0].filename
        };
        
        const userToSave = [...users, newUser];
        fs.writeFileSync(usersFilePath, JSON.stringify(userToSave, null, ' '));

        // console.log(newUser.id);
        usuarioLogueado = newUser.id
        usuarioNombre = newUser.firstName + ' ' + newUser.lastName    
        req.session.user = usuarioLogueado;
        req.session.nomYape = usuarioNombre;
        res.cookie('recordame', usuarioLogueado, { maxAge : 60000})

		res.redirect('/');
    },

    registerGet: (req, res, next) => {

        // const user = users.find((user) => {
        //     return user.id == req.session.user;
        // });
        // res.render('profile', {
        //     user: user,
        //     error: null
        // });


		res.render('register', {
            error: null
        });
    },

    profile: (req, res, next) => {
       
        const user = users.find((user) => {
            return user.id == req.session.user;
        });
        res.render('profile', {
            user: user,
            error: null,
            usuario:req.nomCompleto
        });
    },
    
	login: (req, res, next) => {
		const email = req.body.email;
        const password = req.body.password;

        const user = users.find((user) => {
            return user.email == email;
        });

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
        //console.log (user.id);
        usuarioLogueado = user.id
        usuarioNombre = user.firstName + ' ' + user.lastName
        req.session.user = usuarioLogueado;
        req.session.nomYape =usuarioNombre

        if (typeof req.body.recordame !== "undefined"){

           // console.log ('guardo cookie de ' + usuarioLogueado)
            res.cookie('recordame', usuarioLogueado, { maxAge : 60000})
         
        }
		res.redirect('/');
    },

    update: (req, res, next) => {
        let newUser = users.find((user) => {
            return user.id == req.session.user;
        });

        newUser.firstName = req.body.firstName;
        newUser.lastName = req.body.lastName;
       // console.log(newUser);
        let newUsers = users.map(user => {
			if (user.id == newUser.id) {
				return user = {...newUser};
			}
			return user;
		})

        fs.writeFileSync(usersFilePath, JSON.stringify(newUsers, null, ' '));
        res.redirect('/');
    },

    updatePass: (req, res, next) => {
        let newUser = users.find((user) => {
            return user.id == req.session.user;
        });

        if(req.body.passwordRegister1 != req.body.passwordRegister2) {
            return res.render('profile', {
                user: newUser,
                error: 'Las contraseñas no coinciden, por favor vuelva a intentarlo.'
            });   
       
        }

        newUser.password = bcrypt.hashSync(req.body.passwordRegister1, 10);

        let newUsers = users.map(user => {
			if (user.id == newUser.id) {
				return user = {...newUser};
			}
			return user;
		})

        fs.writeFileSync(usersFilePath, JSON.stringify(newUsers, null, ' '));
        res.redirect('/');
    },
    
};

module.exports = controller;