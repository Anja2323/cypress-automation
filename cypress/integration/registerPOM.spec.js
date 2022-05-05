import { rgPom } from "../page_objects/registerPage.js";
import { faker } from "@faker-js/faker";
describe("register POM", () => {
  let registerData = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(20, true, /[A-Z]/, "888"),
  };

  before("visit register page", () => {
    cy.visit("/register");
    cy.url().should("include", "/register");
  });

  it("register with invalid data,wrong email", () => {
    rgPom.registerHeading.should("have.text", "Register");
    rgPom.firstName.type("Aleksandra");
    rgPom.lastName.type("Krstic");
    rgPom.email.type("blablablabic@gmail");

    rgPom.password.type("kakosimiti23");
    rgPom.passConf.type("kakosimiti23");
    rgPom.terms.check();
    rgPom.button.click();
    rgPom.alertMsg
      .should("have.text", "The email must be a valid email address.")
      .and("have.css", "background-color", "rgb(248, 215, 218)")
      .and("have.css", "color", "rgb(114, 28, 36)");
    cy.url().should("include", "/register");
  });
  it("register with invalid data,wrong email", () => {
    rgPom.registerHeading.should("have.text", "Register");
    rgPom.firstName.type("Aleksandra");
    rgPom.lastName.type("Krstic");
    rgPom.email.type("blablablabic@gmail.com");

    rgPom.password.type("kakosimiti23");
    rgPom.passConf.type("kakosimiti23");
    rgPom.terms.check();
    rgPom.button.click();
    rgPom.alertMsg
      .should("have.text", "The email must be a valid email address.")
      .and("have.css", "background-color", "rgb(248, 215, 218)")
      .and("have.css", "color", "rgb(114, 28, 36)");
    cy.url().should("include", "/register");
  });
  xit("register with valid data", () => {
    rgPom.register(
      registerData.firstName,
      registerData.lastName,
      registerData.email,
      registerData.password
    );
  });
});
