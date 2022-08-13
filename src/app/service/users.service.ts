import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  jwtString: string | undefined;
  private apiServerUrl = environment.apiUrl + 'users/';

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]>{
    this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
    let headers = new HttpHeaders().set('Authorization', this.jwtString);
    let options = { headers: headers };
    return this.http.get<User[]>(`${this.apiServerUrl}`, options);
}

public getUserById(userId: number): Observable<User>{
  this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
  let headers = new HttpHeaders().set('Authorization', this.jwtString);
  let options = { headers: headers };
  return this.http.get<User>(`${this.apiServerUrl}${userId}`, options);
}

public updateUser(user: User): Observable<User>{
  this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
  let headers = new HttpHeaders().set('Authorization', this.jwtString);
  let options = { headers: headers };
  return this.http.put<User>(`${this.apiServerUrl}`, user, options);
}

public addUser(user: User): Observable<User>{
  this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
  let headers = new HttpHeaders().set('Authorization', this.jwtString);
  let options = { headers: headers };
  return this.http.post<User>(`${this.apiServerUrl}/signup`, user, options);
}
}
