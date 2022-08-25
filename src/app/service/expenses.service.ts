import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Expense } from '../model/expense';
import { RequestParams } from '../model/requestParams';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  constructor(private http: HttpClient) { }

  jwtString: string | undefined;

  public findExpenses(userId: number, requestParams: RequestParams): Observable<Expense[]>{
    let parameters: any
    parameters = requestParams
    return this.http.get<Expense[]>(`${environment.apiUrl}api/expenses/user/${userId}`, {params: parameters});
  }
}
