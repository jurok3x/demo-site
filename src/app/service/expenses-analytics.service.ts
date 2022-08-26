import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ExpensesAnalyticsView } from '../model/expensesAnalyticsView';
import { RequestParams } from '../model/requestParams';

@Injectable({
  providedIn: 'root'
})
export class ExpensesAnalyticsService {

  constructor(private http: HttpClient) { }

  public getExpensesAnalytics(userId: number, requestParams: RequestParams): Observable<ExpensesAnalyticsView[]> {
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
    return this.http.get<ExpensesAnalyticsView[]>(`${environment.analyticsApiUrl}api/analytics/expenses/popular/user/${userId}`, {params: parameters})
  }
}
