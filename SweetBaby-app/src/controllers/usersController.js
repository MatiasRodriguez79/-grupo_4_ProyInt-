const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	register: (req, res, next) => {
		// console.log(req.body);
		const newUser = {
            id: users[users.length - 1].id + 1,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
			password: bcrypt.hashSync(req.body.passwordRegister1, 10),
			category: 'user',
            email: req.body.emailRegister1
            // avatar: req.files[0].filename
		};
		console.log(newUser);
		const userToSave = [...users, newUser];
        fs.writeFileSync(usersFilePath, JSON.stringify(userToSave, null, ' '));
        
		res.redirect('/');
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
        console.log (user.id);
        usuarioLogueado = user.id
        req.session.user = usuarioLogueado;
		res.redirect('/');
    },
    
};

module.exports = controller;