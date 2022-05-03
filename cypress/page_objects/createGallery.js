class CreateGallery {
  get title() {
    return cy.get("#title");
  }
  get description() {
    return cy.get("#description");
  }
  get imageUpload() {
    return cy.get(".input-group.mb-3 > .form-control");
  }
  get submit() {
    return cy.get("/html//div[@id='app']//form/button[1]");
  }
  get cancel() {
    return cy.get("/html//div[@id='app']//form/button[2]");
  }
  get add() {
    return cy.get("/html//div[@id='app']//form/div[3]/button[@type='button']");
  }
  get up() {
    return cy.get(".fas fa-chevron-circle-up");
  }
  get down() {
    return cy.get(".fas fa-chevron-circle-down");
  }
  get delete() {
    return cy.get(".fas fa-trash");
  }
  create(Title, Description, url) {
    this.title.type(Title);
    this.description.type(Description);
    this.imageUpload.type.type(url);
    this.add.click();
    this.up.click();
    this.down.click();
    this.submit.click();
  }
}
export const crtgl = new CreateGallery();
