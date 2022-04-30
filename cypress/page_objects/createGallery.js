class CreateGallery {
  get title() {
    return cy.get("#title");
  }
  get description() {
    return cy.get("#description");
  }
  get imageUpload() {
    return cy.get("");
  }
  get button() {
    return cy.get("button");
  }
  create(title, description) {
    this.Title.type(title);
    this.Descr.type(description);
    this.button.click();
  }
}
export const crtgl = new CreateGallery();
