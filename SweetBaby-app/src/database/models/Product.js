

module.exports = function (sequelize, dataTypes){
let alias = "Producto";

let cols = {
    id: {
        type : dataTypes.INTEGER,
        primaryKey : true,
        autoIncrement: true
    },

    id_category: {
        type: dataTypes.INTEGER,
        foreignKey: true,
    },

    name : {
        type: dataTypes.STRING
    },

    price_venta : {
        type: dataTypes.INTEGER
    },
    
    price_compra : {
        type: dataTypes.INTEGER
    },
    created_date: {
        type: dataTypes.DATE
    },
    stock : {
        type: dataTypes.INTEGER
    },
    discount : {
        type: dataTypes.INTEGER
    },
    cuotas : {
        type: dataTypes.STRING
    },
    description : {
        type: dataTypes.STRING
    },
    adicional_info : {
        type: dataTypes.STRING
    },
   
}

let config = {
    tableName : "products",
    timestamps: false}   

    let Producto = sequelize.define(alias, cols, config);

    Producto.associate = function(models) {
        
        Producto.hasMany(models.Image, {
            as: 'imgs',
            foreignKey: 'id_product',
        });

        Producto.hasMany(models.ProductosCarrito, {
            as: 'product_Carrito',
            foreignKey: 'id_product'
        });
        Producto.belongsTo(models.Categoria, {
            as: 'categ',
            foreignKey: 'id_category'
            });
    };

    return Producto;
}
