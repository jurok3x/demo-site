import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Income } from '../model/income';
import { RequestParams } from '../model/requestParams';

@Injectable({
  providedIn: 'root'
})
export class IncomesService {

  constructor(private http: HttpClient) { }

  public findIncomes(userId: number, requestParams: RequestParams): Observable<Income[]>{
    let parameters = new HttpParams()
    if(requestParams.year) {
      parameters = parameters.append("year", requestParams.year)
    }
    if(requestParams.month) {
      parameters = parameters.append("month", requestParams.month + 1)
    }
    return this.http.get<Income[]>(`${environment.apiUrl}api/incomes/user/${userId}`, {params: parameters});
  }

  public findById(incomeId: number): Observable<Income>{
    return this.http.get<Income>(`${environment.apiUrl}api/incomes/${incomeId}`);
  }

  public save(income: Income): Observable<Income>{
    return this.http.post<Income>(`${environment.apiUrl}api/incomes`, income)
  }

  public update(income: Income): Observable<Income>{
    return this.http.put<Income>(`${environment.apiUrl}api/incomes/${income.id}`, income)
  }

  public delete(incomeId: number): Observable<any>{
    return this.http.delete<any>(`${environment.apiUrl}api/incomes/${incomeId}`)
  }
}
