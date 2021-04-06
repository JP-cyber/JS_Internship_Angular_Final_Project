import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, throwError } from "rxjs";

@Injectable({providedIn: 'root'})
export class ErrorService{

    static error$: Subject<string> = new Subject<string>();

    static handleError(error: HttpErrorResponse):Observable<HttpErrorResponse> {
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
}