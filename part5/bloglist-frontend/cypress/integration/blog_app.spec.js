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

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testuser', password: 'testpassword' })
    })

    it('A blog can be created', function() {
      // Can enter a new blog
      cy.contains('New Blog').click()
      cy.get('input#blogTitle').type('A New Blog Entry')
      cy.get('input#blogAuthor').type('Some Authors Name')
      cy.get('input#blogUrl').type('http://the-blog-url')
      cy.contains('Create').click()

      // A notification is displayed
      cy.get('.info').should('contain', 'A new blog \'A New Blog Entry\' by Some Authors Name added')
      cy.get('.info').should('have.css', 'color', 'rgb(0, 128, 0)')

      // The blog entry is in the list of blogs
      cy.get('.blogTitleAndAuthor').should('contain', 'A New Blog Entry Some Authors Name')
    })
  })
})