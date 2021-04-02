import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class RecentSearchesService {

    private searches: Array<string> = [];

    updateSearches() {
        const localSearches = JSON.parse( localStorage.getItem('searches') );
        if(localSearches && localSearches.length > this.searches.length){
            this.searches = localSearches;
        }
        
        localStorage.setItem('searches', JSON.stringify(this.searches) );
    }

    addSearch(search: string) {
        if( !this.searches.includes(search) ){
            this.searches.push(search);
            this.updateSearches();
        }else{
            return;
        }
    }

    getSearches() {
        return this.searches;
    }

    removeSearches() {
        localStorage.removeItem('searches');
    }
}