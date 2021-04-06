import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FbAuthResponse, User } from "../interfaces";
import { Observable, Subject, throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    error$: Subject<string> = new Subject<string>();

    constructor(private http: HttpClient) {}

    get token(): string {
        const expDate = new Date(
            localStorage.getItem('fb-token-exp')
        );

        if(new Date() > expDate){
            this.logout();
            return null;
        }
        return localStorage.getItem('fb-token');
    }

    login(user: User): Observable<any> {
        user.returnSecureToken = true;
        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
        .pipe(
            tap(this.setToken),
            catchError(this.handleError.bind(this))
        );
    }

    logout() {
        localStorage.removeItem('fb-token');
        localStorage.removeItem('fb-token-exp');
    }

    isAuthanticated(): boolean {
        return !!this.token;
    }

    setUser(user: User): Observable<any> {
        localStorage.setItem(user.userName, user.email);
        return this.http.post
        (`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`,
        {
            email: user.email,
            password: user.password,
            returnSecureToken: true
        })
    }

    private handleError(error: HttpErrorResponse) {
        const {message} = error.error.error;

        switch(message) {
            case 'INVALID_EMAIL':
                this.error$.next('Invalid email');
                break;
            case 'INVALID_PASSWORD':
                this.error$.next('Invalid password');
                break;
            case 'EMAIL_NOT_FOUND':
                this.error$.next('Email not found');
                break;
        }

        return throwError(error);
    }
    
    private setToken(response: FbAuthResponse) {
        const timeOffset = new Date().getTime() + +response.expiresIn * 1000;
        const expiresDate = new Date(timeOffset);
        localStorage.setItem('fb-token', response.idToken);
        localStorage.setItem('fb-token-exp', expiresDate.toString() );
    }
}