class AllGallery {
    get search () {
        return cy.get(".form-control");
    } 
    get filter (){
        return cy.get (".btn btn-outline-secondary input-button");
    }
    get loadmore (){
        return cy.get (".btn btn-custom")
    }
    allgalleries (url){
        this.search.type(url);
        this.filter.click();
        this.loadmore.click();
    }
}
export const allgall = new AllGallery();