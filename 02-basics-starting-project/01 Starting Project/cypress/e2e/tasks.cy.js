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
});
