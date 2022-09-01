import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ChartView } from 'src/app/model/chartView';
import { RequestParams } from 'src/app/model/requestParams';
import { MonthAnalyticsService } from 'src/app/service/month-analytics.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-month-analytics',
  templateUrl: './month-analytics.component.html',
  styleUrls: ['./month-analytics.component.css']
})
export class MonthAnalyticsComponent implements OnInit {

  monthAnalytics$!: Observable<ChartView[]>
  requestParams: RequestParams = {categoryId: null, year: new Date().getFullYear()};

  constructor(private analyticsService: MonthAnalyticsService) { }

  ngOnInit(): void {
    this.getAnalytics()
  }

  getAnalytics() {
    this.monthAnalytics$ = this.analyticsService.getMonthAnalytics(parseInt(localStorage.getItem(environment.userIdName) || '')
    , this.requestParams).pipe(
      map(
        result => result.map(
          (view): ChartView => ({
            name: view.monthName,
            value: view.sum
          })
        )
      )
    )
  }

  setYear(year: number | null) {
    this.requestParams.year = year
    this.getAnalytics()
  }

  setCategoryId(categoryId: number) {
    this.requestParams.categoryId = categoryId
    this.getAnalytics()
  }

}
