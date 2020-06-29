module.exports = (sequelize, dataTypes) => {
    const cols = {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      id_carrito: {
        type: dataTypes.INTEGER
      },
      id_product: {
        type: dataTypes.INTEGER
      }
    };
  
    const config = {
      tableName: 'products_carrito',
      timestamps: false
    }
  
    
    let ProductosCarrito = sequelize.define('ProductosCarrito', cols, config);

    ProductosCarrito.associate = function(models) {
        ProductosCarrito.belongsTo(models.Producto, {
            as: 'productos',
            foreignKey: 'id_product'
        });

        ProductosCarrito.belongsTo(models.Carrito, {
            as: 'carritos',
            foreignKey: 'id_carrito'
        });
    };
    

    return ProductosCarrito;
  }