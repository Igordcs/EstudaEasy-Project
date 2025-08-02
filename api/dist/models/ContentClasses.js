"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class ContentClasses extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      name: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo name não pode ficar vazio.',
          },
        },
      },
    }, {
      sequelize,
      tableName: 'content_classes',
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.QuizContent, { foreignKey: 'content_teach_id' });
    this.hasMany(models.ClassResume, {foreignKey: 'content_classes_id' })
  }
} exports.default = ContentClasses;
