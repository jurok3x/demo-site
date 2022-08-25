import { HttpClient } from '@angular/common/http';
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
    let parameters: any
    parameters = requestParams
    return this.http.get<ExpensesAnalyticsView[]>(`${environment.analyticsApiUrl}api/analytics/expenses/popular/user/${userId}`, {params: parameters})
  }
}
