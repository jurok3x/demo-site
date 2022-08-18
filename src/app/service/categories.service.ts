import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  jwtString: string | undefined;

  public findAll(userId: number): Observable<Category[]>{
    this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
    let headers = new HttpHeaders().set('Authorization', this.jwtString);
    let options = {headers: headers};
    return this.http.get<Category[]>(`${environment.apiUrl}api/categories/user/${userId}`, options);
  }
}
