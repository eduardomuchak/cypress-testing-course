describe('tasks page', () => {
  it('should render the main image', () => {
    cy.visit('http://localhost:5173');
    cy.get('h1').should('have.text', 'React Tasks');
  });
});
