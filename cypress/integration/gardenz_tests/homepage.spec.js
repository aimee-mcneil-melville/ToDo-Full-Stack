describe('Home', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/#/')
    // evenutally this will be the deployed heroku app: 'https://pohutukawa-gardenz.herokuapp.com/'
    cy.getReact('Nav').contains('Sign in').click()
  })
})
