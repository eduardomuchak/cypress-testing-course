/// <reference types="Cypress" />

describe('tasks management', () => {
  it('should open and close the new task modal', () => {
    cy.visit('http://localhost:5173');
    cy.get('button').contains('Add Task').click();
    cy.get('dialog').should('be.visible');
    cy.get('button').contains('Cancel').click();
    cy.get('dialog').should('not.exist');
    cy.get('button').contains('Add Task').click();
    cy.get('.backdrop').click({ force: true });
    cy.get('.backdrop').should('not.exist');
  });

  it('should create a new task', () => {
    cy.visit('http://localhost:5173');
    // Abrir modal
    cy.get('button').contains('Add Task').click();
    cy.get('dialog').should('be.visible');

    // Inserir dados
    cy.get('input[id="title"]').type('My new task');
    cy.get('textarea[id="summary"]').type('Some description for my new task');

    // Selecionar opção do select
    cy.get('select[id="category"]').select('low');

    // Clicar no botão de salvar
    cy.get('button').contains('Add Task').click();

    // Verifica se o modal foi fechado e se a nova tarefa foi criada
    cy.get('dialog').should('not.exist');
    cy.get('li div h2').contains('My new task').should('exist');
    cy.get('li div p')
      .contains('Some description for my new task')
      .should('exist');
  });

  it('should validate user input', () => {
    cy.visit('http://localhost:5173');
    // Abrir modal
    cy.get('button').contains('Add Task').click();
    cy.get('dialog').should('be.visible');

    // Inserir dados em apenas um campo
    cy.get('input[id="title"]').type('My new task');

    // Clicar no botão de salvar
    cy.get('button').contains('Add Task').click();

    // Verifica se o modal não foi fechado e se apareceu a mensagem de erro
    cy.get('dialog').should('be.visible');
    cy.get('.error-message')
      .contains('Please provide values for task title, summary and category!')
      .should('exist');
  });

  it('should filter tasks', () => {
    // Criar duas tarefas
    cy.visit('http://localhost:5173');
    // Abrir modal
    cy.get('button').contains('Add Task').click();
    cy.get('dialog').should('be.visible');

    // Inserir dados
    cy.get('input[id="title"]').type('My new task 1');
    cy.get('textarea[id="summary"]').type('Some description for my new task 1');

    // Selecionar opção do select
    cy.get('select[id="category"]').select('low');

    // Clicar no botão de salvar
    cy.get('button').contains('Add Task').click();

    // Verifica se o modal foi fechado e se a nova tarefa foi criada
    cy.get('dialog').should('not.exist');
    cy.get('li div h2').contains('My new task 1').should('exist');
    cy.get('li div p')
      .contains('Some description for my new task 1')
      .should('exist');

    // Abrir modal
    cy.get('button').contains('Add Task').click();
    cy.get('dialog').should('be.visible');

    // Inserir dados
    cy.get('input[id="title"]').type('My new task 2');
    cy.get('textarea[id="summary"]').type('Some description for my new task 2');

    // Selecionar opção do select
    cy.get('select[id="category"]').select('urgent');

    // Clicar no botão de salvar
    cy.get('button').contains('Add Task').click();

    // Verifica se o modal foi fechado e se a nova tarefa foi criada
    cy.get('dialog').should('not.exist');
    cy.get('li div h2').contains('My new task 2').should('exist');
    cy.get('li div p')
      .contains('Some description for my new task 2')
      .should('exist');

    // Verifica se as duas tarefas foram criadas
    cy.get('li').should('have.length', 2);

    // Filtrar por tarefas urgentes
    cy.get('select[id="filter"]').select('urgent');
    cy.get('li').should('have.length', 1);

    // Filtrar por tarefas de baixa prioridade
    cy.get('select[id="filter"]').select('low');
    cy.get('li').should('have.length', 1);

    // Filtrar por todas as tarefas
    cy.get('select[id="filter"]').select('all');
    cy.get('li').should('have.length', 2);
  });

  it('should add a multiple tasks', () => {
    cy.visit('http://localhost:5173');

    // Criar três tarefas
    // Abrir modal
    cy.get('button').contains('Add Task').click();
    cy.get('dialog').should('be.visible');

    // Inserir dados
    cy.get('input[id="title"]').type('My new task 1');
    cy.get('textarea[id="summary"]').type('Some description for my new task 1');

    // Selecionar opção do select
    cy.get('select[id="category"]').select('low');

    // Clicar no botão de salvar
    cy.get('button').contains('Add Task').click();

    // Verifica se o modal foi fechado e se a nova tarefa foi criada
    cy.get('dialog').should('not.exist');
    cy.get('li div h2').contains('My new task 1').should('exist');
    cy.get('li div p')
      .contains('Some description for my new task 1')
      .should('exist');

    // Abrir modal
    cy.get('button').contains('Add Task').click();
    cy.get('dialog').should('be.visible');

    // Inserir dados
    cy.get('input[id="title"]').type('My new task 2');
    cy.get('textarea[id="summary"]').type('Some description for my new task 2');

    // Selecionar opção do select
    cy.get('select[id="category"]').select('urgent');

    // Clicar no botão de salvar
    cy.get('button').contains('Add Task').click();

    // Verifica se o modal foi fechado e se a nova tarefa foi criada
    cy.get('dialog').should('not.exist');
    cy.get('li div h2').contains('My new task 2').should('exist');
    cy.get('li div p')
      .contains('Some description for my new task 2')
      .should('exist');

    // Abrir modal
    cy.get('button').contains('Add Task').click();
    cy.get('dialog').should('be.visible');

    // Inserir dados
    cy.get('input[id="title"]').type('My new task 3');
    cy.get('textarea[id="summary"]').type('Some description for my new task 3');

    // Selecionar opção do select
    cy.get('select[id="category"]').select('moderate');

    // Clicar no botão de salvar
    cy.get('button').contains('Add Task').click();

    // Verifica se o modal foi fechado e se a nova tarefa foi criada
    cy.get('dialog').should('not.exist');
    cy.get('li div h2').contains('My new task 3').should('exist');
    cy.get('li div p')
      .contains('Some description for my new task 3')
      .should('exist');

    // Verifica se as três tarefas foram criadas
    cy.get('li').should('have.length', 3);

    // Verifica se as três tarefas foram criadas na ordem correta
    cy.get('.task').eq(0).contains('My new task 1');
    cy.get('.task').eq(1).contains('My new task 2');
    cy.get('.task').eq(2).contains('My new task 3');
  });
});
