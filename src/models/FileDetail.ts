'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize: any, DataTypes: any) => {
  class FileDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  FileDetail.init(
    {
      fileDetailSeq: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'file_detail_seq',
      },
      fileSeq: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
        field: 'file_seq',
      },
      originalFileName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
        field: 'original_file_name',
      },
      pathFileName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
        field: 'path_file_name',
      },
      fileName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
        field: 'file_name',
      },
      basePath: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
        field: 'base_path',
      },
      fileType: {
        type: DataTypes.STRING,
        field: 'file_type',
      },
      fileSize: {
        type: DataTypes.INTEGER,
        field: 'file_size',
      },
    },
    {
      sequelize,
      modelName: 'FileDetail',
      underscored: true,
      freezeTableName: true,
      // db 테이블 명
      tableName: 'pizza_file_detail',
    },
  );
  return FileDetail;
};
