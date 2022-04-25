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
        field: 'user_seq',
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
      registerType: {
        field: 'register_type',
        type: DataTypes.STRING,
      },
      snsType: {
        field: 'sns_type',
        type: DataTypes.STRING,
      },
      userProfileImage: {
        field: 'user_profile_image',
        type: DataTypes.STRING,
      },
      state: {
        type: DataTypes.STRING,
      },
      locale: {
        type: DataTypes.STRING,
      },
      fileSeq: {
        field: 'file_seq',
        type: DataTypes.INTEGER,
      },
      notification: {
        type: DataTypes.BOOLEAN,
      },
      fileDetailSeq: {
        field: 'file_detail_seq',
        type: DataTypes.INTEGER,
      },
      point: {
        type: DataTypes.INTEGER,
      },
      lastActionAt: {
        field: 'last_action_at',
        type: DataTypes.DATE,
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
