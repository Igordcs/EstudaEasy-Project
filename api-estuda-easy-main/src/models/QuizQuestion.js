import Sequelize, { Model } from 'sequelize';

export default class QuizQuestion extends Model {
  static init(sequelize) {
    super.init({
      statement: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 555],
            msg: 'Campo nome deve ter entre 3 e 555 caracteres',
          },
        },
      },
      alternatives: {
        type: Sequelize.TEXT,
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
}
