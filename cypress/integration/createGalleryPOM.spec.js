import { loginPage } from "../page_objects/loginPage";
import { createGallery } from "../page_objects/createGallery";

describe("Create Gallery page", () => {
  beforeEach("", () => {
    cy.visit("/login");
    loginPage.login("jelenajelena861@yahoo.com", "kakosimiti23");
    cy.wait(1000);
    cy.visit("/create");
  });
  it("validate page", () => {
    createGallery.createGalleryHeading
      .should("be.visible")
      .and("have.text", "Create Gallery");
  });
  it("no title", () => {
    createGallery.description.type("bla");
    createGallery.imageUpload.type(
      "https://staticsensa.mondo.rs/Picture/34702/jpeg/cvet-simbol-ljubavi-vecnosti-novog-zivota-dom-kala_454755673.jpg"
    );
    createGallery.submit.click();
    cy.url().should("include", "/create");
    createGallery.title.should("be.empty");
  });
  it("1 char title", () => {
    cy.intercept({
      method: "POST",
      url: "https://gallery-api.vivifyideas.com/api/galleries",
    }).as("titleWithOneChar");
    createGallery.title.type("k");
    createGallery.description.type("bla");
    createGallery.imageUpload.type(
      "https://staticsensa.mondo.rs/Picture/34702/jpeg/cvet-simbol-ljubavi-vecnosti-novog-zivota-dom-kala_454755673.jpg"
    );
    createGallery.submit.click();
    createGallery.alert
      .should("have.text", "The title must be at least 2 characters.")
      .and("have.css", "background-color", "rgb(248, 215, 218)")
      .and("have.css", "color", "rgb(114, 28, 36)");
    cy.url().should("include", "/create");
    createGallery.title.should("have.value", "k");
    cy.wait("@titleWithOneChar").then((interception) => {
      console.log("RESPONSE", interception);
      expect(interception.response.statusCode).eq(422);
      expect(interception.response.body.message).eq(
        "The given data was invalid."
      );
    });
  });
  it(" title with more than 255 chars", () => {
    cy.intercept({
      method: "POST",
      url: "https://gallery-api.vivifyideas.com/api/galleries",
    }).as("255chars");
    createGallery.title.type(
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et"
    );
    createGallery.description.type("bla");
    createGallery.imageUpload.type(
      "https://staticsensa.mondo.rs/Picture/34702/jpeg/cvet-simbol-ljubavi-vecnosti-novog-zivota-dom-kala_454755673.jpg"
    );
    createGallery.submit.click();
    createGallery.alert
      .should("have.text", "The title may not be greater than 255 characters.")
      .and("have.css", "background-color", "rgb(248, 215, 218)")
      .and("have.css", "color", "rgb(114, 28, 36)");
    cy.url().should("include", "/create");
    cy.wait("@255chars").then((interception) => {
      console.log("RESPONSE", interception);
      expect(interception.response.statusCode).eq(422);
      expect(interception.response.statusMessage).eq("Unprocessable Entity");
    });
  });
  it("login no description", () => {
    cy.intercept({
      method: "POST",
      url: "https://gallery-api.vivifyideas.com/api/galleries",
    }).as("noDescription");
    createGallery.title.type("klp");
    createGallery.imageUpload.type(
      "https://staticsensa.mondo.rs/Picture/34702/jpeg/cvet-simbol-ljubavi-vecnosti-novog-zivota-dom-kala_454755673.jpg"
    );
    createGallery.submit.click();
    cy.wait("@noDescription").then((interception) => {
      console.log("RESPONSE", interception);
      expect(interception.response.statusCode).eq(201);
    });
    createGallery.description.should("be.empty");
    cy.url().should("include", "/");
  });
it("description more than 1000 chars", () => {
    cy.intercept({
      method: "POST",
      url: "https://gallery-api.vivifyideas.com/api/galleries",
    }).as("1000chars");
    createGallery.title.type("klp");
    createGallery.description.type(
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero. Cras id dui. Aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede. Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo pellentesque facilisis. Etiam imperdiet imperdiet orci. Nunc nec neque. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Maecenas malesuada. Praesent congue erat at massa. Sed cursus turpis vitae tortor. Donec posuere vulputate arcu. Phasellus accumsan cursus velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed aliquam, nisi quis porttitor congue, elit erat euismod orci, ac placerat dolor lectus quis orci. Phasellus consectetuer vestibulum elit. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc. Vestibulum fringilla pede sit amet augue. In turpis. Pellentesque posuere. Praesent turpis. Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Donec elit libero, sodales nec, volutpat a, suscipit non, turpis. Nullam sagittis. Suspendisse pulvinar, augue ac venenatis condimentum, sem libero volutpat nibh, nec pellentesque velit pede quis nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce id purus. Ut varius tincidunt libero. Phasellus dolor. Maecenas vestibulum mollis diam. Pellentesque ut neque. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. In ac felis quis tortor malesuada pretium. Pellentesque auctor neque nec urna. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Aenean viverra rhoncus pede. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut non enim eleifend felis pretium feugiat. Vivamus quis mi. Phasellus a est. Phasellus magna. In hac habitasse platea dictumst. Curabitur at lacus ac velit ornare lobortis. Curabitur a felis in nunc fringilla tristique. Morbi mattis ullamcorper velit. Phasellus gravida semper nisi. Nullam vel sem. Pellentesque libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Sed hendrerit. Morbi ac felis. Nunc egestas, augue at pellentesque laoreet, felis eros vehicula leo, at malesuada velit leo quis pede. Donec interdum, metus et hendrerit aliquet, dolor diam sagittis ligula, eget egestas libero turpis vel mi. Nunc nulla. Fusce risus nisl, viverra et, tempor et, pretium in, sapien. Donec venenatis vulputate lorem. Morbi nec metus. Phasellus blandit leo ut odio. Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem. Sed magna purus, fermentum eu, tincidunt eu, varius ut, felis. In auctor lobortis lacus. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna. Vestibulum ullamcorper mauris at ligula. Fusce fermentum. Nullam cursus lacinia erat. Praesent blandit laoreet nibh. Fusce convallis metus id felis luctus adipiscing. Pellentesque egestas, neque sit amet convallis pulvinar, justo nulla eleifend augue, ac auctor orci leo non est. Quisque id mi. Ut tincidunt tincidunt erat. Etiam feugiat lorem non metus. Vestibulum dapibus nunc ac augue. Curabitur vestibulum aliquam leo. Praesent egestas neque eu enim. In hac habitasse platea dictumst. Fusce a quam. Etiam ut purus mattis mauris sodales aliquam. Curabitur nisi. Quisque malesuada placerat nisl. Nam ipsum risus, rutrum vitae, vestibulum eu, molestie vel, lacus. Sed augue ipsum, egestas nec, vestibulum et, malesuada adipiscing, dui. Vestibulum facilisis, purus nec pulvinar iaculis, ligula mi congue nunc, vitae euismod ligula urna in dolor. Mauris sollicitudin fermentum libero. Praesent nonummy mi in odio. Nunc interdum lacus sit amet orci. Vestibulum rutrum, mi nec elementum vehicula, eros quam gravida nisl, id fringilla neque ante vel mi. Morbi mollis tellus ac sapien. Phasellus volutpat, metus eget egestas mollis, lacus lacus blandit dui, id egestas quam mauris ut lacus. Fusce vel dui. Sed in libero ut nibh placerat accumsan. Proin faucibus arcu quis ante. In consectetuer turpis ut velit. Nulla sit amet est. Praesent metus tellus, elementum eu, semper a, adipiscing nec, purus. Cras risus ipsum, faucibus ut, ullamcorper id, varius ac, leo. Suspendisse feugiat. Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi. Praesent nec nisl a purus blandit viverra. Praesent ac massa at ligula laoreet iaculis. Nulla neque dolor, sagittis eget, iaculis quis, molestie non, velit. Mauris turpis nunc, blandit et, volutpat molestie, porta ut, ligula. Fusce pharetra convallis urna. Quisque ut nisi. Donec mi odio, faucibus at, scelerisque quis, convallis"
    );
    createGallery.imageUpload.type(
      "https://staticsensa.mondo.rs/Picture/34702/jpeg/cvet-simbol-ljubavi-vecnosti-novog-zivota-dom-kala_454755673.jpg"
    );
    createGallery.submit.click();
    cy.wait("@1000chars").then((interception) => {
      console.log("RESPONSE", interception);
      expect(interception.response.statusCode).eq(422);
    });

    createGallery.alert
      .should(
        "have.text",
        "The description may not be greater than 1000 characters."
      )
      .and("have.css", "background-color", "rgb(248, 215, 218)")
      .and("have.css", "color", "rgb(114, 28, 36)");

    cy.url().should("include", "/");
  });
  it("no url", () => {

    createGallery.title.type("kdsffs");
    createGallery.description.type("bla");
    createGallery.submit.click();

    cy.url().should("include", "/create");
  });
  it("url with text", () => {
    createGallery.title.type("kgd");
    createGallery.description.type("bla");
    createGallery.imageUpload.type("dg");
    createGallery.submit.click();
    cy.url().should("include", "/create");
  });
  it("url without extension", () => {
    cy.intercept({
      method: "POST",
      url: "https://gallery-api.vivifyideas.com/api/galleries",
    }).as("createGalleryInvalidData");

    createGallery.title.type("kgd");
    createGallery.description.type("bla");
    createGallery.imageUpload.type(
      "https://staticsensa.mondo.rs/Picture/34702/jpeg/cvet-simbol-ljubavi-vecnosti-novog-zivota-dom-kala_454755673"
    );
    createGallery.submit.click();
    cy.wait("@createGalleryInvalidData").then((interception) => {
      except(interception.response.statusCode).eq(422);
      except(interception.response.body.message).eq(
        "The given data was invalid."
      );
    });
    createGallery.alert
      .should("have.text", "Wrong format of image")
      .and("have.css", "background-color", "rgb(248, 215, 218)")
      .and("have.css", "color", "rgb(114, 28, 36)");

    cy.url().should("include", "/create");
  });

  it("image svg format", () => {
    cy.intercept({
      method: "POST",
      url: "https://gallery-api.vivifyideas.com/api/galleries",
    }).as("svgFormat");

    createGallery.title.type("kdfg");
    createGallery.description.type("bla");
    createGallery.imageUpload.type(
      "https://upload.wikimedia.org/wikipedia/commons/b/b0/NewTux.svg"
    );
    createGallery.submit.click();
    createGallery.alert
      .should("have.text", "Wrong format of image")
      .and("have.css", "background-color", "rgb(248, 215, 218)")
      .and("have.css", "color", "rgb(114, 28, 36)");
      cy.wait("@svgFormat").then((interception) => {
        except(interception.response.statusCode).eq(422);
});cy.url().should("include", "/create");
  })
  xit("upload two images", () => {
    createGallery.title.type("kdfg");
    createGallery.description.type("bla");
    createGallery.imageUpload.type(
      "https://staticsensa.mondo.rs/Picture/34702/jpeg/cvet-simbol-ljubavi-vecnosti-novog-zivota-dom-kala_454755673.jpg"
    );
    createGallery.add.click();
    createGallery.imageTwo.type(
      "https://www.agroinfo.rs/uploads/Agroinfo/Hort.kultura/porcelanski-cvet.png"
    );
    createGallery.submit.click();
    cy.url().should("not.include", "/create");
  });
  it("delete the first  image", () => {
    createGallery.title.type("kdfg");
    createGallery.description.type("bla");
    createGallery.imageUpload.type(
      "https://staticsensa.mondo.rs/Picture/34702/jpeg/cvet-simbol-ljubavi-vecnosti-novog-zivota-dom-kala_454755673.jpg"
    );
    createGallery.add.click();
    createGallery.imageTwo.type(
      "https://www.agroinfo.rs/uploads/Agroinfo/Hort.kultura/porcelanski-cvet.png"
    );
    createGallery.delete.first().find("button").first().click();
    cy.get(".input").should("have.length", 0);
    createGallery.submit.click();
    cy.url().should("not.include", "/create");
  });
  xit("move the 2nd image up", () => {
    createGallery.title.type("kdfg");
    createGallery.description.type("bla");
    createGallery.imageUpload.type(
      "https://staticsensa.mondo.rs/Picture/34702/jpeg/cvet-simbol-ljubavi-vecnosti-novog-zivota-dom-kala_454755673.jpg"
    );
    createGallery.add.click();
    createGallery.imageTwo.type(
      "https://www.agroinfo.rs/uploads/Agroinfo/Hort.kultura/porcelanski-cvet.png"
    );
    createGallery.up.find("button").eq(1).click();
    createGallery.submit.click();
    cy.url().should("not.include", "/create");
  });
  it.only("move the 1st image down", () => {
   
    createGallery.title.type("kdfg");
    createGallery.description.type("bla");
    createGallery.imageUpload.type(
      "https://staticsensa.mondo.rs/Picture/34702/jpeg/cvet-simbol-ljubavi-vecnosti-novog-zivota-dom-kala_454755673.jpg"
    );
    createGallery.add.click();
  

    createGallery.imageTwo.type(
      "https://www.agroinfo.rs/uploads/Agroinfo/Hort.kultura/porcelanski-cvet.png"
    );
    createGallery.down.find("button").eq(2).click();
    createGallery.submit.click();
    cy.url().should("not.include", "/create");
  });
  it("check if cancel button works", () => {
    cy.intercept({
      method: "POST",
      url: "https://gallery-api.vivifyideas.com/api/galleries",
    }).as("cancelBtn");
    createGallery.title.type("kdfg");
    createGallery.description.type("bla");
    createGallery.imageUpload.type(
      "https://staticsensa.mondo.rs/Picture/34702/jpeg/cvet-simbol-ljubavi-vecnosti-novog-zivota-dom-kala_454755673.jpg"
    );
    createGallery.cancel.click();
    cy.wait("@cancelBtn").then((interception) => {
      console.log("RESPONSE", interception);
      expect(interception.response.statusCode).eq(201);
      expect(interception.response.statusMessage).eq("Created");

    
  });cy.url().should("include", "/");
})
  it("create gallery with valid data", () => {
    cy.intercept({
      method: "POST",
      url: "https://gallery-api.vivifyideas.com/api/galleries",
    }).as("createGallery");

    createGallery.create(
      "hello",
      "flower",
      "https://staticsensa.mondo.rs/Picture/34702/jpeg/cvet-simbol-ljubavi-vecnosti-novog-zivota-dom-kala_454755673.jpg"
    );
    cy.wait("@createGallery").then((interception) => {
      console.log("RESPONSE", interception);
      expect(interception.response.statusCode).eq(201);

      expect(interception.response.statusMessage).eq("Created");
      expect(interception.response.body.title).eq("hello");

      cy.url().should("not.include", "/create");
    });
  });
});
