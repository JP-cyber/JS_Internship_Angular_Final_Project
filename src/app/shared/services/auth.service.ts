import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FbAuthResponse, User } from "../interfaces";
import { Observable, Subject, throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { environment } from "src/environments/environment";
import { RecentSearchesService } from "./recent-searches.service";
import { ErrorService } from "./error.service";
import { HeroService } from "./hero.service";
import { BattleService } from "./battle.service";

enum StorageKeys{
    token = 'fb-token',
    tokenExp = 'fb-token-exp'
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiBase: string = 'https://identitytoolkit.googleapis.com/v1';
    error$: Subject<string> = new Subject<string>();

    constructor(
        private http: HttpClient,
        private searches: RecentSearchesService,
        private heroes:HeroService,
        private battles: BattleService
        ) {}

    get token(): string {
        const expDate = new Date(
            localStorage.getItem(StorageKeys.tokenExp)
        );

        if(new Date() > expDate){
            this.logout();
            return null;
        }
        return localStorage.getItem(StorageKeys.token);
    }

    login(user: User): Observable<any> {
        user.returnSecureToken = true;
        return this.http.post(`${this.apiBase}/accounts:signInWithPassword?key=${environment.apiKey}`, user)
        .pipe(
            tap(this.setToken),
            catchError(ErrorService.handleError.bind(this))
        );
    }

    logout(): void {
        localStorage.removeItem(StorageKeys.token);
        localStorage.removeItem(StorageKeys.tokenExp);
        this.searches.removeSearches();
        this.heroes.clearSelectedHeroes();
        this.battles.clearBattleInfo();
    }

    isAuthanticated(): boolean {
        return !!this.token;
    }

    setUser(user: User): Observable<any> {
        localStorage.setItem(user.userName, user.email);
        return this.http.post
        (`${this.apiBase}/accounts:signUp?key=${environment.apiKey}`,
        {
            email: user.email,
            password: user.password,
            returnSecureToken: true
        })
    }
    
    private setToken(response: FbAuthResponse): void {
        const timeOffset = new Date().getTime() + +response.expiresIn * 1000;
        const expiresDate = new Date(timeOffset);
        localStorage.setItem(StorageKeys.token, response.idToken);
        localStorage.setItem(StorageKeys.tokenExp, expiresDate.toString() );
    }
}