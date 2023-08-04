module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
    Role.associate = function(models) {
        Role.hasMany(models.User, {
            foreignKey: 'role_id'
        });
    };
    return Role;
  }