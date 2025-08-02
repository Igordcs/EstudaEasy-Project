import Sequelize, { Model } from 'sequelize';

export default class ContentClasses extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
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
}
