import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class RecentSearchesService {

    private searches: string[] = [];

    updateSearches(): void {
        const localSearches = JSON.parse( localStorage.getItem('searches') );
        const isLocalSerchesBigEnough = localSearches && localSearches.length > this.searches.length;

        if(isLocalSerchesBigEnough){
            this.searches = localSearches;
        }
        
        localStorage.setItem('searches', JSON.stringify(this.searches) );
    }

    addSearch(search: string): void {
        const hasSearch = this.searches.includes(search);

        if(!hasSearch){
            this.searches.push(search);
            this.updateSearches();
        }else{
            return;
        }
    }

    getSearches(): string[] {
        return this.searches;
    }

    removeSearches(): void {
        localStorage.removeItem('searches');
    }
}