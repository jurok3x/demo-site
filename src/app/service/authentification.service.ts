import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthResponse } from '../model/authResponse';
import { LoginModel } from '../model/loginModel';
import { SaveUserModel } from '../model/saveUserModel';
import { User } from '../model/user';

const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json',
      observe: "response" })
};

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private apiToken!: string;

  private analyticsApiToken!: string;

  private helper = new JwtHelperService();

  constructor(private http: HttpClient) { }

  public updateUser(user: User): Observable<User>{
    return this.http.put<User>(`api/update/${user.id}`, user);
}

public registration(user: SaveUserModel): Observable<User>{
    return this.http.post<User>(`${environment.apiUrl}api/auth/signup`, user);
}

public login(loginModel: LoginModel): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${environment.apiUrl}api/auth/signin`, loginModel)
    .pipe(
          tap(
            ({token}) => {
              localStorage.setItem(environment.tokenName, token);
              this.setApiToken(token)
            }
          )
    );
}

public analyticsLogin(loginModel: LoginModel): Observable<AuthResponse>{
  return this.http.post<AuthResponse>(`${environment.analyticsApiUrl}api/analytics/auth/signin`, loginModel)
  .pipe(
        tap(
          ({token}) => {
            localStorage.setItem(environment.analyticsTokenName, token);
            this.setAnalyticsApiToken(token)
          }
        )
  );
}

public setApiToken(jwtToken: string){
  this.apiToken = jwtToken;
}

public getApiToken(): string{
  return 'Bearer ' + this.apiToken;
}

public setAnalyticsApiToken(jwtToken: string){
  this.analyticsApiToken = jwtToken;
}

public getAnalyticsTApioken(): string{
  return 'Bearer ' + this.analyticsApiToken;
}

public isApiAuthenticated(): boolean{
  if(this.apiToken){
    return !this.helper.isTokenExpired(this.apiToken)
  }
  return false
}

public isAnalyticsAuthenticated(): boolean{
  if(this.analyticsApiToken){
    return !this.helper.isTokenExpired(this.analyticsApiToken)
  }
  return false
}

public logout(){
  this.setApiToken('');
  this.setAnalyticsApiToken('');
  localStorage.clear();
}

}
