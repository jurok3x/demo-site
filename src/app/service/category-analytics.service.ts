import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoryAnalyticsView } from '../model/categoryAnalyticsView';
import { RequestParams } from '../model/requestParams';

@Injectable({
  providedIn: 'root'
})
export class CategoryAnalyticsService {

  constructor(private http: HttpClient) { }

  public getCategoryAnalytics(userId: number, requestParams: RequestParams): Observable<CategoryAnalyticsView[]>{
    let parameters = new HttpParams()
    if(requestParams.categoryId) {
      parameters = parameters.append("categoryId", requestParams.categoryId)
    }
    if(requestParams.year) {
      parameters = parameters.append("year", requestParams.year)
    }
    if(requestParams.month) {
      parameters = parameters.append("month", requestParams.month)
    }
    return this.http.get<CategoryAnalyticsView[]>(`${environment.analyticsApiUrl}api/analytics/expenses/category/user/${userId}`, {params: parameters})
  }
}
