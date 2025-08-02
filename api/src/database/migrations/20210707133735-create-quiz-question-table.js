'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('content_questions', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    content_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'quiz_contents',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    resume_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'class_resumes',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    statement: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    alternatives: {
      type: Sequelize.TEXT,
      allowNull: false,
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

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
