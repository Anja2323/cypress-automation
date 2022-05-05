class AllGallery {
    get allGalleryheading(){
        return cy.get("h1");
    }
    get searchInput () {
        return cy.get("input");
    } 
    get filter (){
        return cy.get (".btn").first();
    }
    get singleGallery (){
        return cy.get (".cell");
    }
    get loadMore (){
        return cy.get (".btn").last();
    }
    
    search (url){
        this.searchInput.type(url);
        this.filter.click();
        
    }
}
export const allgalleries = new AllGallery();