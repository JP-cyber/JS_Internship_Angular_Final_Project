import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HeroApiResponse } from "../interfaces";

@Injectable({providedIn: 'root'})
export class HeroService {

    private apiBase: string = `https://superheroapi.com/api.php/${environment.heroApi}`;
    private heroes: string[] = [];

    constructor(private http: HttpClient) {}

    getHero(hero: string):Observable<HeroApiResponse> {
        return this.http.get<HeroApiResponse>(`${this.apiBase}/search/${hero}`);
    }

    selectHero(id: string): void {
        this.heroes = [...this.heroes, id]
        localStorage.setItem( 'selectedHeroes', JSON.stringify(this.heroes) );
    }

    getSelectedHeroes(): string[] {
        return this.heroes;
    }

}