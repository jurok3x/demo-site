import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Expense } from '../model/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  constructor(private http: HttpClient) { }

  jwtString: string | undefined;

  public findAll(userId: number, categoryId: number): Observable<Expense[]>{
    this.jwtString = 'Bearer ' + localStorage.getItem(environment.tokenName);
    let headers = new HttpHeaders().set('Authorization', this.jwtString);
    let options = {
      headers: headers,
      params: {
        categoryId: categoryId.toString(),
        year: '2022',
        month: '2'
      }};
    return this.http.get<Expense[]>(`${environment.apiUrl}api/expenses/user/${userId}`, options);
  }
}
