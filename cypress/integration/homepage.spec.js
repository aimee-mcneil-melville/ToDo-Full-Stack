/// <reference types="cypress" />

describe('Home', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    // evenutally this will be the deployed heroku app: 'https://pohutukawa-gardenz.herokuapp.com/'
  })

  it('Clicks garden button', () => {
    cy.get('.button')
      .contains('Garden')
      .click()

      .location().should((loc) => {
        expect(loc.hash).eq('#/garden')
      })
  })

  it('renders map image', () => {
    // get map image
    cy.get('div.column')
      .includes('src')
  })

  it('Click sign in', () => {
    // get nav component and click on sign in
    cy.getReact('Nav').contains('Sign in').click()

    // assert
    cy.location('pathname').should('include', 'signin')
  })
})
