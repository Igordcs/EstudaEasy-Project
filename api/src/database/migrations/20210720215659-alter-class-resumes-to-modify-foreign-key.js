'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Só adiciona a coluna se ela não existir
    const table = await queryInterface.describeTable('class_resumes');
    if (!table['content_classes_id']) {
      return queryInterface.addColumn('class_resumes', 'content_classes_id', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'content_classes',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
    }
    return Promise.resolve();
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
