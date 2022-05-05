import { loginPage } from "../page_objects/loginPage";

describe("login POM", () => {
  it("login with invalid data", () => {
    cy.visit("/login");
    cy.url().should('contains', '/login')
    loginPage.loginHeading.should('have.text', 'Please login');
    loginPage.emailInput.type("jelenajelena861@yahoo.com");
    loginPage.passwordInput.type("kakosimiti231");
    loginPage.submitBtn.click();
    loginPage.errorMessage.should('be.visible')
                           .and('have.text', 'Bad Credentials')
                           .and('have.css', 'background-color', 'rgb(248, 215, 218)');
    cy.url().should('include', '/login');
    //loginPage.login('jelenajelena861@yahoo.com', 'kakosimiti23')
    
  });
  xit("login with valid data", () => {
    cy.visit("/login");
    cy.url().should('contains', '/login')
    loginPage.loginHeading.should('have.text', 'Please login');
    loginPage.emailInput.type("jelenajelena861@yahoo.com");
    loginPage.passwordInput.type("kakosimiti23");
    loginPage.submitBtn.click();
    //loginPage.login('jelenajelena861@yahoo.com', 'kakosimiti23')
    
  });
});
