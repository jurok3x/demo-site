import { Component, OnInit } from '@angular/core';
import { ChartView } from 'src/app/model/chartView';
import { RequestParams } from 'src/app/model/requestParams';
import { CategoryAnalyticsService } from 'src/app/service/category-analytics.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category-analytics',
  templateUrl: './category-analytics.component.html',
  styleUrls: ['./category-analytics.component.css']
})
export class CategoryAnalyticsComponent implements OnInit {

  countAnalytics: ChartView[] = []
  sumAnalytics: ChartView[] = []
  requestParams: RequestParams = {month: new Date().getMonth(), year: new Date().getFullYear()}
  displayedColumns: string[] = ['position', 'name', 'count']

  constructor(private analyticsService: CategoryAnalyticsService) { }

  ngOnInit(): void {
    this.getAnalytics()
  }

  getAnalytics(){
    this.analyticsService.getCategoryAnalytics(parseInt(localStorage.getItem(environment.userIdName) || '')
    , this.requestParams).subscribe(
      result => {
        this.countAnalytics = result.map(
          (view): ChartView => ({
            name: view.name,
            value: view.count
          })
        )
        this.sumAnalytics = result.map(
          (view): ChartView => ({
            name: view.name,
            value: view.sum
          })
        )
      }
    )
  }

  setYear(year: number | null) {
    this.requestParams.year = year
    this.getAnalytics()
  }

  setMonth(month: number | null) {
    this.requestParams.month = month
    this.getAnalytics()
  }

}
