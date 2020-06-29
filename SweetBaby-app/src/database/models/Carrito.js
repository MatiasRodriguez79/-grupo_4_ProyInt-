module.exports = (sequelize, dataTypes) => {
    const cols = {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      id_user: {
        type: dataTypes.INTEGER
      },
      status: {
        type: dataTypes.STRING
      },
      modification_date: {
        type: dataTypes.DATE
      }
    };
  
    const config = {
      tableName: 'carrito',
      timestamps: false
    }
  
    
    let Carrito = sequelize.define('Carrito', cols, config);

    Carrito.associate = function(models) {
        Carrito.hasMany(models.ProductosCarrito, {
            as: 'product_Carrito',
            foreignKey: 'id_carrito'
        });

        Carrito.belongsToMany(models.Producto, {
            as: 'productos',
            through: 'products_carrito',
            foreignKey: 'id_carrito',
            otherKey: 'id_product',
            timestapms: false
        });
    };
    

    return Carrito;
  }