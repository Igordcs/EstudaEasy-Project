"use strict";'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.addColumn('class_resumes', 'content_classes_id',
    {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'content_classes',
          key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    },
  ),

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
