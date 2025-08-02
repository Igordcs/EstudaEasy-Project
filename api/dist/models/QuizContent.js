"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class QuizContent extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      content_name: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Campo name deve ter entre 3 e 255 caracteres',
          },
        },
      },
      content_type: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Campo nome deve ter entre 3 e 255 caracteres',
          },
        },
      },
    }, {
      sequelize,
      tableName: 'quiz_contents'
    });

    return this;
  }
} exports.default = QuizContent;
