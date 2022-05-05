class CreateGallery {
  get createGalleryHeading(){
    return cy.get("h1");
  }
  get title() {
    return cy.get("#title");
  }
  get description() {
    return cy.get("#description");
  }
  get imageUpload() {
    return cy.get("input").eq(2);
  }
  get submit() {
    return cy.get(".btn").eq(0);
  }
  get cancel() {
    return cy.get(".btn").eq(1);
  }
  get add() {
    return cy.get("button[type='button']").last();
  }
  get up() {
    return cy.get(".input-group-append").last();
  }
  get down() {
    return cy.get(".input-group-append").first();
  }
  get delete() {
    return cy.get(".input-group-append");
  }
  get alert(){
    return cy.get('p[class="alert alert-danger"]');
  }
  get imageTwo() {
    return cy.get("input").last();
  }

  
  create(Title, Description, url) {
    this.title.type(Title);
    this.description.type(Description);
    this.imageUpload.type(url);
    this.submit.click();
  }
}
export const createGallery = new CreateGallery();
