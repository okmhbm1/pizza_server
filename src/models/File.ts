'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize: any, DataTypes: any) => {
  class File extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      this.hasMany(models.FileDetail, {
        foreignKey: 'file_seq',
        as: 'file_detail',
      });
    }
  }
  File.init(
    {
      file_seq: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: 'File',
      underscored: true,
      freezeTableName: true,
      // db 테이블 명
      tableName: 'pizza_file',
    },
  );
  return File;
};
