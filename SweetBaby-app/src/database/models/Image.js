module.exports = (sequelize, dataTypes) => {
    const cols = {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      id_product: {
        type: dataTypes.INTEGER
      },
      img: {
        type: dataTypes.BLOB,
        get() {
            if(this.getDataValue('img'))
                return 'data:image/png;base64,' + new Buffer(this.getDataValue('img'), 'binary').toString('base64');
            else
                return null;
        },
      },
      order: {
        type: dataTypes.INTEGER
      }
    };
  
    const config = {
      tableName: 'images',
      timestamps: false
    }
  
    
    let Image = sequelize.define('Image', cols, config);

    // Image.associate = function(models) {
    //     Image.hasMany(models.Producto, {
    //         as: 'producto',
    //         foreignKey: 'id_product'
    //     });
    // };
    

    return Image;
  }