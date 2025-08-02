'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Limpar todas as tabelas relacionadas antes de inserir
    await queryInterface.bulkDelete('content_questions', null, {truncate: true, cascade: true, restartIdentity: true});
    await queryInterface.bulkDelete('class_resumes', null, {truncate: true, cascade: true, restartIdentity: true});
    await queryInterface.bulkDelete('user_notes', null, {truncate: true, cascade: true, restartIdentity: true});
    await queryInterface.bulkDelete('fotos', null, {truncate: true, cascade: true, restartIdentity: true});
    await queryInterface.bulkDelete('content_classes', null, {truncate: true, cascade: true, restartIdentity: true});
    await queryInterface.bulkDelete('contents_teach', null, {truncate: true, cascade: true, restartIdentity: true});
    await queryInterface.bulkDelete('quiz_contents', null, {truncate: true, cascade: true, restartIdentity: true});
    await queryInterface.bulkDelete('users', null, {truncate: true, cascade: true, restartIdentity: true});
    // Usuário
    await queryInterface.bulkInsert('users', [{
      id: 1,
      nome: 'Usuário Teste',
      email: `usuario@teste.com`,
      password_hash: '123456',
      experience: 0,
      level: 1,
      created_at: new Date(),
      updated_at: new Date()
    }], {});

    // QuizContent
    await queryInterface.bulkInsert('quiz_contents', [{
      id: 1,
      content_name: 'Quiz Teste',
      content_type: 'exatas',
      created_at: new Date(),
      updated_at: new Date()
    }], {});

    // ContentTeach
    await queryInterface.bulkInsert('contents_teach', [{
      id: 1,
      name: 'Ensino Teste',
      filename: 'arquivo.pdf',
      created_at: new Date(),
      updated_at: new Date()
    }], {});

    // ContentClasses
    await queryInterface.bulkInsert('content_classes', [{
      id: 1,
      name: 'Classe Teste',
      content_teach_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    }], {});

    // Foto
    await queryInterface.bulkInsert('fotos', [{
      id: 1,
      originalname: 'imagem_teste.jpg',
      filename: 'imagem_teste.jpg',
      user_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    }], {});

    // ClassResume
    await queryInterface.bulkInsert('class_resumes', [{
      id: 1,
      name: 'Resumo Teste',
      content_classes_id: 1,
      sections: JSON.stringify(['Seção 1', 'Seção 2']),
      created_at: new Date(),
      updated_at: new Date()
    }], {});

    // QuizQuestion
    await queryInterface.bulkInsert('content_questions', [{
      id: 1,
      content_id: 1,
      resume_id: 1,
      statement: 'Pergunta Teste?',
      alternatives: JSON.stringify(['A', 'B', 'C', 'D']),
      created_at: new Date(),
      updated_at: new Date()
    }], {});

    // Notes
    await queryInterface.bulkInsert('user_notes', [{
      id: 1,
      text: 'Nota de teste',
      answer: 'Resposta teste',
      color: '#FF0',
      user_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('class_resumes', null, {});
    await queryInterface.bulkDelete('user_notes', null, {});
    await queryInterface.bulkDelete('content_questions', null, {});
    await queryInterface.bulkDelete('quiz_contents', null, {});
    await queryInterface.bulkDelete('fotos', null, {});
    await queryInterface.bulkDelete('contents_teach', null, {});
    await queryInterface.bulkDelete('content_classes', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};
