import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthResponse } from '../model/auth-response';
import { LoginModel } from '../model/loginmodel';
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

  private apiServerUrl = environment.apiUrl;

  private analyticsApiServerUrl = environment.analyticsApiUrl;

  constructor(private http: HttpClient) { }

  jwtString: string | undefined;

  public updateUser(user: User): Observable<User>{
    this.jwtString = '' + localStorage.getItem(environment.tokenName);
    let headers = new HttpHeaders().set('Authorization', this.jwtString);
    let options = { headers: headers };
    return this.http.put<User>(`${this.apiServerUrl}update/${user.id}`, user, options);
}

public registration(user: User): Observable<User>{
    return this.http.post<User>(`${this.apiServerUrl}auth/signup`, user);
}

public login(loginModel: LoginModel): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.apiServerUrl}auth/signin`, loginModel);
}

public analyticsLogin(loginModel: LoginModel): Observable<AuthResponse>{
  return this.http.post<AuthResponse>(`${this.analyticsApiServerUrl}auth/signin`, loginModel);
}

}
