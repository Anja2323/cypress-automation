/// <reference types="Cypress" />
describe('test register', () => {

    it('register without first name', () => {
        cy.visit('/register');
        cy.url().should('include', '/register');
        cy.get('#last-name').type('Krstic');
        cy.get('#email').type('axnjfamattucker@gmail.com');
        cy.get('#password').type('jasamanja23');
        cy.get('#password-confirmation').type('jasamanja23');
        cy.get('[type="checkbox"]').check();
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/register');
    })

    it('register without last name', () => {
        cy.visit('/register');
        cy.url().should('include', '/register');
        cy.get('#first-name').type('Anja');
        cy.get('#email').type('axnjfamattucker@gmail.com');
        cy.get('#password').type('jasamanja23');
        cy.get('#password-confirmation').type('jasamanja23');
        cy.get('[type="checkbox"]').check();
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/register');
        })

    it('register with invalid email(without @)', () => {
            cy.visit('/register');
            cy.url().should('include', '/register');
            cy.get('#first-name').type('Anja');
            cy.get('#last-name').type('Krstic');
            cy.get('#email').type('axnjfamattuckergmail.com');
            cy.get('#password').type('jasamanja23');
            cy.get('#password-confirmation').type('jasamanja23');
            cy.get('[type="checkbox"]').check();
            cy.get('button[type="submit"]').click();
            cy.url().should('include', '/register');
            })

    it('register with invalid password(no number)', () =>{
            cy.visit('/register');
            cy.url().should('include', '/register');
            cy.get('#first-name').type('Anja');
            cy.get('#last-name').type('Krstic');
            cy.get('#email').type('axnjfamattuckergmail.com');
            cy.get('#password').type('jasamanja');
            cy.get('#password-confirmation').type('jasamanja23');
            cy.get('[type="checkbox"]').check();
            cy.get('button[type="submit"]').click();
            cy.url().should('include', '/register');
            })
           
     it('register with invalid password(no password)', () =>{
                cy.visit('/register');
                cy.url().should('include', '/register');
                cy.get('#first-name').type('Anja');
                cy.get('#last-name').type('Krstic');
                cy.get('#email').type('axnjfamattuckergmail.com');
                cy.get('#password-confirmation').type('jasamanja23');
                cy.get('[type="checkbox"]').check();
                cy.get('button[type="submit"]').click();
                cy.url().should('include', '/register');
                })

                it('register with invalid password(1 char)', () =>{
                    cy.visit('/register');
                    cy.url().should('include', '/register');
                    cy.get('#first-name').type('Anja');
                    cy.get('#last-name').type('Krstic');
                    cy.get('#email').type('axnjfamattuckergmail.com');
                    cy.get('#password').type('j');
                    cy.get('#password-confirmation').type('jasamanja23');
                    cy.get('[type="checkbox"]').check();
                    cy.get('button[type="submit"]').click();
                    cy.url().should('include', '/register');
                    })
        
   

    it('register with valid data', () => {
        cy.visit('/register');
        cy.url().should('include', '/register');
        cy.get('#first-name').type('Anja');
        cy.get('#last-name').type('Krstic');
        cy.get('#email').type('axnjfamattucker@gmail.com');
        cy.get('#password').type('jasamanja23');
        cy.get('#password-confirmation').type('jasamanja23');
        cy.get('[type="checkbox"]').check();
        cy.get('button[type="submit"]').click();
        cy.url().should('not.include', '/register');
        })
    
})