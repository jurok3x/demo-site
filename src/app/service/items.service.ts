import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  jwtString: string | undefined;
  apiServerUrl: any;

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]>{
    this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
    let headers = new HttpHeaders().set('Authorization', this.jwtString);
    let options = { headers: headers };
    return this.http.get<User[]>(`${this.apiServerUrl}`, options);
}
}
