const loc = require("../fixtures/locators.json");

describe("Login with locators", () => {
  before("visit login page", () => {
    cy.visit("/login");
  });

  it("login with valid data", () => {
    cy.get(loc.Login.emailInput).type("jelenajelena861@yahoo.com");
    cy.get(loc.Login.passwordInput).type("kakosimiti23");
    cy.get(loc.Login.submitBtn).click();
    cy.url().should("not.include", "/login");
  });
  it("logout", () => {
    cy.get(loc.Logout.LogoutBtn).click();
  });
});
