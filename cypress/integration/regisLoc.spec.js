const loc = require("../fixtures/locators.json");
import { faker } from "@faker-js/faker";
describe("Register with locators", () => {
  before("visit register", () => {
    cy.visit("/register");
  });
  let registerData = {
    firstName: "",
    lastName: "",
    randomEmail: "",
    password: "",
  };
  beforeEach(() => {
    registerData.firstName = faker.name.firstName();
    registerData.lastName = faker.name.lastName();
    registerData.randomEmail = faker.internet.email();
    registerData.password = faker.internet.password();
  });

  it("register with valid data", () => {
    cy.get(loc.Registration.firstName).type(registerData.firstName);
    cy.get(loc.Registration.lastName).type(registerData.lastName);
    cy.get(loc.Registration.Email).type(registerData.randomEmail);
    cy.get(loc.Registration.Pass).type(registerData.password);
    cy.get(loc.Registration.PassConf).type(registerData.password);
    cy.get(loc.Registration.Check).check();
    cy.get(loc.Registration.terms).click();
    cy.url().should("not.include", "/register");
  });
});
