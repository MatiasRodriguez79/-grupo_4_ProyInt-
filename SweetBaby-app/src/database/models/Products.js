

module.exports = function (sequelize, dataTypes){
let alias = "Products";

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
        type: dataTypes.DECIMAL
    },
    
    price_compra : {
        type: dataTypes.DECIMAL
    },
    created_date: {
        type: dataTypes.DECIMAL
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
    timesTamps: false}   

    let products = sequelize.define (alias, cols, config)
    return products;
}
