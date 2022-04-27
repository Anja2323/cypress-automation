/// <reference types="Cypress" />



describe('login test', () => {
    xit('visit gallery app', () => {
        cy.visit('https://gallery-app.vivifyideas.com/');
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/');
    })
    xit('click on login button', () =>{
        cy.get('a[href="/login"]').click();
    })
    it.only('login with valid credentials', () => {
        cy.visit('/login');
        cy.url().should('include', '/login');
        cy.get('#email').type('jelenajelena861@yahoo.com');
        cy.get('#password').type('kakosimiti23');
        cy.get('button[type="submit"]').click();
    })
    it('logout', () =>{
        //cy.wait(500);
        cy.get("a[class='nav-link nav-buttons']").should('have.length', 3);
        cy.get("a[class='nav-link nav-buttons']").eq(2).click();
    })
    
})