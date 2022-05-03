import { loginPage } from "../page_objects/loginPage";

describe("login POM", () => {
  it("login with valid data", () => {
    cy.visit("/login");
    loginPage.emailInput.type("jelenajelena861@yahoo.com");
    loginPage.passwordInput.type("kakosimiti23");
    loginPage.submitBtn.click();
    //loginPage.login('jelenajelena861@yahoo.com', 'kakosimiti23')
  });
});
