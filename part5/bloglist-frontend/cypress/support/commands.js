Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('bloglistUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createBlog', ({ username, password, title, author, url }) => {
  console.log('username', username)
  console.log('password', password)
  cy.request('POST', 'http://localhost:3001/api/login', {
    username, password
  }).then(({ body }) => {
    const bloglistUser = JSON.parse(JSON.stringify(body)).token
    const postbody = { title: title, author: author, url: url }
    cy.request({
        headers: {
          'Authorization': `bearer ${bloglistUser}`
        },
        method: 'POST',
        url: 'http://localhost:3001/api/blogs',
        body: postbody,
      }).then(() => {
        cy.visit('http://localhost:3000')
    })
  })
})