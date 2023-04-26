/// <reference types="Cypress" />
Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function () {
        cy.visit('src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title()
            .should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste.'
        cy.get('#firstName')
            .type('Rafael')
        cy.get('#lastName')
            .type('Drumond')
        cy.get('#email')
            .type('drumond.rafael@hotmail.com')
        cy.get('#open-text-area')
            .type(longText, {delay:0})
        cy.contains('button', 'Enviar')
            .click()
        cy.get('.success')
            .should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#lastName')
            .type('Drumond')
        cy.get('#email')
            .type('drumond.rafael@hotmail.com')
        cy.get('#open-text-area')
            .type('Teste')
        cy.contains('button', 'Enviar')
            .click()
        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando digitado um valor não numérico', function() {
        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function (){
        cy.get('#firstName')
            .type('Rafael')
        cy.get('#lastName')
            .type('Drumond')
        cy.get('#email')
            .type('drumond.rafael@hotmail.com')
        cy.get('#phone-checkbox')
            .click()
        cy.get('#open-text-area')
            .type('Teste')
        cy.contains('button', 'Enviar')
            .click()
        cy.get('.error')
            .should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
            .type('Rafael')
            .should('have.value', 'Rafael')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Drumond')
            .should('have.value', 'Drumond')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('drumond.rafael@hotmail.com')
            .should('have.value', 'drumond.rafael@hotmail.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('31975412369')
            .should('have.value', '31975412369')
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('button', 'Enviar')
            .click()
        cy.get('.error')
            .should('be.visible', 'Valide os campos obrigatórios!')
    })
    it('envia o formulário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success')
            .should('be.visible')
    })
})
