import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HeroApiResponse, SingleHeroResponse } from "../interfaces";

@Injectable({providedIn: 'root'})
export class HeroService {

    private apiBase: string = `https://superheroapi.com/api.php/${environment.heroApi}`;
    private heroes: Array<string> = [];

    constructor(private http: HttpClient) {
        const selectedHeroes = JSON.parse( localStorage.getItem('selectedHeroes') );
        if(selectedHeroes){
            this.heroes = selectedHeroes;
        }else{
            const emptyArr = JSON.stringify([]);
            localStorage.setItem('selectedHeroes', emptyArr);
        }
    }

    getHeroes(hero: string):Observable<HeroApiResponse> {
        return this.http.get<HeroApiResponse>(`${this.apiBase}/search/${hero}`);
    }

    getHeroById(id: string): Observable<SingleHeroResponse> {
        return this.http.get<SingleHeroResponse>(`${this.apiBase}/${id}`);
    }

    toggleHero(id: string) {
        if(this.isHeroSelected(id)){
            const heroIndex = this.heroes.indexOf(id);
            this.heroes.splice(heroIndex, 1);
        }else{
            this.heroes.push(id);
        }
        
        localStorage.setItem( 'selectedHeroes', JSON.stringify(this.heroes) );
    }

    isHeroSelected(id: string) {
        if(this.heroes.includes(id)){
            return true;
        }
        return false;
    }

    isEmpty() {
        return this.heroes.length === 0;
    }

    getSelectedHeroes(): Array<string> {
        return this.heroes;
    }

}