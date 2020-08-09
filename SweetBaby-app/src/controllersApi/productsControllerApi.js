const db = require('../database/models');

const controller = {

    listarProductosApi: async (req,res)=> {
        let apiProducts = 'http://localhost:3001/api/products/';
        let countByCategory= await db.sequelize.query ('Select cat.id, cat.name, Count(p.id_category) cantidad_productos from products p inner join categories cat on(cat.id = p.id_category) group by p.id_category')
        let productsList= await db.Producto.findAndCountAll({
            include: [{association: 'categ'}],
           // group: "id_category",
            order: [['id', 'ASC']] 
            })
    
         for (let i= 0; i< productsList.rows.length; i++){
            //console.log(apiProducts + productsList.rows[i].id)
            productsList.rows[i].setDataValue('detail', apiProducts + productsList.rows[i].id)     
        }
        
		const products=  {
            count: productsList.count, 
            countByCategory: countByCategory[0],
            products: productsList.rows
        }	  
          //res.json(products);     
          const productsFinal = {
            meta: {
                status: 200,
                url: '/api/products',
            },
            data: products
            }
            res.json(productsFinal);
    },
    
    // Detalle de producto por ID
    detailPorIdApi: async (req, res, next) => {

        let product = await db.Producto.findByPk(req.params.productId, {
            include: [{association: 'imgs'},{association: 'categ'}],
        });
       
        res.json (product);
        },
};
    module.exports = controller;