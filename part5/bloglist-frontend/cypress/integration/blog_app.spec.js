describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'testuser',
      password: 'testpassword'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.get('form#login-form')
    cy.get('input#username')
    cy.get('input#password')
    cy.get('button#login-button')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('input#username').type('testuser')
      cy.get('input#password').type('testpassword')
      cy.get('button#login-button').click()
      cy.contains('Test User is logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('input#username').type('testuser')
      cy.get('input#password').type('wrongpassword')
      cy.get('button#login-button').click()
      cy.get('.error').should('contain', 'Wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})