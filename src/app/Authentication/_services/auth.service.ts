import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

const REST_API_SERVER = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {

    return this.http.post(REST_API_SERVER + 'signin', {
      username: username,
      password: password
    }, httpOptions)
      .pipe(catchError ( errorRes => {
        console.log(errorRes);
        let errorMessage = 'An unknown error occurred. Please contact administrator.';
        if (errorRes.error.message){
          return throwError(errorRes.error.message);
        }
        else {
          return throwError(errorMessage);
        }
      }));;

  }

  register(user : any): Observable<any> {

    return this.http.post(REST_API_SERVER + 'signup', {
        username: user.username,
        email: user.email,
        password: user.password
      },
      httpOptions)
      .pipe(catchError ( errorRes => {
        console.log(errorRes);
        let errorMessage = 'An unknown error occurred. Please contact administrator.';
        if (errorRes.error.message){
          return throwError(errorRes.error.message);
        }
        else {
          return throwError(errorMessage);
        }
      }));
  }

}
