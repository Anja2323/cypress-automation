import { loginPage } from "../page_objects/loginPage";

describe("login POM", () => {
  it("login with invalid data", () => {
    cy.intercept({
      method:'POST',
      url: 'https://gallery-api.vivifyideas.com/api/auth/login'
    }).as('unsuccessfulLogin');
    cy.visit("/login");
    cy.url().should('contains', '/login')
    loginPage.loginHeading.should('have.text', 'Please login');
    loginPage.emailInput.type("jelenajelena861@yahoo.com");
    loginPage.passwordInput.type("kakosimiti231");
    loginPage.submitBtn.click();
    cy.wait('@unsuccessfulLogin').then(interception =>{
      console.log('RESPONSE', interception);
      expect(interception.response.statusCode).eq(401);
      expect(interception.response.statusMessage).eq('Unauthorized');
    })
    loginPage.errorMessage.should('be.visible')
                           .and('have.text', 'Bad Credentials')
                           .and('have.css', 'background-color', 'rgb(248, 215, 218)');
    cy.url().should('include', '/login');
    //loginPage.login('jelenajelena861@yahoo.com', 'kakosimiti23')
  })
  });
  it("login with valid data", () => {
    cy.intercept({
      method:'POST',
      url: 'https://gallery-api.vivifyideas.com/api/auth/login'
    }).as('successfulLogin');
    cy.visit("/login");
    cy.url().should('contains', '/login')
    loginPage.loginHeading.should('have.text', 'Please login');
    loginPage.emailInput.type("jelenajelefna861@yahoo.com");
    loginPage.passwordInput.type("kakosimiti23");
    loginPage.submitBtn.click();
    //loginPage.login('jelenajelena861@yahoo.com', 'kakosimiti23')
    cy.wait('@successfulLogin').then(interception =>{
      console.log('RESPONSE', interception);
      expect(interception.response.statusCode).eq(200);
      expect(interception.response.body.user_id).eq(135);
    
  });
  })
