it('testa a página da política de privacidade de forma independente', function(){
    cy.visit('./src/privacy.html')
    cy.get('#title')
    .should('have.value', '')
    cy.get('#white-background')
    .should('have.value', '')
    cy.contains('Talking About Testing')
        .should('be.visible')
})