import Sequelize, { Model } from 'sequelize';

export default class ClassResume extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Campo nome deve ter entre 3 e 255 caracteres',
          },
        },
      },
      sections: {
        type: Sequelize.TEXT,
        get: function () {
          return JSON.parse(this.getDataValue('sections'));
        },
        set: function (value) {
          this.setDataValue('sections', JSON.stringify(value));
        },
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo alternatives deve ter entre 3 e 555 caracteres',
          },
        },
      },
    }, {
      sequelize,
      tableName: 'class_resumes',
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.ContentClasses, { foreignKey: 'content_classes_id' });
  }
}
