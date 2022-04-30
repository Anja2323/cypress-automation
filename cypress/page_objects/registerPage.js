class RegisterPage {
  get firstName() {
    return cy.get("#first-name");
  }
  get lastName() {
    return cy.get("#last-name");
  }
  get email() {
    return cy.get("#email");
  }
  get password() {
    return cy.get("#password");
  }
  get passConf() {
    return cy.get("#password-confirmation");
  }
  get terms(){
      return cy.get(":checkbox");
  }
  get button(){
      return cy.get("button");
  }

  register(firstname,lastname,email,passWord) {
    this.firstName.type(firstname);
    this.lastName.type(lastname);
    this.email.type(email);
    this.password.type(passWord);
    this.passConf.type(passWord);
    this.terms.click();
    this.button.click();
  }
}
export const rgPom = new RegisterPage();
