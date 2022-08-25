import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsUtilsService {

  constructor(private http: HttpClient) { }

  public getActiveYears(userId: number): Observable<number[]> {
    return this.http.get<number[]>(`${environment.analyticsApiUrl}api/analytics/utils/active-years/user/${userId}`)
  }
}
