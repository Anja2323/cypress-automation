/// <reference types="Cypress" />



describe('login test', () => {
    it('visit gallery app', () => {
        cy.visit('https://gallery-app.vivifyideas.com/');
        cy.url().should('eq', 'https://gallery-app.vivifyideas.com/');
        cy.wait(500);
    })
    it('click on login button', () =>{
        cy.get('a[href="/login"]').click();
        cy.wait(500);
    })
    it('login with no email ', () => {
        cy.visit('/login');
        cy.url().should('include', '/login');
        cy.get('#password').type('kakosimiti23');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/login');
        cy.wait(1000);
    })
    it('login with invalid email (no @ )', () => {
        cy.visit('/login');
        cy.url().should('include', '/login');
        cy.get('#email').type('jelenajelena861yahoo.com');
        cy.get('#password').type('kakosimiti23');
        cy.get('button[type="submit"]').click();
        cy.wait(1000);
    })
    it('login with invalid email (no .com )', () => {
        cy.visit('/login');
        cy.url().should('include', '/login');
        cy.get('#email').type('jelenajelena86@yahoo');
        cy.get('#password').type('kakosimiti23');
        cy.get('button[type="submit"]').click();
        cy.wait(1000);
    })
    it('login with no password', () => {
        cy.visit('/login');
        cy.url().should('include', '/login');
        cy.get('#email').type('jelenajelena861@yahoo.com');
        cy.get('button[type="submit"]').click();
        cy.wait(1000);
    })
    
    it('login with invalid password (no numbers)', () => {
        cy.visit('/login');
        cy.url().should('include', '/login');
        cy.get('#email').type('jelenajelena861@yahoo.com');
        cy.get('#password').type('kakosimiti');
        cy.get('button[type="submit"]').click();
        cy.wait(1000);
    })
    

    it('login with invalid password (only 3 chars )', () => {
        cy.visit('/login');
        cy.url().should('include', '/login');
        cy.get('#email').type('jelenajelena861@yahoo.com');
        cy.get('#password').type('kak');
        cy.get('button[type="submit"]').click();
        cy.wait(1000);
    })

    it('login with no password and email', () => {
        cy.visit('/login');
        cy.url().should('include', '/login');
        cy.get('button[type="submit"]').click();
        cy.wait(1000);
    })
       
    it('login with valid credentials', () => {
        cy.visit('/login');
        cy.url().should('include', '/login');
        cy.get('#email').type('jelenajelena861@yahoo.com');
        cy.get('#password').type('kakosimiti23');
        cy.get('button[type="submit"]').click();
        cy.wait(1000);
    })
    it('logout', () =>{
        //cy.wait(500);
        cy.get("a[class='nav-link nav-buttons']").should('have.length', 3);
        cy.get("a[class='nav-link nav-buttons']").eq(2).click();
    })
    
})