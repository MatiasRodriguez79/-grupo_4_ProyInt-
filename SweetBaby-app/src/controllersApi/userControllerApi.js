const db = require('../database/models');

const controller = {

    listarUsersApi: async (req,res)=> {
       
        //let userList= await db.sequelize.query ('Select first_name, lasta_name, email from users')
        //let count = await db.User.count()

        let userList= await db.User.findAndCountAll({
            attributes: ['first_name', 'lasta_name', 'email']
            })
    
		const users=  {
            count: userList.count, 
            users: userList.rows          
        }	  
		  res.json(users);
	},

    // Detalle de producto por ID
    detailPorIdApi: async (req, res, next) => {

    let user = await db.User.findByPk(req.params.userId, {
        include: [{association: 'atributo'}],
        attributes: ['first_name', 'lasta_name', 'email']
    });
   
    res.json (user);
},
};

module.exports = controller;