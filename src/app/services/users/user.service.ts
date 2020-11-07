import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from './../../../environments/environment'
import {Observable, throwError} from 'rxjs';
import { IUser } from 'src/app/shared/models/user.model';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlAPI: string = environment.urlSignUp;

  constructor(private httpClient: HttpClient) { }

  private isLogged: boolean = false;

  public isLoggedUser(): boolean {
    this.isLogged =localStorage.getItem('token') ? true : false;
    return this.isLogged;
  }

  private handlerError(error: HttpErrorResponse){
    console.error('http error', error);    
    return throwError(`Error calling api ${error.message}`);
  }

  public postSingUp(IUser : IUser): Observable<IUser> {
    const url = `${this.urlAPI}/users/signup`;
    return this.httpClient.post<IUser>(url, IUser).pipe(
      retry(2), catchError(this.handlerError)
    );
  }

  public postSingIn(IUser : IUser): Observable<IUser> {
    const url = `${this.urlAPI}/users/login`;
    return this.httpClient.post<IUser>(url, IUser).pipe(
      retry(2), catchError(this.handlerError)
    );
  }


}
