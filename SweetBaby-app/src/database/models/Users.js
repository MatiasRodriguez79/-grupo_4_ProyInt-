module.exports = (sequelize, dataTypes) => {
    const cols = {
      id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      first_name: {
        type: dataTypes.STRING
      },
      lasta_name: {
        type: dataTypes.STRING
      },
      password: {
        type: dataTypes.STRING
      },
      id_atribute: {
        type: dataTypes.INTEGER
      },
      email: {
        type: dataTypes.STRING
      },
      avatar: {
        type: dataTypes.BLOB,
        get() {
            if(this.getDataValue('avatar'))
                return 'data:image/png;base64,' + new Buffer(this.getDataValue('avatar'), 'binary').toString('base64');
            else
                return null;
        },
      }
    };
  
    const config = {
      tableName: 'users',
      timestamps: false
    }
  
    
    return sequelize.define('User', cols, config);
  }