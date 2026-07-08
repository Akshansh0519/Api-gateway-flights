'use strict';
const {
  Model
} = require('sequelize');

const { USER_ROLE_ENUMS } = require('../utils/Enums');
const { ADMIN, CUSTOMER, FLIGHT_COMPANY } = USER_ROLE_ENUMS;
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.User, {
        through: models.User_Role,
        as: 'user',
        foreignKey: 'role_id',
        otherKey: 'user_id'
      });
    }
  }
  Role.init({
    name: {
      type : DataTypes.ENUM(ADMIN, CUSTOMER, FLIGHT_COMPANY),
      allowNull : false,
      defaultValue : CUSTOMER
    }
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};