/// <reference types="Cypress" />

describe('tasks page', () => {
  it('should render the main image', () => {
    cy.visit('http://localhost:5173');
    cy.get('.main-header img').should('be.visible');
  });

  it('should display the page title', () => {
    cy.visit('http://localhost:5173');
    cy.get('.main-header h1').should('be.visible');
    cy.get('.main-header h1').contains('React Tasks');
  });
});
