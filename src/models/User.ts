'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  User.init(
    {
      userSeq: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'user_seq',
      },
      userEmail: {
        field: 'user_email',
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      userName: {
        field: 'user_name',
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      phoneNumber: {
        field: 'phone_number',
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      userProfileImage: {
        field: 'user_profile_image',
        type: DataTypes.STRING,
      },
      fileSeq: {
        field: 'file_seq',
        type: DataTypes.INTEGER,
      },
      fileDetailSeq: {
        field: 'file_detail_seq',
        type: DataTypes.INTEGER,
      },
      point: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'User',
      underscored: true,
      freezeTableName: true,
      // db 테이블 명
      tableName: 'pizza_user',
    },
  );
  return User;
};
