import { allgalleries } from "../page_objects/allGallery"; 
describe ('All Galleries test', () => {
    beforeEach('visit All Galleries page',() =>{
        cy.visit('/');
    })
    it('validate page', () => {
        
        allgalleries.allGalleryheading
        .should('be.visible')
        .and('have.text', "All Galleries")

    })
    it('all galleries diplaying correctly', ()=>{
        allgalleries.singleGallery
        .should('be.visible')
        .and('have.length', 10)

    })
    it('10 more galleries loading', () =>{
        allgalleries.singleGallery.should('have.length', 10);
        allgalleries.loadMore.click();
        allgalleries.singleGallery.should('have.length',20);
        allgalleries.loadMore.click();
        allgalleries.singleGallery.should('have.length',30);
        allgalleries.loadMore.click();
        allgalleries.singleGallery.should('have.length',40);
    })
    it('redirect to single gallery page',() =>{
        allgalleries.singleGallery.first().find('a').first().click();
        cy.url().should('include', '/galleries');

    })
    it('redirect to author\'s gallery page',() =>{
        allgalleries.singleGallery.first().find('a').last().click();
        cy.url().should('include', '/authors');
    })
    it('search returning correct results',() =>{
        allgalleries.singleGallery.should('have.length',10);
        allgalleries.search('Product Security Architect');
        allgalleries.singleGallery.should('have.length', 1);
        allgalleries.singleGallery
        .find('a')
        .first()
        .should('have.text','Product Security Architect');
    })
})