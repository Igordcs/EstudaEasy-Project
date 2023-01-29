module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('user_notes', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: Sequelize.STRING(860),
      allowNull: false,
    },
    answer: {
      type: Sequelize.STRING(860),
      allowNull: false,
    },
    color: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    user_id: {
      type: Sequelize.BIGINT,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('fotos'),
};
