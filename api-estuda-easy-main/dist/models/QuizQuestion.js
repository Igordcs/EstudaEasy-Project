"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class QuizQuestion extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      statement: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 555],
            msg: 'Campo nome deve ter entre 3 e 555 caracteres',
          },
        },
      },
      alternatives: {
        type: _sequelize2.default.TEXT,
        get: function () {
          return JSON.parse(this.getDataValue('alternatives'));
        },
        set: function (value) {
          this.setDataValue('alternatives', JSON.stringify(value));
        },
        defaultValue: '',
        validate: {
          len: {
            args: [3, 555],
            msg: 'Campo nome deve ter entre 3 e 555 caracteres',
          },
        },
      },
    }, {
      sequelize,
      tableName: 'content_questions'
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.QuizContent, { foreignKey: 'content_id' });
    this.belongsTo(models.ClassResume, { foreignKey: 'resume_id' });
  }
} exports.default = QuizQuestion;
