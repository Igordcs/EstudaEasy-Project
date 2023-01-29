import Sequelize, { Model } from 'sequelize';

export default class QuizContent extends Model {
  static init(sequelize) {
    super.init({
      content_name: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Campo name deve ter entre 3 e 255 caracteres',
          },
        },
      },
      content_type: {
        type: Sequelize.STRING,
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
}
