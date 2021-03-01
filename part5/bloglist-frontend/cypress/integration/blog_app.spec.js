describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user1 = {
      name: 'Test User',
      username: 'testuser',
      password: 'testpassword'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user1)

    const user2 = {
      name: 'Other Test User',
      username: 'otheruser',
      password: 'otherpassword'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user2)

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

  describe('When logged in', function() {
    beforeEach(function() {
      const username = 'testuser'
      const password = 'testpassword'
      cy.createBlog({
        username: username,
        password: password,
        title: 'An Existing Blog Entry',
        author: 'Yet Another Author',
        url: 'http://some-blog-url',
        likes: 0})
      cy.login({username: username, password: password})
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

    it('A blog can be liked', function() {
      cy.get('.blogTitleAndAuthor').find('button').click()
      cy.contains('likes 0')
      cy.get('.likeButton').click()
      cy.contains('likes 1')
    })

    it('A blog can be deleted', function() {
      cy.get('.blogTitleAndAuthor').contains('view').click()
      cy.get('.blogDetails').contains('remove').click() // Note - Cypress auto accepts alerts
      cy.get('.blogDetails').should('not.contain', 'A Blog Entry')
    })

    it('A blog cannot be deleted by another user', function() {
      cy.login({ username: 'otheruser', password: 'otherpassword' })
      cy.get('.blogTitleAndAuthor').contains('view').click()
      cy.get('.blogDetails').should('not.have.css', 'display', 'none')
    })
  })

  describe('When a lot of blogs exist', function() {
    beforeEach(function() {
      const username = 'testuser'
      const password = 'testpassword'
      cy.createBlog({
        username: username,
        password: password,
        title: 'A Blog Entry #1',
        author: 'Yet Another Author',
        url: 'http://some-blog-url',
        likes: 200 })
      cy.createBlog({
        username: username,
        password: password,
        title: 'A Blog Entry #2',
        author: 'Yet Another Author',
        url: 'http://some-blog-url',
        likes: 100 })
      cy.createBlog({
        username: username,
        password: password,
        title: 'A Blog Entry #3',
        author: 'Yet Another Author',
        url: 'http://some-blog-url',
        likes: 150 })
      cy.createBlog({
        username: username,
        password: password,
        title: 'A Blog Entry #4',
        author: 'Yet Another Author',
        url: 'http://some-blog-url',
        likes: 175 })
      cy.login({username: username, password: password})
    })

    it('Blogs are ordered by number of likes in descending order', function() {
      const likesOrder = ['likes 200', 'likes 175', 'likes 150', 'likes 100']

      cy.get('#root').find('.blog').should('have.length', 4).each(($el, index, $list) => {
        cy.wrap($el).get('.blogDetails').should('contain', likesOrder[index])
      })
    })
  })
})