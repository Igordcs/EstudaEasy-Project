"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class ClassResume extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      name: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Campo nome deve ter entre 3 e 255 caracteres',
          },
        },
      },
      sections: {
        type: _sequelize2.default.TEXT,
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
} exports.default = ClassResume;
