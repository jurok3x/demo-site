import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${environment.apiUrl}api/users`);
}

public getUserById(userId: number): Observable<User>{
  return this.http.get<User>(`${environment.apiUrl}api/users/${userId}`);
}

public update(user: User): Observable<User>{
  return this.http.put<User>(`${environment.apiUrl}api/users/${user.id}`, user);
}

public addCategory(userId: number, categoryId: number): Observable<User>{
  return this.http.get<User>(`${environment.apiUrl}api/users/${userId}/add/category/${categoryId}`);
}

public removeCategory(userId: number, categoryId: number): Observable<User>{
  return this.http.get<User>(`${environment.apiUrl}api/users/${userId}/remove/category/${categoryId}`);
}
}
