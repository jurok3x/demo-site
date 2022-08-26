import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Expense } from '../model/expense';
import { RequestParams } from '../model/requestParams';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  constructor(private http: HttpClient) { }

  public findExpenses(userId: number, requestParams: RequestParams): Observable<Expense[]>{
    let parameters = new HttpParams()
    if(requestParams.categoryId) {
      parameters = parameters.append("categoryId", requestParams.categoryId)
    }
    if(requestParams.year) {
      parameters = parameters.append("year", requestParams.year)
    }
    if(requestParams.month) {
      parameters = parameters.append("month", requestParams.month + 1)
    }
    return this.http.get<Expense[]>(`${environment.apiUrl}api/expenses/user/${userId}`, {params: parameters});
  }

  public findById(expenseId: number): Observable<Expense>{
    return this.http.get<Expense>(`${environment.apiUrl}api/expenses/${expenseId}`);
  }
}
