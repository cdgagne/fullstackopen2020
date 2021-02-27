describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.get('form#login-form')
    cy.get('input#username')
    cy.get('input#password')
    cy.get('button#login-button')
  })
})