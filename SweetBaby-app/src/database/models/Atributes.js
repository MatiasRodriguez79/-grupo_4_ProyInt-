
module.exports = (sequelize, dataTypes) => {  
let alias = "Atributos";
let cols = {
    id: {
        type : dataTypes.INTEGER,
        primaryKey : true,
        autoIncrement: true
    },

    rol : {
        type: dataTypes.STRING
    },

    description : {
        type: dataTypes.STRING
    },
    
}

let config = {
    tableName : "atributes",
    timestamps: false}   

    let Atributos = sequelize.define(alias, cols, config)


 //   Categoria.associate = function(models) {
    
   //     Producto.hasMany(models.Producto, {
     //       as: 'prod',
       //     foreignKey: 'id_category',
        //});
    //};

    return Atributos;
}
