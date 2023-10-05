describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/ethix') 
    cy.visit('/bonds') 
    cy.visit('/stake') 
    cy.contains('Show details')
  })
})